"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon-sm"
        className="size-8 rounded-xl text-slate-400 hover:text-white"
        aria-label="Toggle theme"
      >
        <Sun className="size-4 opacity-50" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-8 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
    >
      {isDark ? (
        <Sun className="size-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-teal-400 transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}
