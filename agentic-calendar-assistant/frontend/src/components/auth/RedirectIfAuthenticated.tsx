"use client";

import { useSession } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isSessionLoading, router]);

  return <>{children}</>;
}
