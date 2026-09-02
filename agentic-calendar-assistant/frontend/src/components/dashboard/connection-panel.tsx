"use client";

import { ConnectionInfo } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { CalendarDays, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  connectCalendar,
  fetchCalendarConnection,
  refreshCalendarConnection,
} from "@/lib/connections";

function statusLabel(status: ConnectionInfo["status"]) {
  if (status === "connected") return "Connected";
  if (status === "pending") return "Pending";
  return "Not Connected";
}

function ConnectionsPanel({ sessionToken }: { sessionToken: string }) {
  const [connection, setConnection] = useState<ConnectionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const handleLoadCalendarConnection = useCallback(async () => {
    setLoading(true);

    try {
      let data = await fetchCalendarConnection(sessionToken);
      if (data.status === "pending") {
        data = await refreshCalendarConnection(sessionToken);
      }
      setConnection(data);
    } catch {
      console.log("failed to load calendar connection, falling back to disconnected");
      setConnection({
        status: "disconnected",
        label: "Google Calendar",
      });
    } finally {
      setLoading(false);
    }
  }, [sessionToken]);

  useEffect(() => {
    handleLoadCalendarConnection();
  }, [handleLoadCalendarConnection]);

  async function handleCalendarConnect() {
    setBusy(true);
    try {
      await connectCalendar(sessionToken);
    } catch {
      console.log("failed to connect");
    }
  }

  async function handleCalendarRefresh() {
    setBusy(true);

    try {
      const data = await refreshCalendarConnection(sessionToken);
      setConnection(data);
    } catch {
      console.log("failed to refresh");
    } finally {
      setBusy(false);
    }
  }

  const connected = connection?.status === "connected";
  const pending = connection?.status === "pending";

  return (
    <div className="space-y-2">
      <p className="px-1 text-xs font-semibold tracking-wider uppercase text-slate-400">
        Integrations
      </p>

      {loading || !connection ? (
        <Skeleton className="h-14 w-full rounded-2xl" />
      ) : (
        <div className="glass-card flex items-center gap-2.5 rounded-2xl p-2.5 shadow-md">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl transition-all",
              connected
                ? "bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                : "bg-white/[0.06] text-slate-400 border border-white/[0.08]",
            )}
          >
            <CalendarDays className="size-4.5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {connection.label}
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  connected && "bg-emerald-400 pulse-dot shadow-[0_0_6px_rgba(52,211,153,0.8)]",
                  pending && "bg-amber-400 animate-pulse",
                  !connected && !pending && "bg-slate-500",
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-medium",
                  connected && "text-emerald-300",
                  pending && "text-amber-300",
                  !connected && !pending && "text-slate-400",
                )}
              >
                {statusLabel(connection.status)}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant={connected ? "glass" : "glow"}
            className="h-7.5 shrink-0 rounded-xl px-2.5 text-xs"
            disabled={busy}
            onClick={() => handleCalendarConnect()}
          >
            {connected ? "Reconnect" : "Connect"}
          </Button>

          <Button
            size="icon-sm"
            variant="ghost"
            className="size-7.5 shrink-0 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08]"
            disabled={busy}
            onClick={() => handleCalendarRefresh()}
            aria-label="Refresh connection"
          >
            <RefreshCcw
              className={cn("size-3.5", busy && "animate-spin text-teal-400")}
            />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ConnectionsPanel;
