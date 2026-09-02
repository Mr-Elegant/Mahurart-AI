"use client";

import { useEffect } from "react";

export function BackendWarmup() {
  useEffect(() => {
    const backendUrl = (
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      ""
    ).replace(/\/$/, "");

    if (backendUrl && backendUrl.startsWith("http")) {
      // Warm up Render backend immediately on user visit
      fetch(`${backendUrl}/health`, { mode: "no-cors" }).catch(() => {});
    }
  }, []);

  return null;
}
