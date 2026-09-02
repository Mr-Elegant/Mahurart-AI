export type CalendarEvent = {
  id?: string | null;
  title: string;
  description?: string | null;
  location?: string | null;
  start?: string | null;
  end?: string | null;
  htmlLink?: string | null;
  meetLink?: string | null;
  attendees?: string[];
};

export async function fetchCalendarEvents(
  sessionToken: string,
  timeMin?: string,
  timeMax?: string,
): Promise<CalendarEvent[]> {
  const backendUrl = (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000"
  ).replace(/\/$/, "");

  const params = new URLSearchParams();
  if (timeMin) params.set("timeMin", timeMin);
  if (timeMax) params.set("timeMax", timeMax);

  const url = `${backendUrl}/api/calendar/events${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load calendar events (${response.status})`);
  }

  const data = await response.json();
  return (data.events ?? []) as CalendarEvent[];
}
