"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { barbers, services } from "@/lib/data";
import {
  buildBookingEvent,
  buildGoogleCalendarUrl,
  downloadIcsFile,
} from "@/lib/calendar";

type FormState = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
};

type Confirmed = {
  reference: string;
  serviceName: string;
  barberName: string;
  date: string;
  time: string;
  timeLabel: string;
  durationMinutes: number;
  price: number;
  googleCalendarUrl: string;
};

const DAY_RULES: Record<
  number,
  { open: number; close: number; closed?: boolean }
> = {
  0: { open: 0, close: 0, closed: true },
  1: { open: 9, close: 19 },
  2: { open: 9, close: 19 },
  3: { open: 9, close: 19 },
  4: { open: 9, close: 19 },
  5: { open: 9, close: 19 },
  6: { open: 8, close: 17 },
};

const SLOT_MINUTES = 30;
const LAST_SLOT_BUFFER_HOURS = 1;

function buildSlotsForDate(isoDate: string): string[] {
  if (!isoDate) return [];
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return [];
  const date = new Date(y, m - 1, d);
  const rule = DAY_RULES[date.getDay()];
  if (!rule || rule.closed) return [];

  const slots: string[] = [];
  const openMin = rule.open * 60;
  const lastMin = (rule.close - LAST_SLOT_BUFFER_HOURS) * 60;
  for (let t = openMin; t <= lastMin; t += SLOT_MINUTES) {
    const h = Math.floor(t / 60);
    const mm = t % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

function format12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function todayIso(): string {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().split("T")[0];
}

function isSunday(isoDate: string): boolean {
  if (!isoDate) return false;
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).getDay() === 0;
}

const initialState: FormState = {
  serviceId: "",
  barberId: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function BookingToast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-[9999]
        flex items-start gap-3 bg-charcoal border border-gold/30 rounded-sm px-5 py-4
        shadow-2xl shadow-black/40 max-w-full sm:max-w-[340px]"
    >
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
        className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5"
      >
        <Check className="w-4 h-4 text-gold" strokeWidth={2.25} />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-cream text-sm font-semibold mb-0.5">
          Booking confirmed
        </div>
        <div className="text-cream/60 text-xs leading-relaxed">
          Check your inbox — we&apos;ve sent the details.
        </div>
      </div>
      <button
        onClick={onDone}
        aria-label="Dismiss"
        className="text-cream/40 hover:text-cream/80 transition-colors shrink-0"
      >
        <X className="w-4 h-4" strokeWidth={1.75} />
      </button>
    </motion.div>,
    document.body
  );
}

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const [showToast, setShowToast] = useState(false);

  const isToday = form.date === todayIso();
  const sunday = isSunday(form.date);

  const allSlots = useMemo(() => buildSlotsForDate(form.date), [form.date]);

  const availableSlots = useMemo(() => {
    if (!isToday) return allSlots;
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    return allSlots.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m > nowMin;
    });
  }, [allSlots, isToday]);

  useEffect(() => {
    if (form.time && !availableSlots.includes(form.time)) {
      setForm((prev) => ({ ...prev, time: "" }));
    }
  }, [availableSlots, form.time]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === "error") setStatus("idle");
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.serviceId) next.serviceId = "Please choose a service.";
    if (!form.date) next.date = "Please choose a date.";
    else if (sunday) next.date = "We are closed on Sundays.";
    else if (availableSlots.length === 0) next.date = "No slots left for this day.";
    if (!form.time) next.time = "Please choose a time.";
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Booking failed.");

      setConfirmed(data as Confirmed);
      setStatus("sent");
      setShowToast(true);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or call us directly."
      );
    }
  }

  function handleNewBooking() {
    setConfirmed(null);
    setForm(initialState);
    setStatus("idle");
    setErrorMsg("");
  }

  if (confirmed) {
    const event = buildBookingEvent({
      serviceName: confirmed.serviceName,
      barberName: confirmed.barberName,
      date: confirmed.date,
      time: confirmed.time,
      durationMinutes: confirmed.durationMinutes,
      customerName: form.name,
    });

    return (
      <>
        <AnimatePresence>
          {showToast && <BookingToast onDone={() => setShowToast(false)} />}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-sm border border-gold/30 bg-charcoal p-6 sm:p-10 text-cream"
        >
          <p className="eyebrow">Booking Confirmed</p>
          <h3 className="heading-md mt-2">
            You&apos;re All Set, {form.name.split(" ")[0] || "Friend"}
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-xs font-mono text-gold tracking-widest"
          >
            {confirmed.reference}
          </motion.p>

          <motion.dl
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-3 text-sm text-cream/80"
          >
            <Row label="Service" value={confirmed.serviceName} />
            <Row label="Barber" value={confirmed.barberName} />
            <Row label="Date" value={confirmed.date} />
            <Row label="Time" value={confirmed.timeLabel} />
            <Row label="Price" value={`R${confirmed.price}`} accent />
          </motion.dl>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-cream/60"
          >
            Add this appointment to your calendar so you don&apos;t miss it:
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={confirmed.googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto text-center"
            >
              Add to Google Calendar
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => downloadIcsFile(event)}
              className="btn-outline w-full sm:w-auto"
            >
              Download .ics (Apple Calendar)
            </motion.button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ x: -4 }}
            type="button"
            onClick={handleNewBooking}
            className="mt-8 text-sm font-medium uppercase tracking-widest text-cream/50 hover:text-gold transition-colors"
          >
            &larr; Make another booking
          </motion.button>
        </motion.div>
      </>
    );
  }

  const sending = status === "sending";
  const noSlotsToday = isToday && availableSlots.length === 0;

  return (
    <>
      <AnimatePresence>
        {showToast && <BookingToast onDone={() => setShowToast(false)} />}
      </AnimatePresence>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        noValidate
        className="rounded-sm border border-charcoal/10 bg-white p-6 sm:p-10"
      >
        <p className="eyebrow">Book Your Appointment</p>
        <h3 className="heading-md mt-2 text-charcoal">Reserve Your Chair</h3>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
        >
          <motion.div variants={fieldVariants} className="sm:col-span-2">
            <Label htmlFor="service">Service *</Label>
            <motion.select
              whileFocus={{ scale: 1.01 }}
              id="service"
              value={form.serviceId}
              disabled={sending}
              onChange={(e) => update("serviceId", e.target.value)}
              className={inputCls}
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — R{s.price} ({s.durationMinutes} min)
                </option>
              ))}
            </motion.select>
            {errors.serviceId && <ErrorText>{errors.serviceId}</ErrorText>}
          </motion.div>

          <motion.div variants={fieldVariants} className="sm:col-span-2">
            <Label htmlFor="barber">Barber (optional)</Label>
            <motion.select
              whileFocus={{ scale: 1.01 }}
              id="barber"
              value={form.barberId}
              disabled={sending}
              onChange={(e) => update("barberId", e.target.value)}
              className={inputCls}
            >
              <option value="">No preference — first available</option>
              {barbers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} — {b.title}
                </option>
              ))}
            </motion.select>
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Label htmlFor="date">Date *</Label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              id="date"
              type="date"
              min={todayIso()}
              value={form.date}
              disabled={sending}
              onChange={(e) => update("date", e.target.value)}
              className={inputCls}
            />
            {errors.date && <ErrorText>{errors.date}</ErrorText>}
            {sunday && !errors.date && (
              <p className="mt-1 text-xs text-charcoal/50">
                We&apos;re closed on Sundays — please pick another day.
              </p>
            )}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Label htmlFor="time">Time *</Label>
            <motion.select
              whileFocus={{ scale: 1.01 }}
              id="time"
              value={form.time}
              disabled={sending || !form.date || sunday || availableSlots.length === 0}
              onChange={(e) => update("time", e.target.value)}
              className={inputCls}
            >
              <option value="">
                {!form.date
                  ? "Choose a date first"
                  : sunday
                  ? "Closed on Sundays"
                  : availableSlots.length === 0
                  ? "No slots available"
                  : "Select a time"}
              </option>
              {availableSlots.map((t) => (
                <option key={t} value={t}>
                  {format12(t)}
                </option>
              ))}
            </motion.select>
            {errors.time && <ErrorText>{errors.time}</ErrorText>}
            {noSlotsToday && !errors.time && (
              <p className="mt-1 text-xs text-charcoal/50">
                No more slots today — please pick another date.
              </p>
            )}
          </motion.div>

          <motion.div variants={fieldVariants} className="sm:col-span-2">
            <Label htmlFor="name">Full Name *</Label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              id="name"
              type="text"
              value={form.name}
              disabled={sending}
              onChange={(e) => update("name", e.target.value)}
              className={inputCls}
              placeholder="Jane Dlamini"
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Label htmlFor="email">Email *</Label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              id="email"
              type="email"
              value={form.email}
              disabled={sending}
              onChange={(e) => update("email", e.target.value)}
              className={inputCls}
              placeholder="jane@example.com"
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Label htmlFor="phone">Phone *</Label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              id="phone"
              type="tel"
              value={form.phone}
              disabled={sending}
              onChange={(e) => update("phone", e.target.value)}
              className={inputCls}
              placeholder="082 000 0000"
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 text-sm text-red-600"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: sending ? 1 : 1.03 }}
          whileTap={{ scale: sending ? 1 : 0.97 }}
          type="submit"
          disabled={sending}
          className="btn-primary mt-8 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? "Confirming…" : "Confirm Booking"}
        </motion.button>
      </motion.form>
    </>
  );
}

const inputCls =
  "w-full rounded-sm border border-charcoal/20 bg-white px-4 py-3 text-sm " +
  "text-charcoal focus:border-gold focus:outline-none disabled:opacity-60 " +
  "disabled:cursor-not-allowed transition-colors";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-charcoal">
      {children}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-red-600">{children}</p>;
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      variants={fieldVariants}
      className="flex flex-col gap-0.5 border-b border-cream/10 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <dt className="text-cream/50 text-xs font-mono uppercase tracking-widest">
        {label}
      </dt>
      <dd className={accent ? "text-gold font-semibold" : "text-cream"}>{value}</dd>
    </motion.div>
  );
}