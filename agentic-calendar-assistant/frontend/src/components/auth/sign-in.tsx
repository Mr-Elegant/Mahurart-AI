"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SignInComponent() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <div className="descope-wrap">
      <Descope
        flowId="sign-up-or-in"
        theme={theme}
        autoFocus="skipFirstScreen"
        redirectAfterSuccess="/dashboard"
        onSuccess={() => {
          router.replace("/dashboard");
          router.refresh();
        }}
        onError={(event) => console.error("sign in failed", event.detail)}
      />
    </div>
  );
}

export default SignInComponent;
