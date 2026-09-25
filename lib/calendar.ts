import { businessInfo } from "./data";

export type CalendarEventInput = {
  title: string;
  description: string;
  date: string;
  time: string;
  durationMinutes: number;
  location: string;
};

function toUtcStamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

function getStartEnd(input: CalendarEventInput): { start: Date; end: Date } {
  const [hours, minutes] = input.time.split(":").map(Number);
  const start = new Date(input.date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + input.durationMinutes * 60000);
  return { start, end };
}

export function buildGoogleCalendarUrl(input: CalendarEventInput): string {
  const { start, end } = getStartEnd(input);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: input.description,
    location: input.location
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(input: CalendarEventInput): string {
  const { start, end } = getStartEnd(input);
  const now = toUtcStamp(new Date());
  const uid = `${now}-${Math.random().toString(36).slice(2)}@blackgoldbarber.co.za`;

  const escapeText = (text: string) =>
    text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Blackgold Barber Co.//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${escapeText(input.title)}`,
    `DESCRIPTION:${escapeText(input.description)}`,
    `LOCATION:${escapeText(input.location)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  return lines.join("\r\n");
}

export function downloadIcsFile(input: CalendarEventInput, filename = "blackgold-appointment.ics") {
  const content = buildIcsContent(input);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function buildBookingEvent(params: {
  serviceName: string;
  barberName: string;
  date: string;
  time: string;
  durationMinutes: number;
  customerName: string;
}): CalendarEventInput {
  return {
    title: `${params.serviceName} at ${businessInfo.name}`,
    description: `Booking for ${params.customerName}\nService: ${params.serviceName}\nBarber: ${params.barberName}\nPlease arrive 5 minutes early. Call ${businessInfo.phone} to reschedule.`,
    date: params.date,
    time: params.time,
    durationMinutes: params.durationMinutes,
    location: businessInfo.address
  };
}
