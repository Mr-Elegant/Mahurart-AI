"use client";

import { useEffect, useState, useRef } from "react";
import { Globe, Check, ChevronDown, Clock, Search } from "lucide-react";
import {
  COUNTRY_TIMEZONES,
  CountryTimezone,
  getDefaultTimezone,
  formatTimeForTimezone,
} from "@/lib/timezones";

type Props = {
  selectedTimezone: CountryTimezone;
  onSelectTimezone: (tz: CountryTimezone) => void;
  className?: string;
};

export function TimezoneSelector({
  selectedTimezone,
  onSelectTimezone,
  className = "",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live ticking clock for the selected country timezone
  useEffect(() => {
    const updateTime = () => {
      setCurrentTimeStr(formatTimeForTimezone(new Date(), selectedTimezone.iana));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [selectedTimezone]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredTimezones = COUNTRY_TIMEZONES.filter(
    (tz) =>
      tz.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.abbr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.iana.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-border/70 bg-accent/30 hover:bg-accent/50 px-2.5 py-1.5 text-xs font-medium text-foreground transition-all shadow-xs"
        title={`Selected Timezone: ${selectedTimezone.countryName} (${selectedTimezone.iana})`}
      >
        <span className="text-sm shrink-0">{selectedTimezone.flag}</span>
        <span className="font-semibold text-teal-600 dark:text-teal-300">
          {selectedTimezone.abbr.split(" ")[0]}
        </span>
        <span className="text-muted-foreground hidden sm:inline font-mono">
          {currentTimeStr || "--:--"}
        </span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] z-50 rounded-2xl border border-white/15 bg-background/95 p-2 shadow-2xl backdrop-blur-2xl slide-up-enter">
          <div className="p-2 border-b border-border/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Globe className="size-3.5 text-teal-500" />
                <span>Select Country Standard Time</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {COUNTRY_TIMEZONES.length} regions
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country, timezone, city..."
                className="w-full rounded-lg border border-border/60 bg-accent/40 py-1.5 pl-7 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-teal-500/60"
                autoFocus
              />
            </div>
          </div>

          {/* Timezone Options List */}
          <div className="max-h-64 overflow-y-auto p-1 space-y-0.5 custom-scrollbar">
            {filteredTimezones.length === 0 ? (
              <p className="p-3 text-center text-xs text-muted-foreground">
                No matching country found
              </p>
            ) : (
              filteredTimezones.map((tz) => {
                const isSelected = tz.iana === selectedTimezone.iana;
                const localTime = formatTimeForTimezone(new Date(), tz.iana);

                return (
                  <button
                    key={tz.iana + tz.countryName}
                    type="button"
                    onClick={() => {
                      onSelectTimezone(tz);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 rounded-xl p-2 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-teal-500/15 border border-teal-500/40 text-teal-700 dark:text-teal-300 font-semibold"
                        : "hover:bg-accent/50 text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base shrink-0">{tz.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate font-medium">
                            {tz.countryName}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent text-muted-foreground font-mono">
                            {tz.abbr}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate font-mono">
                          {tz.offset} • {tz.iana}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {localTime}
                      </span>
                      {isSelected && (
                        <Check className="size-3.5 text-teal-500 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
