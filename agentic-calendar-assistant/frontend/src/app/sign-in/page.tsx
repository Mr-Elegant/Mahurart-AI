import Image from "next/image";
import { RedirectIfAuthenticated } from "@/components/auth/RedirectIfAuthenticated";
import SignInComponent from "@/components/auth/sign-in";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function SignInPage() {
  return (
    <main className="ambient-orbs app-shell-bg flex min-h-svh items-center justify-center px-4 py-8 sm:px-6 relative">
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="slide-up-enter glass-panel rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_30px_0_rgba(20,184,166,0.12)] border border-white/[0.12]">
          <div className="flex flex-col items-center text-center">
            <div className="float-gentle relative mb-3 size-14 overflow-hidden rounded-2xl shadow-[0_0_25px_rgba(20,184,166,0.45)]">
              <Image
                src="/muhurat-logo.png"
                alt="Muhurat AI Logo"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Muhurat AI
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Vedic time intelligence & autonomous scheduling
            </p>
          </div>

          <div className="mt-5">
            <RedirectIfAuthenticated>
              <SignInComponent />
            </RedirectIfAuthenticated>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
