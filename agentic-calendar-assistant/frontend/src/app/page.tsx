"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@descope/nextjs-sdk/client";
import {
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  MessageSquare,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  const { isAuthenticated } = useSession();

  return (
    <div className="ambient-orbs flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/[0.08] bg-background/60 px-6 backdrop-blur-xl sm:px-12">
        <div className="flex items-center gap-3">
          <div className="relative size-9 overflow-hidden rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.4)]">
            <Image
              src="/muhurat-logo.png"
              alt="Muhurat AI Logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            Muhurat AI
          </span>
        </div>

        <nav className="flex items-center gap-3">
          <ThemeToggle />
          <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
            <Button
              variant="glow"
              size="sm"
              className="gap-2 rounded-xl px-4 py-2"
            >
              {isAuthenticated ? "Open Dashboard" : "Sign In"}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1">
        <section className="relative px-6 pt-16 pb-20 sm:px-12 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-600 dark:text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
              <Sparkles className="size-3.5 text-teal-500 dark:text-teal-400" />
              <span>Vedic Time Intelligence & Agentic Scheduling</span>
            </div>

            <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl sm:leading-[1.12]">
              Find Your Perfect Moment with{" "}
              <span className="gradient-text">
                Muhurat AI
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Manage Google Calendar schedules, resolve free/busy conflicts, create
              instant Google Meet calls, and get structured daily briefings using conversational AI and persistent memory.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
                <Button
                  variant="glow"
                  size="lg"
                  className="h-12 gap-2.5 rounded-2xl px-8 text-base shadow-[0_0_25px_rgba(20,184,166,0.4)]"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                  <ArrowRight className="size-4.5" />
                </Button>
              </Link>
            </div>

            {/* Interactive Prompt Visualizer */}
            <div className="glass-card mx-auto mt-12 max-w-2xl rounded-2xl p-4 sm:p-5 border border-border/80">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="flex size-2 rounded-full bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                <span>Example Conversational Prompt</span>
              </div>
              <p className="mt-2.5 text-left font-mono text-sm text-teal-700 dark:text-teal-200 font-medium">
                &ldquo;Create a 30-min meeting tomorrow at 10 AM called Team Sync with colleague@example.com&rdquo;
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 pt-2.5 text-xs text-muted-foreground border-t border-border/50">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="size-3.5" /> Auto conflict check
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-medium">
                  <CheckCircle2 className="size-3.5" /> Google Meet link generated
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-medium">
                  <CheckCircle2 className="size-3.5" /> Invites sent
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Feature Grid with Glassmorphism */}
          <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.2)]">
                <Calendar className="size-5.5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Smart Agendas</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ask about today or upcoming days. Get concise summaries, attendee lists, and event links in seconds.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Video className="size-5.5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Auto Google Meet</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Create meetings with instant Google Meet room links and automated calendar invitations sent to attendees.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Clock className="size-5.5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Conflict & FreeBusy</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Automatically checks busy slots before scheduling or rescheduling to avoid overlapping appointments.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                <Cpu className="size-5.5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Persistent Working Memory</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Powered by Mastra Memory. Remembers your preferred meeting lengths, timezones, and frequent collaborators.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                <Layers className="size-5.5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Model Context Protocol (MCP)</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Connect external IDEs and AI tools directly to your calendar via authenticated Descope MCP endpoints.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Zap className="size-5.5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Real-time SSE Streaming</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Live Server-Sent Events stream agent thought steps, tool execution statuses, and generated responses.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 bg-background/60 py-6 text-center text-xs text-muted-foreground backdrop-blur-md">
        <div className="flex items-center justify-center gap-4 mb-2">
          <Link href="/privacy" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-primary transition-colors underline-offset-4 hover:underline">
            Terms of Service
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Muhurat AI. Powered by Google Gemini, Mastra AI & Descope.</p>
      </footer>
    </div>
  );
}
