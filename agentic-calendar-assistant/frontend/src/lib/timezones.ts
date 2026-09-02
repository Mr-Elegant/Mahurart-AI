export type CountryTimezone = {
  countryCode: string;
  countryName: string;
  flag: string;
  iana: string;
  abbr: string;
  offset: string;
  region: string;
};

export const COUNTRY_TIMEZONES: CountryTimezone[] = [
  {
    countryCode: "IN",
    countryName: "India",
    flag: "🇮🇳",
    iana: "Asia/Kolkata",
    abbr: "IST",
    offset: "UTC+5:30",
    region: "Asia / South Asia",
  },
  {
    countryCode: "US",
    countryName: "United States (Eastern)",
    flag: "🇺🇸",
    iana: "America/New_York",
    abbr: "EST / EDT",
    offset: "UTC-5 / UTC-4",
    region: "Americas / New York",
  },
  {
    countryCode: "US",
    countryName: "United States (Central)",
    flag: "🇺🇸",
    iana: "America/Chicago",
    abbr: "CST / CDT",
    offset: "UTC-6 / UTC-5",
    region: "Americas / Chicago",
  },
  {
    countryCode: "US",
    countryName: "United States (Mountain)",
    flag: "🇺🇸",
    iana: "America/Denver",
    abbr: "MST / MDT",
    offset: "UTC-7 / UTC-6",
    region: "Americas / Denver",
  },
  {
    countryCode: "US",
    countryName: "United States (Pacific)",
    flag: "🇺🇸",
    iana: "America/Los_Angeles",
    abbr: "PST / PDT",
    offset: "UTC-8 / UTC-7",
    region: "Americas / Los Angeles",
  },
  {
    countryCode: "GB",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    iana: "Europe/London",
    abbr: "GMT / BST",
    offset: "UTC+0 / UTC+1",
    region: "Europe / London",
  },
  {
    countryCode: "AE",
    countryName: "United Arab Emirates (Dubai)",
    flag: "🇦🇪",
    iana: "Asia/Dubai",
    abbr: "GST",
    offset: "UTC+4",
    region: "Middle East / Gulf",
  },
  {
    countryCode: "SG",
    countryName: "Singapore",
    flag: "🇸🇬",
    iana: "Asia/Singapore",
    abbr: "SGT",
    offset: "UTC+8",
    region: "Asia / Southeast Asia",
  },
  {
    countryCode: "JP",
    countryName: "Japan",
    flag: "🇯🇵",
    iana: "Asia/Tokyo",
    abbr: "JST",
    offset: "UTC+9",
    region: "Asia / East Asia",
  },
  {
    countryCode: "AU",
    countryName: "Australia (Sydney)",
    flag: "🇦🇺",
    iana: "Australia/Sydney",
    abbr: "AEST / AEDT",
    offset: "UTC+10 / UTC+11",
    region: "Oceania / Sydney",
  },
  {
    countryCode: "DE",
    countryName: "Germany / Central Europe",
    flag: "🇩🇪",
    iana: "Europe/Berlin",
    abbr: "CET / CEST",
    offset: "UTC+1 / UTC+2",
    region: "Europe / Berlin",
  },
  {
    countryCode: "FR",
    countryName: "France",
    flag: "🇫🇷",
    iana: "Europe/Paris",
    abbr: "CET / CEST",
    offset: "UTC+1 / UTC+2",
    region: "Europe / Paris",
  },
  {
    countryCode: "CA",
    countryName: "Canada (Toronto)",
    flag: "🇨🇦",
    iana: "America/Toronto",
    abbr: "EST / EDT",
    offset: "UTC-5 / UTC-4",
    region: "Americas / Toronto",
  },
  {
    countryCode: "BR",
    countryName: "Brazil (São Paulo)",
    flag: "🇧🇷",
    iana: "America/Sao_Paulo",
    abbr: "BRT",
    offset: "UTC-3",
    region: "Americas / São Paulo",
  },
  {
    countryCode: "CN",
    countryName: "China",
    flag: "🇨🇳",
    iana: "Asia/Shanghai",
    abbr: "CST",
    offset: "UTC+8",
    region: "Asia / Beijing",
  },
  {
    countryCode: "SA",
    countryName: "Saudi Arabia",
    flag: "🇸🇦",
    iana: "Asia/Riyadh",
    abbr: "AST",
    offset: "UTC+3",
    region: "Middle East / Riyadh",
  },
  {
    countryCode: "ZA",
    countryName: "South Africa",
    flag: "🇿🇦",
    iana: "Africa/Johannesburg",
    abbr: "SAST",
    offset: "UTC+2",
    region: "Africa / Johannesburg",
  },
  {
    countryCode: "NZ",
    countryName: "New Zealand",
    flag: "🇳🇿",
    iana: "Pacific/Auckland",
    abbr: "NZST / NZDT",
    offset: "UTC+12 / UTC+13",
    region: "Oceania / Auckland",
  },
];

export function getDefaultTimezone(): CountryTimezone {
  try {
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = COUNTRY_TIMEZONES.find((tz) => tz.iana === userTz);
    if (match) return match;
  } catch {
    // Fallback below
  }
  return COUNTRY_TIMEZONES[0]; // Default to Asia/Kolkata (India)
}

export function formatTimeForTimezone(
  date: Date | string,
  timeZone: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  try {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      ...options,
    }).format(d);
  } catch {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
}
