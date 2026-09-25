import { renderTshenoloEmail } from "./base.template";

export interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  barberName: string;
  date: string;       // ISO yyyy-mm-dd
  time: string;       // 24h "HH:MM"
  timeLabel: string;  // "9:00 AM"
  reference: string;
}

const BRAND_DARK = "#0a0e1a";
const BRAND_ACCENT = "#C9A227";
const BG_NEUTRAL = "#F8FAFC";

function prettyDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Booking summary card — reused by owner + customer emails */
export function bookingCard(d: BookingEmailData): string {
  return `
    <mj-section background-color="${BG_NEUTRAL}" border-radius="12px" padding="20px 24px">
      <mj-column>
        <mj-text font-size="12px" font-family="monospace" color="${BRAND_DARK}" letter-spacing="1px" text-transform="uppercase" padding-bottom="4px">
          Booking Reference
        </mj-text>
        <mj-text font-size="18px" font-weight="700" color="${BRAND_DARK}" padding-bottom="16px">
          ${d.reference}
        </mj-text>

        <mj-divider border-color="#E5E7EB" padding="0 0 16px 0" />

        <mj-text font-size="13px" font-family="monospace" color="#6B7280" text-transform="uppercase" letter-spacing="0.5px" padding-bottom="2px">
          Service
        </mj-text>
        <mj-text font-size="18px" font-weight="600" color="${BRAND_DARK}" padding-bottom="4px">
          ${d.serviceName}
        </mj-text>
        <mj-text font-size="13px" color="#6B7280" padding-bottom="16px">
          R${d.servicePrice} &nbsp;·&nbsp; ${d.serviceDuration} min
        </mj-text>

        <mj-text font-size="13px" font-family="monospace" color="#6B7280" text-transform="uppercase" letter-spacing="0.5px" padding-bottom="2px">
          Barber
        </mj-text>
        <mj-text font-size="16px" color="#1F2937" padding-bottom="16px">
          ${d.barberName}
        </mj-text>

        <mj-text font-size="13px" font-family="monospace" color="#6B7280" text-transform="uppercase" letter-spacing="0.5px" padding-bottom="2px">
          When
        </mj-text>
        <mj-text font-size="16px" color="#1F2937" padding-bottom="2px">
          ${prettyDate(d.date)}
        </mj-text>
        <mj-text font-size="16px" font-weight="600" color="${BRAND_ACCENT}" padding-bottom="16px">
          ${d.timeLabel}
        </mj-text>

        <mj-divider border-color="#E5E7EB" padding="0 0 16px 0" />

        <mj-text font-size="13px" font-family="monospace" color="#6B7280" text-transform="uppercase" letter-spacing="0.5px" padding-bottom="2px">
          Customer
        </mj-text>
        <mj-text font-size="16px" color="#1F2937" padding-bottom="2px">
          ${d.customerName}
        </mj-text>
        <mj-text font-size="14px" color="#4B5563" padding-bottom="2px">
          ${d.customerEmail}
        </mj-text>
        <mj-text font-size="14px" color="#4B5563">
          ${d.customerPhone}
        </mj-text>
      </mj-column>
    </mj-section>`;
}

/** Owner notification */
export async function renderOwnerBookingEmail(d: BookingEmailData): Promise<string> {
  return renderTshenoloEmail({
    previewText: `New booking — ${d.serviceName} on ${prettyDate(d.date)} at ${d.timeLabel}`,
    heading: "New Booking Request",
    bodyMjml: bookingCard(d),
    ctaLabel: "Reply to customer",
    ctaHref: `mailto:${d.customerEmail}?subject=Your booking at Blackgold Barber Co.`,
  });
}

/** Customer confirmation */
export async function renderCustomerBookingEmail(
  d: BookingEmailData,
  googleCalendarUrl: string
): Promise<string> {
  return renderTshenoloEmail({
    previewText: `Your booking is confirmed — ${prettyDate(d.date)} at ${d.timeLabel}`,
    heading: `You're booked, ${d.customerName.split(" ")[0] || "Friend"}`,
    bodyMjml: `
      ${bookingCard(d)}
      <mj-text padding-top="20px" color="#4B5563" font-size="14px">
        Please arrive 5 minutes early. To reschedule or cancel, call us on
        <a href="tel:+27725036443" style="color:${BRAND_ACCENT};">+27 72 503 6443</a>.
      </mj-text>
      <mj-text padding-top="8px" color="#4B5563" font-size="14px">
        <strong>Where:</strong> 49A Market Avenue, Vereeniging, 1928
      </mj-text>`,
    ctaLabel: "Add to Google Calendar",
    ctaHref: googleCalendarUrl,
  });
}