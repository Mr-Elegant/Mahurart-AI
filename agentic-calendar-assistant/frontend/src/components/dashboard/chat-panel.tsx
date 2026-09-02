"use client";

import Image from "next/image";
import {
  ArrowUp,
  Bot,
  Calendar as CalendarIcon,
  Columns,
  Loader2,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  Sparkles,
  User,
  X,
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  listThreads,
  loadThread,
  streamAgentChat,
  ThreadSummary,
} from "@/lib/agent";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./markdown-message";
import { ThemeToggle } from "../theme/theme-toggle";
import { CalendarView } from "../calendar/calendar-view";

type Props = {
  sessionToken: string;
  connections: ReactNode;
  footer?: ReactNode;
};

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

const WELCOME =
  "Connect Google Calendar, then ask Muhurat AI about today's agenda, check conflict-free slots, create a Google Meet, or reschedule appointments.";

const SUGGESTIONS = [
  "What's on today?",
  "What's on tomorrow?",
  "Find a free slot tomorrow morning",
  "Create a 30-min meeting tomorrow at 10 AM with colleague@example.com",
];

function WelcomeMessage(): Message {
  return {
    id: "welcome",
    role: "assistant",
    content: WELCOME,
  };
}

function ChatPanel({ sessionToken, connections, footer }: Props) {
  const [threadId, setThreadId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState<Message[]>([WelcomeMessage()]);
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);
  const [loadingThread, setLoadingThread] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dashboardView, setDashboardView] = useState<"chat" | "calendar" | "split">("split");
  const [calendarRefreshTrigger, setCalendarRefreshTrigger] = useState(0);

  const showEmpty =
    messages.length === 1 && messages[0]?.id === "welcome" && !running;

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const refreshThreads = useCallback(async () => {
    try {
      const data = await listThreads(sessionToken);
      setThreads(data.threads);
    } catch {}
  }, [sessionToken]);

  useEffect(() => {
    refreshThreads();
  }, [refreshThreads]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, progress]);

  function startNewChat() {
    if (running) return;
    setThreadId(crypto.randomUUID());
    setMessages([WelcomeMessage()]);
    setPrompt("");
    setMobileNavOpen(false);
  }

  async function resumeThread(nextThreadId: string) {
    if (running || loadingThread || nextThreadId === threadId) return;
    setLoadingThread(true);
    setProgress(null);
    setMobileNavOpen(false);

    try {
      const data = await loadThread(sessionToken, nextThreadId);
      setThreadId(data.threadId);
      setMessages(
        data.messages.length > 0 ? data.messages : [WelcomeMessage()],
      );
      setPrompt("");
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Could not load the chat",
        },
      ]);
    } finally {
      setLoadingThread(false);
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();

    if (!trimmed || running || loadingThread) return;
    const assistantId = crypto.randomUUID();

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      },
      {
        id: assistantId,
        role: "assistant",
        content: "",
      },
    ]);

    setPrompt("");
    setRunning(true);
    setProgress(null);

    try {
      await streamAgentChat(
        sessionToken,
        {
          message: trimmed,
          threadId,
        },
        (event) => {
          if (event.type === "progress" && event.message) {
            setProgress(event.message);
          }
          if (event.type === "token" && event.token) {
            setProgress(null);
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      content: message.content + event.token,
                    }
                  : message,
              ),
            );
          }

          if (event.type === "error") {
            setProgress(null);
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      content: event.message ?? "Agent failed",
                    }
                  : message,
              ),
            );
          }
        },
      );

      refreshThreads();
    } catch {
      setMessages((current) => [
        ...current.filter((m) => m.id !== assistantId || m.content.length > 0),
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Could not reach the agent API",
        },
      ]);
    } finally {
      setRunning(false);
      setProgress(null);
      setCalendarRefreshTrigger((prev) => prev + 1);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    sendMessage(prompt);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(prompt);
    }
  }

  return (
    <div className="flex h-svh overflow-hidden bg-background">
      {/* Mobile Drawer Backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar with Glassmorphism */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col glass-panel border-r border-white/10 transition-transform duration-300 md:static md:translate-x-0",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-2 px-4.5 pt-4.5 pb-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-xl shadow-[0_0_15px_rgba(20,184,166,0.4)]">
              <Image
                src="/muhurat-logo.png"
                alt="Muhurat AI Logo"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="font-heading text-base font-bold tracking-tight text-foreground">
                Muhurat AI
              </p>
              <p className="truncate text-[11px] text-muted-foreground font-medium">
                Vedic Calendar Intelligence
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Action Controls & Connections */}
        <div className="space-y-3 px-3.5 pb-3 pt-1">
          <Button
            onClick={startNewChat}
            variant="glow"
            className="w-full justify-start gap-2.5 rounded-xl h-9 text-xs"
          >
            <MessageSquarePlus className="size-4" />
            New Chat
          </Button>
          {connections}
        </div>

        <div className="px-3">
          <Separator className="bg-border/60" />
        </div>

        {/* Chats History */}
        <div className="flex min-h-0 flex-1 flex-col px-2 pt-3">
          <p className="mb-2 px-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Recent Conversations
          </p>
          <ScrollArea className="min-h-0 flex-1 px-1 pb-3">
            {threads.length === 0 ? (
              <p className="px-2 py-4 text-xs leading-relaxed text-muted-foreground text-center">
                No chats yet. Ask a question to begin.
              </p>
            ) : (
              <div className="space-y-1">
                {threads.map((thread) => {
                  const active = thread.id === threadId;
                  return (
                    <button
                      key={thread.id}
                      type="button"
                      disabled={running || loadingThread}
                      onClick={() => resumeThread(thread.id)}
                      className={cn(
                        "w-full rounded-xl px-3 py-2.5 text-left transition-all text-xs disabled:opacity-50",
                        active
                          ? "bg-primary/10 text-primary dark:bg-white/[0.09] dark:text-white border border-primary/30 dark:border-teal-500/30 shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <span className="line-clamp-1 font-medium leading-snug">
                        {thread.title}
                      </span>
                      <span className="mt-0.5 block text-[10.5px] text-muted-foreground">
                        {thread.updatedAt}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="px-3">
          <Separator className="bg-border/60" />
        </div>

        {/* Footer Profile */}
        <div className="mt-auto p-3">{footer}</div>
      </aside>

      {/* Main Chat Column */}
      <section className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden bg-background ambient-orbs">
        {/* Top Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-6 z-20">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden text-foreground hover:text-primary"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="size-5" />
            </Button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-teal-500 dark:bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                <p className="truncate text-sm font-semibold text-foreground">
                  Muhurat AI
                </p>
              </div>
              <p className="truncate text-[11px] text-muted-foreground hidden sm:block">
                Autonomous calendar intelligence & conflict-free scheduling
              </p>
            </div>
          </div>

          {/* Center View Selector */}
          <div className="flex items-center rounded-xl border border-border/70 bg-accent/40 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setDashboardView("chat")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.2 font-medium transition-all",
                dashboardView === "chat"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <MessageSquare className="size-3.5" />
              <span className="hidden sm:inline">AI Chat</span>
            </button>
            <button
              type="button"
              onClick={() => setDashboardView("calendar")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.2 font-medium transition-all",
                dashboardView === "calendar"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <CalendarIcon className="size-3.5" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => setDashboardView("split")}
              className={cn(
                "hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.2 font-medium transition-all",
                dashboardView === "split"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Columns className="size-3.5" />
              <span>Split View</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Dynamic Workspace: Full Calendar, Full Chat, or Side-by-Side Split View */}
        <div className="flex min-h-0 flex-1 h-[calc(100%-3.5rem)] overflow-hidden">
          {/* Calendar View Component (visible in 'calendar' mode or 'split' mode on desktop) */}
          {(dashboardView === "calendar" || dashboardView === "split") && (
            <div
              className={cn(
                "min-h-0 flex-1 h-full flex flex-col overflow-hidden",
                dashboardView === "split" ? "border-r border-border/60" : "",
              )}
            >
              <CalendarView
                sessionToken={sessionToken}
                refreshTrigger={calendarRefreshTrigger}
                onAskAgent={(agentPrompt) => {
                  sendMessage(agentPrompt);
                }}
              />
            </div>
          )}

          {/* AI Chat Column (visible in 'chat' mode or 'split' mode) */}
          {(dashboardView === "chat" || dashboardView === "split") && (
            <div
              className={cn(
                "flex min-h-0 flex-col h-full overflow-hidden",
                dashboardView === "split"
                  ? "w-full md:w-[380px] lg:w-[430px] xl:w-[480px] shrink-0 bg-background/50"
                  : "flex-1",
              )}
            >
              {/* Scrollable Messages Area */}
              <div
                ref={scrollContainerRef}
                className="custom-scrollbar relative flex min-h-0 flex-1 flex-col h-full overflow-y-auto overflow-x-hidden z-10"
              >
                <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
                  {showEmpty ? (
                    <div className="flex min-h-[45vh] flex-col items-center justify-center text-center slide-up-enter">
                      <div className="float-gentle relative mb-4 size-16 overflow-hidden rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.35)]">
                        <Image
                          src="/muhurat-logo.png"
                          alt="Muhurat AI Logo"
                          fill
                          sizes="64px"
                          className="object-cover"
                          priority
                        />
                      </div>
                      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        Muhurat AI
                      </h2>
                      <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                        {WELCOME}
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-md">
                        {SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => sendMessage(suggestion)}
                            disabled={running || loadingThread}
                            className="glass-card rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {loadingThread ? (
                        <div className="flex items-center gap-2 text-xs text-teal-500 py-4 justify-center">
                          <Loader2 className="size-4 animate-spin text-teal-400" />
                          Loading chat history...
                        </div>
                      ) : (
                        messages.map((message) => {
                          if (message.id === "welcome" && messages.length > 1) {
                            return null;
                          }

                          const isUser = message.role === "user";
                          const isSystem = message.role === "system";

                          return (
                            <div
                              key={message.id}
                              className={cn(
                                "slide-up-enter flex w-full min-w-0",
                                isUser ? "justify-end" : "justify-start",
                              )}
                            >
                              <div
                                className={cn(
                                  "min-w-0 overflow-hidden break-words",
                                  isUser &&
                                    "bubble-user-gradient max-w-[85%] rounded-2xl rounded-tr-xs px-4 py-2.5 text-white shadow-md text-sm",
                                  !isUser &&
                                    !isSystem &&
                                    "bubble-assistant-glass max-w-[90%] rounded-2xl rounded-tl-xs px-4.5 py-3 text-foreground shadow-md text-sm",
                                  isSystem &&
                                    "glass-card border-rose-500/30 bg-rose-950/30 text-rose-300 max-w-[90%] rounded-2xl px-4 py-2.5 text-xs",
                                )}
                              >
                                {!message.content && running ? (
                                  <div className="flex items-center gap-2 py-1 text-xs text-teal-500 dark:text-teal-300">
                                    <Loader2 className="size-3.5 animate-spin text-teal-400" />
                                    <span>Generating response...</span>
                                  </div>
                                ) : isUser ? (
                                  <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">
                                    {message.content}
                                  </p>
                                ) : (
                                  <MarkdownMessage
                                    content={message.content}
                                    tone={isSystem ? "system" : "assistant"}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}

                      {progress ? (
                        <div className="slide-up-enter flex items-center justify-start">
                          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs text-teal-600 dark:text-teal-300 backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                            <Loader2 className="size-3.5 animate-spin text-teal-400" />
                            <span>{progress}</span>
                          </div>
                        </div>
                      ) : null}
                      <div ref={bottomRef} />
                    </div>
                  )}
                </div>
              </div>

                {/* Floating Composer */}
                <div className="shrink-0 p-3 sm:px-4 sm:pb-4 z-20">
                  <form
                    onSubmit={onSubmit}
                    className="glass-composer mx-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl p-2 sm:p-2.5"
                  >
                    <Textarea
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      rows={1}
                      onKeyDown={onKeyDown}
                      disabled={running}
                      placeholder="Ask Muhurat AI to schedule, find free slots, or check agenda..."
                      className="max-h-32 min-h-[40px] flex-1 resize-none border-0 bg-transparent px-3 py-2 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground shadow-none focus-visible:ring-0"
                    />
                    <Button
                      type="submit"
                      variant="glow"
                      size="icon"
                      disabled={!prompt.trim() || running}
                      className="mb-0.5 size-9 shrink-0 rounded-xl"
                      aria-label="Send Message"
                    >
                      {running ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <ArrowUp className="size-4" />
                      )}
                    </Button>
                  </form>
                  <p className="mx-auto mt-1.5 max-w-3xl text-center text-[10px] text-muted-foreground font-medium">
                    Google Calendar • Instant Meet Generation • Free/Busy Intelligence
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  export default ChatPanel;
