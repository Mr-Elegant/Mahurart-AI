"use client";

import ChatPanel from "@/components/dashboard/chat-panel";
import ConnectionsPanel from "@/components/dashboard/connection-panel";
import { Button } from "@/components/ui/button";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardPage() {
  const sdk = useDescope();
  const router = useRouter();
  const { isAuthenticated, sessionToken } = useSession();
  const { user, isUserLoading } = useUser();
  const [loggingOut, setLoggingout] = useState(false);

  const label = user?.email || user?.name || "Signed in User";
  const initial = (label[0] || "U").toUpperCase();

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingout(true);

    try {
      await sdk.logout();
      router.replace("/sign-in");
      router.refresh();
    } catch {
      setLoggingout(false);
    }
  }

  if (!isAuthenticated || !sessionToken) {
    return (
      <div className="ambient-orbs app-shell-bg flex h-svh items-center justify-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5 rounded-2xl glass-panel px-5 py-3 shadow-xl">
          <Loader2 className="size-4.5 animate-spin text-teal-500" />
          <span className="font-medium text-foreground">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell-bg h-svh overflow-hidden">
      <ChatPanel
        sessionToken={sessionToken}
        connections={<ConnectionsPanel sessionToken={sessionToken} />}
        footer={
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 px-1 py-1">
              <div className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 text-xs font-bold shadow-[0_0_10px_rgba(20,184,166,0.3)]">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">
                  {isUserLoading ? "Loading..." : label}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-accent/60"
              disabled={loggingOut}
              onClick={() => handleLogout()}
            >
              <LogOut className="size-3.5" />
              {loggingOut ? "Logging out..." : "Log out"}
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default DashboardPage;
