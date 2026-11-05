import type { CollegeEvent } from "./content";

/**
 * Generate standard RFC 5545 iCalendar (.ics) content for an event
 */
export function buildEventIcs(event: CollegeEvent): string {
  // Format dates: event.date is e.g. "2026-11-21"
  const dateClean = event.date.replaceAll("-", "");
  
  // Approximate start/end times if not precise
  let startTime = "090000";
  let endTime = "130000";

  if (event.time.includes("6:00 PM")) {
    startTime = "180000";
    endTime = "203000";
  } else if (event.time.includes("10:00 AM")) {
    startTime = "100000";
    endTime = "130000";
  } else if (event.time.includes("10:30 AM")) {
    startTime = "103000";
    endTime = "133000";
  } else if (event.time.includes("5:30 PM")) {
    startTime = "173000";
    endTime = "193000";
  } else if (event.time.includes("9:30 AM")) {
    startTime = "093000";
    endTime = "123000";
  }

  const dtStart = `${dateClean}T${startTime}Z`;
  const dtEnd = `${dateClean}T${endTime}Z`;
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `${event.slug}-${dateClean}@chelmsford.ac.uk`;

  const cleanDescription = event.description.replaceAll("\n", " ").slice(0, 300);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chelmsford College//Website Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title} · Chelmsford College`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Trigger client-side browser download of .ics calendar file
 */
export function triggerCalendarDownload(event: CollegeEvent) {
  const ics = buildEventIcs(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.slug}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

