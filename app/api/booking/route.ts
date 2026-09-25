import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/email/transporter";
import { services, barbers, businessInfo } from "@/lib/data";
import {
  renderOwnerBookingEmail,
  renderCustomerBookingEmail,
  type BookingEmailData,
} from "@/lib/email/booking.template";
import { buildBookingEvent, buildGoogleCalendarUrl } from "@/lib/calendar";

/* ------------------------------------------------------------------ */
/*  Trading-hours rules                                                */
/*  0 = Sunday ... 6 = Saturday                                        */
/* ------------------------------------------------------------------ */
const DAY_RULES: Record<
  number,
  { open: number; close: number; closed?: boolean }
> = {
  0: { open: 0, close: 0, closed: true },        // Sunday — closed
  1: { open: 9, close: 19 },                      // Monday
  2: { open: 9, close: 19 },
  3: { open: 9, close: 19 },
  4: { open: 9, close: 19 },
  5: { open: 9, close: 19 },
  6: { open: 8, close: 17 },                      // Saturday
};

const SLOT_MINUTES = 30;
const LAST_SLOT_BUFFER_HOURS = 1; // last bookable slot = close − 1h

function isSlotAllowed(date: Date, time: string): { ok: boolean; reason?: string } {
  const day = date.getDay();
  const rule = DAY_RULES[day];

  if (!rule || rule.closed) {
    return { ok: false, reason: "We are closed on Sundays." };
  }

  const [h, m] = time.split(":").map(Number);
  if (
    Number.isNaN(h) ||
    Number.isNaN(m) ||
    h < 0 || h > 23 ||
    m < 0 || m > 59
  ) {
    return { ok: false, reason: "Invalid time format." };
  }

  const slotMinutes = h * 60 + m;
  const openMinutes = rule.open * 60;
  const lastSlotMinutes = (rule.close - LAST_SLOT_BUFFER_HOURS) * 60;

  if (slotMinutes < openMinutes) {
    return { ok: false, reason: `We open at ${format12(rule.open, 0)} on this day.` };
  }
  if (slotMinutes > lastSlotMinutes) {
    return {
      ok: false,
      reason: `Last booking is ${format12(rule.close - LAST_SLOT_BUFFER_HOURS, 0)} on this day.`,
    };
  }
  if (slotMinutes % SLOT_MINUTES !== 0) {
    return { ok: false, reason: "Please choose a slot on the half hour." };
  }
  return { ok: true };
}

function format12(h: number, m: number): string {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  return format12(h, m);
}

function makeReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `BG-${stamp}${rand}`;
}

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, barberId, date, time, name, email, phone } = body ?? {};

    /* ---------- Required fields ---------- */
    if (!serviceId || !date || !time || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required booking fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const service = services.find((s) => s.id === serviceId);
    if (!service) {
      return NextResponse.json({ error: "Unknown service." }, { status: 400 });
    }

    /* ---------- Date validation ---------- */
    const [y, mo, d] = date.split("-").map(Number);
    if (!y || !mo || !d) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }
    const bookingDate = new Date(y, mo - 1, d);
    if (Number.isNaN(bookingDate.getTime())) {
      return NextResponse.json({ error: "Invalid date." }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return NextResponse.json(
        { error: "Please choose a future date." },
        { status: 400 }
      );
    }

    const isToday =
      bookingDate.getFullYear() === today.getFullYear() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getDate() === today.getDate();

    /* ---------- Trading-hours rules ---------- */
    const slotCheck = isSlotAllowed(bookingDate, time);
    if (!slotCheck.ok) {
      return NextResponse.json(
        { error: slotCheck.reason || "That time is not available." },
        { status: 400 }
      );
    }

    /* ---------- Today: no past times ---------- */
    if (isToday) {
      const [th, tm] = time.split(":").map(Number);
      const now = new Date();
      const slot = new Date();
      slot.setHours(th, tm, 0, 0);
      if (slot <= now) {
        return NextResponse.json(
          { error: "That time has already passed today." },
          { status: 400 }
        );
      }
    }

    /* ---------- Barber ---------- */
    const barber = barberId ? barbers.find((b) => b.id === barberId) : undefined;
    const barberName = barber
      ? `${barber.name} — ${barber.title}`
      : "First available barber";

    const timeLabel = to12h(time);
    const reference = makeReference();

    const emailData: BookingEmailData = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.durationMinutes,
      barberName,
      date,
      time,
      timeLabel,
      reference,
    };

    /* ---------- Calendar URL for the customer CTA ---------- */
    const calEvent = buildBookingEvent({
      serviceName: service.name,
      barberName,
      date,
      time,
      durationMinutes: service.durationMinutes,
      customerName: name,
    });
    const googleCalendarUrl = buildGoogleCalendarUrl(calEvent);

    /* ---------- Emails ---------- */
    const ownerHtml = await renderOwnerBookingEmail(emailData);
    const customerHtml = await renderCustomerBookingEmail(
      emailData,
      googleCalendarUrl
    );

    await transporter.sendMail({
      from: `"Blackgold Bookings" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New booking — ${service.name} on ${date} at ${timeLabel}`,
      html: ownerHtml,
    });

    await transporter.sendMail({
      from: `"Blackgold Barber Co." <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      replyTo: businessInfo.email,
      subject: `Your booking is confirmed — ${date} at ${timeLabel}`,
      html: customerHtml,
    });

    return NextResponse.json({
      success: true,
      reference,
      serviceName: service.name,
      barberName,
      date,
      time,
      timeLabel,
      durationMinutes: service.durationMinutes,
      price: service.price,
      googleCalendarUrl,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}