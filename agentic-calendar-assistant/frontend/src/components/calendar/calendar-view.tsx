"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  RefreshCw,
  Sparkles,
  Users,
  Video,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarEvent,
  fetchCalendarEvents,
} from "@/lib/calendar-api";

type ViewMode = "month" | "week" | "day";

type Props = {
  sessionToken: string;
  onAskAgent?: (prompt: string) => void;
  refreshTrigger?: number;
};

export function CalendarView({
  sessionToken,
  onAskAgent,
  refreshTrigger = 0,
}: Props) {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Calculate time bounds based on current view
  const { timeMin, timeMax } = useMemo(() => {
    const min = new Date(currentDate);
    const max = new Date(currentDate);

    if (viewMode === "month") {
      min.setDate(1);
      min.setDate(min.getDate() - min.getDay()); // Start of first week
      min.setHours(0, 0, 0, 0);

      max.setMonth(max.getMonth() + 1);
      max.setDate(0);
      max.setDate(max.getDate() + (6 - max.getDay())); // End of last week
      max.setHours(23, 59, 59, 999);
    } else if (viewMode === "week") {
      min.setDate(min.getDate() - min.getDay());
      min.setHours(0, 0, 0, 0);

      max.setDate(min.getDate() + 6);
      max.setHours(23, 59, 59, 999);
    } else {
      // Day view
      min.setHours(0, 0, 0, 0);
      max.setHours(23, 59, 59, 999);
    }

    return {
      timeMin: min.toISOString(),
      timeMax: max.toISOString(),
    };
  }, [currentDate, viewMode]);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCalendarEvents(sessionToken, timeMin, timeMax);
      setEvents(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load events";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [sessionToken, timeMin, timeMax]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents, refreshTrigger]);

  // Navigation handlers
  const handlePrev = () => {
    const next = new Date(currentDate);
    if (viewMode === "month") {
      next.setMonth(next.getMonth() - 1);
    } else if (viewMode === "week") {
      next.setDate(next.getDate() - 7);
    } else {
      next.setDate(next.getDate() - 1);
    }
    setCurrentDate(next);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    if (viewMode === "month") {
      next.setMonth(next.getMonth() + 1);
    } else if (viewMode === "week") {
      next.setDate(next.getDate() + 7);
    } else {
      next.setDate(next.getDate() + 1);
    }
    setCurrentDate(next);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Header Title
  const headerTitle = useMemo(() => {
    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    if (viewMode === "month") {
      return `${monthName} ${year}`;
    } else if (viewMode === "week") {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString("default", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })}`;
    } else {
      return currentDate.toLocaleDateString("default", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  }, [currentDate, viewMode]);

  // Map events by date (YYYY-MM-DD)
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      if (!event.start) continue;
      const dateKey = event.start.split("T")[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(event);
    }
    return map;
  }, [events]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-background text-foreground">
      {/* Calendar Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur-xl md:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-accent/40 p-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handlePrev}
              className="size-7.5 rounded-lg text-muted-foreground hover:text-foreground"
              aria-label="Previous date"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToday}
              className="h-7.5 px-2.5 text-xs font-semibold text-foreground hover:bg-background/80"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleNext}
              className="size-7.5 rounded-lg text-muted-foreground hover:text-foreground"
              aria-label="Next date"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <h2 className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">
            {headerTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl border border-border/70 bg-accent/40 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode("month")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                viewMode === "month"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setViewMode("week")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                viewMode === "week"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode("day")}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                viewMode === "day"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Day
            </button>
          </div>

          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={loadEvents}
            disabled={loading}
            className="size-8.5 rounded-xl border border-border/60 text-muted-foreground hover:text-foreground"
            aria-label="Refresh calendar"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin text-teal-500" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Main Calendar Viewport */}
      <div className="relative min-h-0 flex-1 overflow-hidden p-3 sm:p-5">
        {error ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-destructive">{error}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Make sure Google Calendar is connected in the sidebar.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={loadEvents}
              className="mt-4 rounded-xl gap-2 text-xs"
            >
              <RefreshCw className="size-3.5" />
              Try Again
            </Button>
          </div>
        ) : viewMode === "month" ? (
          <MonthView
            currentDate={currentDate}
            eventsByDate={eventsByDate}
            onSelectDate={(date) => {
              setCurrentDate(date);
              setViewMode("day");
            }}
            onSelectEvent={setSelectedEvent}
          />
        ) : viewMode === "week" ? (
          <WeekView
            currentDate={currentDate}
            events={events}
            onSelectEvent={setSelectedEvent}
          />
        ) : (
          <DayView
            currentDate={currentDate}
            events={events}
            onSelectEvent={setSelectedEvent}
            onAskAgent={onAskAgent}
          />
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onAskAgent={onAskAgent}
        />
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// Month View Component
// ----------------------------------------------------------------------
function MonthView({
  currentDate,
  eventsByDate,
  onSelectDate,
  onSelectEvent,
}: {
  currentDate: Date;
  eventsByDate: Map<string, CalendarEvent[]>;
  onSelectDate: (date: Date) => void;
  onSelectEvent: (event: CalendarEvent) => void;
}) {
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days: Array<{ date: Date; isCurrentMonth: boolean; key: string }> = [];

    // Prev month padding
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDate - i);
      days.push({
        date: d,
        isCurrentMonth: false,
        key: d.toISOString().split("T")[0],
      });
    }

    // Current month days
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      const d = new Date(year, month, i);
      days.push({
        date: d,
        isCurrentMonth: true,
        key: d.toISOString().split("T")[0],
      });
    }

    // Next month padding to complete 35 or 42 grid slots
    const totalSlots = days.length > 35 ? 42 : 35;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        isCurrentMonth: false,
        key: d.toISOString().split("T")[0],
      });
    }

    return days;
  }, [currentDate]);

  const todayKey = new Date().toISOString().split("T")[0];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 glass-panel overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-border/60 bg-accent/30 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Grid Days */}
      <div className="grid flex-1 grid-cols-7 grid-rows-5 sm:grid-rows-5 gap-px bg-border/40">
        {monthDays.map(({ date, isCurrentMonth, key }) => {
          const isToday = key === todayKey;
          const dayEvents = eventsByDate.get(key) || [];

          return (
            <div
              key={key}
              onClick={() => onSelectDate(date)}
              className={`group flex flex-col p-1.5 sm:p-2.5 transition-colors cursor-pointer bg-background hover:bg-accent/40 ${
                !isCurrentMonth ? "opacity-40" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`flex size-6 sm:size-6.5 items-center justify-center rounded-full text-xs font-medium transition-all ${
                    isToday
                      ? "bg-teal-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(20,184,166,0.6)]"
                      : "text-foreground group-hover:font-semibold"
                  }`}
                >
                  {date.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-[10px] text-muted-foreground font-mono font-medium hidden sm:inline">
                    {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
                  </span>
                )}
              </div>

              {/* Event Pills */}
              <div className="space-y-1 overflow-y-auto max-h-[85px] scrollbar-none">
                {dayEvents.slice(0, 3).map((event) => {
                  const hasMeet = Boolean(event.meetLink);
                  return (
                    <button
                      key={event.id || event.title + event.start}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(event);
                      }}
                      className={`w-full truncate rounded-md px-1.5 py-0.5 text-left text-[11px] font-medium transition-all flex items-center gap-1 border ${
                        hasMeet
                          ? "bg-teal-500/15 border-teal-500/30 text-teal-700 dark:text-teal-300 hover:bg-teal-500/25"
                          : "bg-indigo-500/15 border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/25"
                      }`}
                    >
                      {hasMeet && <Video className="size-2.5 shrink-0" />}
                      <span className="truncate">{event.title}</span>
                    </button>
                  );
                })}
                {dayEvents.length > 3 && (
                  <p className="text-[10px] text-muted-foreground font-medium pl-1">
                    +{dayEvents.length - 3} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Week View Component
// ----------------------------------------------------------------------
function WeekView({
  currentDate,
  events,
  onSelectEvent,
}: {
  currentDate: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}) {
  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    const days: Array<{ date: Date; key: string; label: string }> = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      days.push({
        date: d,
        key: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("default", { weekday: "short", day: "numeric" }),
      });
    }
    return days;
  }, [currentDate]);

  const todayKey = new Date().toISOString().split("T")[0];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 glass-panel overflow-hidden">
      {/* Day Columns Header */}
      <div className="grid grid-cols-7 border-b border-border/60 bg-accent/30 py-2.5 text-center text-xs font-semibold text-muted-foreground">
        {weekDays.map(({ label, key }) => {
          const isToday = key === todayKey;
          return (
            <div key={key} className={isToday ? "text-teal-600 dark:text-teal-400 font-bold" : ""}>
              {label}
            </div>
          );
        })}
      </div>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-7 min-h-[500px] divide-x divide-border/40 p-2 gap-1.5">
          {weekDays.map(({ key }) => {
            const dayEvents = events.filter((e) => e.start?.startsWith(key));
            return (
              <div key={key} className="space-y-2">
                {dayEvents.map((event) => {
                  const startTime = event.start ? formatTimeOnly(event.start) : "";
                  const endTime = event.end ? formatTimeOnly(event.end) : "";
                  const hasMeet = Boolean(event.meetLink);

                  return (
                    <button
                      key={event.id || event.title}
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className={`w-full rounded-xl p-2.5 text-left transition-all border glass-card hover:scale-[1.01] ${
                        hasMeet
                          ? "border-teal-500/40 bg-teal-500/10 text-foreground"
                          : "border-border/80 bg-accent/50 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[10.5px] font-semibold text-teal-600 dark:text-teal-300">
                        {hasMeet && <Video className="size-3 shrink-0" />}
                        <span>{startTime} {endTime ? `– ${endTime}` : ""}</span>
                      </div>
                      <p className="mt-1 font-heading text-xs font-bold leading-tight text-foreground line-clamp-2">
                        {event.title}
                      </p>
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Users className="size-2.5" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ----------------------------------------------------------------------
// Day View Component
// ----------------------------------------------------------------------
function DayView({
  currentDate,
  events,
  onSelectEvent,
  onAskAgent,
}: {
  currentDate: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onAskAgent?: (prompt: string) => void;
}) {
  const dateKey = currentDate.toISOString().split("T")[0];
  const dayEvents = useMemo(() => {
    return events
      .filter((e) => e.start?.startsWith(dateKey))
      .sort((a, b) => (a.start || "").localeCompare(b.start || ""));
  }, [events, dateKey]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/70 glass-panel overflow-hidden p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            {currentDate.toLocaleDateString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <p className="text-xs text-muted-foreground">
            {dayEvents.length} scheduled {dayEvents.length === 1 ? "meeting" : "meetings"}
          </p>
        </div>

        {onAskAgent && (
          <Button
            variant="glow"
            size="sm"
            onClick={() =>
              onAskAgent(
                `Check free slots on ${currentDate.toLocaleDateString("default", { month: "short", day: "numeric" })} and schedule a meeting`,
              )
            }
            className="gap-2 rounded-xl text-xs h-8.5"
          >
            <Sparkles className="size-3.5" />
            Schedule with AI
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 pr-2">
        {dayEvents.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/60 text-muted-foreground mb-3">
              <CalendarIcon className="size-6" />
            </div>
            <p className="text-sm font-semibold text-foreground">No events on this day</p>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              You have a completely free schedule. Ask Muhurat AI to plan your day or set up calls.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {dayEvents.map((event) => {
              const startTime = event.start ? formatDateTime(event.start) : "No start time";
              const endTime = event.end ? formatTimeOnly(event.end) : "";
              const hasMeet = Boolean(event.meetLink);

              return (
                <div
                  key={event.id || event.title}
                  onClick={() => onSelectEvent(event)}
                  className="glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl p-4 transition-all cursor-pointer hover:border-teal-500/40"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-teal-500/15 px-2.5 py-0.5 text-xs font-semibold text-teal-600 dark:text-teal-300">
                        <Clock className="size-3" />
                        {startTime} {endTime ? `– ${endTime}` : ""}
                      </span>
                      {hasMeet && (
                        <span className="flex items-center gap-1 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[11px] font-semibold text-cyan-600 dark:text-cyan-300">
                          <Video className="size-3" />
                          Google Meet
                        </span>
                      )}
                    </div>

                    <h4 className="font-heading text-base font-bold text-foreground">
                      {event.title}
                    </h4>

                    {event.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                        <Users className="size-3.5" />
                        <span>{event.attendees.join(", ")}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hasMeet && (
                      <a
                        href={event.meetLink!}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md hover:brightness-110"
                      >
                        <Video className="size-3.5" />
                        Join Meet
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

// ----------------------------------------------------------------------
// Event Details Modal
// ----------------------------------------------------------------------
function EventDetailsModal({
  event,
  onClose,
  onAskAgent,
}: {
  event: CalendarEvent;
  onClose: () => void;
  onAskAgent?: (prompt: string) => void;
}) {
  const startTime = event.start ? formatDateTime(event.start) : "";
  const endTime = event.end ? formatTimeOnly(event.end) : "";
  const hasMeet = Boolean(event.meetLink);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm slide-up-enter">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/[0.15] dark:border-white/[0.1] glass-panel p-6 sm:p-7 shadow-2xl">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          className="absolute right-4.5 top-4.5 rounded-xl text-muted-foreground hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="size-4.5" />
        </Button>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-300 uppercase tracking-wider">
              Google Calendar Event
            </span>
          </div>

          <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {event.title}
          </h3>

          <div className="space-y-2.5 rounded-2xl border border-border/70 bg-accent/30 p-4 text-xs">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Clock className="size-4 text-teal-500" />
              <span>{startTime} {endTime ? `– ${endTime}` : ""}</span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 text-cyan-500" />
                <span>{event.location}</span>
              </div>
            )}

            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <Users className="size-4 text-purple-500 shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {event.attendees.map((email) => (
                    <span
                      key={email}
                      className="rounded-md bg-background/80 px-2 py-0.5 text-[11px] font-mono text-foreground border border-border/50"
                    >
                      {email}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {event.description && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-foreground">Description</p>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap rounded-xl border border-border/50 bg-background/50 p-3">
                {event.description}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              {hasMeet && (
                <a
                  href={event.meetLink!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:brightness-110"
                >
                  <Video className="size-4" />
                  Join Google Meet
                </a>
              )}

              {event.htmlLink && (
                <a
                  href={event.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 px-3 py-2 text-xs font-medium text-foreground hover:bg-accent"
                >
                  <ExternalLink className="size-3.5" />
                  Open in Google Calendar
                </a>
              )}
            </div>

            {onAskAgent && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onClose();
                  onAskAgent(`Reschedule "${event.title}" to another time`);
                }}
                className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700"
              >
                Reschedule with AI
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Date Formatting Helpers
// ----------------------------------------------------------------------
function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleString("default", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

function formatTimeOnly(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString("default", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}
