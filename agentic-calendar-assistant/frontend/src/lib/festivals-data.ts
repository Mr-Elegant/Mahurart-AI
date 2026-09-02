export type SpecialDayCategory = "indian-festival" | "global-day" | "astronomical" | "national-holiday";

export type SpecialDay = {
  id: string;
  name: string;
  date: string; // MM-DD format (or YYYY-MM-DD for variable dates)
  year?: number; // Optional if year-specific
  emoji: string;
  category: SpecialDayCategory;
  categoryLabel: string;
  significance: string;
  muhuratWindow?: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
};

export const SPECIAL_DAYS_DATABASE: SpecialDay[] = [
  // --- JANUARY ---
  {
    id: "new-year",
    name: "New Year's Day",
    date: "01-01",
    emoji: "🎉",
    category: "global-day",
    categoryLabel: "Global Celebration",
    significance: "First day of the year in the Gregorian calendar, celebrated worldwide with resolutions, optimism, and new beginnings.",
    muhuratWindow: "Brahma Muhurat (4:30 AM – 5:30 AM) is ideal for setting intentions and spiritual renewal.",
    colorScheme: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "rgba(245,158,11,0.25)",
    },
  },
  {
    id: "lohrisankranti",
    name: "Makar Sankranti / Pongal / Lohri",
    date: "01-14",
    emoji: "🪁",
    category: "indian-festival",
    categoryLabel: "Harvest & Solar Festival",
    significance: "Celebrates the transition of the Sun (Surya) into Capricorn (Makara Rashi) and the harvest season across India.",
    muhuratWindow: "Sankranti Punya Kaal: 08:30 AM – 05:45 PM (Auspicious for charity, new projects, and sun salutations).",
    colorScheme: {
      bg: "bg-orange-500/15",
      border: "border-orange-500/30",
      text: "text-orange-400",
      glow: "rgba(249,115,22,0.25)",
    },
  },
  {
    id: "republic-day",
    name: "Republic Day (India)",
    date: "01-26",
    emoji: "🇮🇳",
    category: "national-holiday",
    categoryLabel: "National Celebration",
    significance: "Commemorates the adoption of the Constitution of India in 1950, establishing the sovereign republic.",
    colorScheme: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "rgba(16,185,129,0.25)",
    },
  },

  // --- FEBRUARY ---
  {
    id: "vasant-panchami",
    name: "Vasant Panchami (Saraswati Puja)",
    date: "02-02",
    emoji: "🌸",
    category: "indian-festival",
    categoryLabel: "Vedic Wisdom Festival",
    significance: "Celebrates the arrival of Spring (Ritu Raj) and honors Goddess Saraswati, patron of knowledge, arts, and wisdom.",
    muhuratWindow: "Purvahna Muhurat: 07:15 AM – 12:35 PM (Most auspicious for starting studies, music, or writing).",
    colorScheme: {
      bg: "bg-yellow-500/15",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      glow: "rgba(234,179,8,0.25)",
    },
  },
  {
    id: "valentines-day",
    name: "Valentine's Day",
    date: "02-14",
    emoji: "❤️",
    category: "global-day",
    categoryLabel: "International Day",
    significance: "Global day of expressing affection, love, and appreciation among partners, friends, and family.",
    colorScheme: {
      bg: "bg-rose-500/15",
      border: "border-rose-500/30",
      text: "text-rose-400",
      glow: "rgba(244,63,94,0.25)",
    },
  },
  {
    id: "maha-shivaratri",
    name: "Maha Shivaratri",
    date: "02-15",
    emoji: "🕉️",
    category: "indian-festival",
    categoryLabel: "Vedic Cosmic Festival",
    significance: "The Great Night of Shiva celebrating the cosmic dance (Tandava) of creation, preservation, and dissolution.",
    muhuratWindow: "Nishita Kaal Puja: 12:09 AM – 01:00 AM (Deep meditation, mindfulness, and fasting).",
    colorScheme: {
      bg: "bg-indigo-500/15",
      border: "border-indigo-500/30",
      text: "text-indigo-400",
      glow: "rgba(99,102,241,0.25)",
    },
  },

  // --- MARCH ---
  {
    id: "womens-day",
    name: "International Women's Day",
    date: "03-08",
    emoji: "💜",
    category: "global-day",
    categoryLabel: "United Nations Observance",
    significance: "Global celebration honoring social, economic, cultural, and political achievements of women worldwide.",
    colorScheme: {
      bg: "bg-purple-500/15",
      border: "border-purple-500/30",
      text: "text-purple-400",
      glow: "rgba(168,85,247,0.25)",
    },
  },
  {
    id: "pi-day",
    name: "Pi Day (3.14)",
    date: "03-14",
    emoji: "🥧",
    category: "global-day",
    categoryLabel: "Science & Math Day",
    significance: "Celebrates the mathematical constant π (3.14) and Albert Einstein's birthday.",
    colorScheme: {
      bg: "bg-blue-500/15",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "rgba(59,130,246,0.25)",
    },
  },
  {
    id: "holi",
    name: "Holi (Festival of Colors)",
    date: "03-04",
    emoji: "🎨",
    category: "indian-festival",
    categoryLabel: "Spring Festival",
    significance: "Celebrates the victory of good over evil (Holika Dahan), the onset of spring, and the eternal love of Radha-Krishna.",
    muhuratWindow: "Holika Dahan Muhurat: 06:25 PM – 08:50 PM. Dhulandi (Colors) next morning.",
    colorScheme: {
      bg: "bg-pink-500/15",
      border: "border-pink-500/30",
      text: "text-pink-400",
      glow: "rgba(236,72,153,0.25)",
    },
  },

  // --- APRIL ---
  {
    id: "world-health-day",
    name: "World Health Day",
    date: "04-07",
    emoji: "🩺",
    category: "global-day",
    categoryLabel: "WHO Observance",
    significance: "Global health awareness day drawing attention to worldwide physical, mental, and public health priorities.",
    colorScheme: {
      bg: "bg-teal-500/15",
      border: "border-teal-500/30",
      text: "text-teal-400",
      glow: "rgba(20,184,166,0.25)",
    },
  },
  {
    id: "baisakhi-rama-navami",
    name: "Baisakhi / Rama Navami",
    date: "04-14",
    emoji: "🏹",
    category: "indian-festival",
    categoryLabel: "Harvest & Devotional",
    significance: "Marks the Punjabi solar new year and the birth of Lord Rama, exemplifying dharma, righteousness, and truth.",
    muhuratWindow: "Madhyahna Muhurat: 11:05 AM – 01:38 PM.",
    colorScheme: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "rgba(245,158,11,0.25)",
    },
  },
  {
    id: "earth-day",
    name: "Earth Day",
    date: "04-22",
    emoji: "🌍",
    category: "global-day",
    categoryLabel: "Global Environmental Day",
    significance: "Worldwide annual event to demonstrate support for environmental protection and planetary sustainability.",
    colorScheme: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "rgba(16,185,129,0.25)",
    },
  },

  // --- MAY ---
  {
    id: "labor-day",
    name: "International Workers' Day",
    date: "05-01",
    emoji: "⚒️",
    category: "global-day",
    categoryLabel: "International Observance",
    significance: "Celebrates the contributions of workers and labor rights movements worldwide.",
    colorScheme: {
      bg: "bg-red-500/15",
      border: "border-red-500/30",
      text: "text-red-400",
      glow: "rgba(239,68,68,0.25)",
    },
  },
  {
    id: "buddha-purnima",
    name: "Buddha Purnima",
    date: "05-02",
    emoji: "☸️",
    category: "indian-festival",
    categoryLabel: "Spiritual Festival",
    significance: "Commemorates the birth, enlightenment, and Nirvana of Gautama Buddha.",
    muhuratWindow: "Full Moon (Purnima Tithi) ideal for mindfulness, meditation, and peace.",
    colorScheme: {
      bg: "bg-cyan-500/15",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "rgba(6,182,212,0.25)",
    },
  },

  // --- JUNE ---
  {
    id: "environment-day",
    name: "World Environment Day",
    date: "06-05",
    emoji: "🌱",
    category: "global-day",
    categoryLabel: "UN Environment Day",
    significance: "United Nations flagship day for promoting worldwide awareness and action for the protection of our environment.",
    colorScheme: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "rgba(16,185,129,0.25)",
    },
  },
  {
    id: "yoga-day",
    name: "International Yoga Day & Solstice",
    date: "06-21",
    emoji: "🧘",
    category: "astronomical",
    categoryLabel: "Global Wellness & Solstice",
    significance: "Summer Solstice (longest day in the Northern Hemisphere) and international celebration of holistic physical & mental health through Yoga.",
    muhuratWindow: "Surya Namaskar at Sunrise (05:25 AM) carries maximum solar bio-rhythm benefits.",
    colorScheme: {
      bg: "bg-teal-500/15",
      border: "border-teal-500/30",
      text: "text-teal-400",
      glow: "rgba(20,184,166,0.25)",
    },
  },

  // --- JULY ---
  {
    id: "guru-purnima",
    name: "Guru Purnima",
    date: "07-10",
    emoji: "🌕",
    category: "indian-festival",
    categoryLabel: "Vedic Reverence Day",
    significance: "Dedicated to spiritual and academic teachers (Gurus) and the birth of sage Veda Vyasa.",
    muhuratWindow: "Purnima Tithi: Auspicious for expressing gratitude and seeking mentorship.",
    colorScheme: {
      bg: "bg-yellow-500/15",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      glow: "rgba(234,179,8,0.25)",
    },
  },

  // --- AUGUST ---
  {
    id: "independence-day-in",
    name: "Independence Day (India)",
    date: "08-15",
    emoji: "🇮🇳",
    category: "national-holiday",
    categoryLabel: "National Holiday",
    significance: "Celebrates the independence of India from British colonial rule on August 15, 1947.",
    colorScheme: {
      bg: "bg-orange-500/15",
      border: "border-orange-500/30",
      text: "text-orange-400",
      glow: "rgba(249,115,22,0.25)",
    },
  },
  {
    id: "raksha-bandhan",
    name: "Raksha Bandhan",
    date: "08-28",
    emoji: "🪢",
    category: "indian-festival",
    categoryLabel: "Festival of Sibling Bond",
    significance: "Celebrates the bond of love, protection, and duty between brothers and sisters.",
    muhuratWindow: "Aparahna Muhurat (Afternoon): 01:30 PM – 04:15 PM (avoid Bhadra period).",
    colorScheme: {
      bg: "bg-rose-500/15",
      border: "border-rose-500/30",
      text: "text-rose-400",
      glow: "rgba(244,63,94,0.25)",
    },
  },

  // --- SEPTEMBER ---
  {
    id: "teachers-day-in",
    name: "Teachers' Day (India)",
    date: "09-05",
    emoji: "📚",
    category: "national-holiday",
    categoryLabel: "National Observance",
    significance: "Honors the birthday of Dr. Sarvepalli Radhakrishnan, philosopher and second President of India.",
    colorScheme: {
      bg: "bg-blue-500/15",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "rgba(59,130,246,0.25)",
    },
  },
  {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    date: "09-14",
    emoji: "🐘",
    category: "indian-festival",
    categoryLabel: "Lord of New Beginnings",
    significance: "Celebrates the arrival of Lord Ganesha, remover of obstacles (Vighnaharta) and patron of intellect.",
    muhuratWindow: "Madhyahna Ganesha Puja Muhurat: 11:05 AM – 01:35 PM (Ideal for launching apps & new ventures).",
    colorScheme: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "rgba(245,158,11,0.25)",
    },
  },
  {
    id: "international-peace-day",
    name: "International Day of Peace",
    date: "09-21",
    emoji: "🕊️",
    category: "global-day",
    categoryLabel: "UN Global Observance",
    significance: "Dedicated to world peace, ceasefire, and non-violence across nations and communities.",
    colorScheme: {
      bg: "bg-sky-500/15",
      border: "border-sky-500/30",
      text: "text-sky-400",
      glow: "rgba(14,165,233,0.25)",
    },
  },

  // --- OCTOBER ---
  {
    id: "gandhi-jayanti",
    name: "Gandhi Jayanti / Non-Violence Day",
    date: "10-02",
    emoji: "🕊️",
    category: "national-holiday",
    categoryLabel: "National & UN Observance",
    significance: "Birth anniversary of Mahatma Gandhi, celebrated globally as International Day of Non-Violence.",
    colorScheme: {
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "rgba(16,185,129,0.25)",
    },
  },
  {
    id: "mental-health-day",
    name: "World Mental Health Day",
    date: "10-10",
    emoji: "🧠",
    category: "global-day",
    categoryLabel: "Global Awareness Day",
    significance: "Promotes global mental health education, psychological safety, and mindful working practices.",
    colorScheme: {
      bg: "bg-teal-500/15",
      border: "border-teal-500/30",
      text: "text-teal-400",
      glow: "rgba(20,184,166,0.25)",
    },
  },
  {
    id: "dussehra",
    name: "Dussehra (Vijayadashami)",
    date: "10-20",
    emoji: "🏹",
    category: "indian-festival",
    categoryLabel: "Victory of Good over Evil",
    significance: "Celebrates the victory of Lord Rama over Ravana and Goddess Durga over Mahishasura. Ideal for starting auspicious enterprises.",
    muhuratWindow: "Vijaya Muhurat: 02:05 PM – 02:50 PM (Peak auspicious time for initiating business contracts).",
    colorScheme: {
      bg: "bg-purple-500/15",
      border: "border-purple-500/30",
      text: "text-purple-400",
      glow: "rgba(168,85,247,0.25)",
    },
  },
  {
    id: "halloween",
    name: "Halloween",
    date: "10-31",
    emoji: "🎃",
    category: "global-day",
    categoryLabel: "Cultural Celebration",
    significance: "Evening before All Hallows' Day, celebrated with costumes, lanterns, and community festivities.",
    colorScheme: {
      bg: "bg-orange-500/15",
      border: "border-orange-500/30",
      text: "text-orange-400",
      glow: "rgba(249,115,22,0.25)",
    },
  },

  // --- NOVEMBER ---
  {
    id: "dhanteras",
    name: "Dhanteras (Dhantrayodashi)",
    date: "11-06",
    emoji: "🪙",
    category: "indian-festival",
    categoryLabel: "Festival of Prosperity",
    significance: "Marks the beginning of Diwali festivities and honors Dhanvantari, god of health and ayurveda.",
    muhuratWindow: "Pradosh Kaal Muhurat: 05:45 PM – 08:15 PM (Most auspicious for investments and assets).",
    colorScheme: {
      bg: "bg-yellow-500/15",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      glow: "rgba(234,179,8,0.25)",
    },
  },
  {
    id: "diwali",
    name: "Diwali (Deepavali)",
    date: "11-08",
    emoji: "🪔",
    category: "indian-festival",
    categoryLabel: "Great Festival of Lights",
    significance: "Celebrates the victory of light over darkness, knowledge over ignorance, and the homecoming of Lord Rama.",
    muhuratWindow: "Lakshmi Puja Pradosh Muhurat: 06:15 PM – 08:25 PM (Best for financial prosperity and new accounts).",
    colorScheme: {
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "rgba(245,158,11,0.35)",
    },
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving (US)",
    date: "11-26",
    emoji: "🦃",
    category: "global-day",
    categoryLabel: "National Holiday",
    significance: "Day of gratitude, feast, and gathering with family and friends.",
    colorScheme: {
      bg: "bg-amber-600/15",
      border: "border-amber-600/30",
      text: "text-amber-500",
      glow: "rgba(217,119,6,0.25)",
    },
  },

  // --- DECEMBER ---
  {
    id: "christmas-eve",
    name: "Christmas Eve",
    date: "12-24",
    emoji: "✨",
    category: "global-day",
    categoryLabel: "Holiday Eve",
    significance: "Evening preceding Christmas Day, traditionally spent in joy, carols, and anticipation.",
    colorScheme: {
      bg: "bg-blue-500/15",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "rgba(59,130,246,0.25)",
    },
  },
  {
    id: "christmas",
    name: "Christmas Day",
    date: "12-25",
    emoji: "🎄",
    category: "global-day",
    categoryLabel: "Global Holiday",
    significance: "Celebration of the birth of Jesus Christ, marked by gift giving, kindness, and goodwill across the globe.",
    colorScheme: {
      bg: "bg-red-500/15",
      border: "border-red-500/30",
      text: "text-red-400",
      glow: "rgba(239,68,68,0.25)",
    },
  },
  {
    id: "new-years-eve",
    name: "New Year's Eve",
    date: "12-31",
    emoji: "🎆",
    category: "global-day",
    categoryLabel: "Global Countdown",
    significance: "Final day of the Gregorian year, celebrated with countdowns, fireworks, and reflection.",
    colorScheme: {
      bg: "bg-purple-500/15",
      border: "border-purple-500/30",
      text: "text-purple-400",
      glow: "rgba(168,85,247,0.25)",
    },
  },
];

/**
 * Returns any special day / festival matching a given date.
 */
export function getSpecialDayForDate(date: Date): SpecialDay | undefined {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateKey = `${month}-${day}`;

  return SPECIAL_DAYS_DATABASE.find((item) => item.date === dateKey);
}
