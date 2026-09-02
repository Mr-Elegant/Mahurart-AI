import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Muhurat AI",
  description: "Terms of Service for Muhurat AI autonomous calendar assistant.",
};

export default function TermsPage() {
  return (
    <div className="min-h-svh app-shell-bg py-12 px-4 sm:px-6 lg:px-8 text-foreground">
      <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Muhurat AI
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative size-12 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(20,184,166,0.35)]">
            <Image
              src="/muhurat-logo.png"
              alt="Muhurat AI Logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">
              Terms of Service
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: September 2, 2026
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="size-4.5 text-teal-400" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Muhurat AI (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the service immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="size-4.5 text-teal-400" />
              2. Description of Service
            </h2>
            <p>
              Muhurat AI is an autonomous AI-powered assistant designed to facilitate calendar scheduling, conflict detection, meeting organization, and Google Meet link generation. The service relies on user-authorized Google Calendar access to interact with your schedule.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white">
              3. User Responsibilities
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. You agree not to misuse the service for unlawful activities or attempt unauthorized access to our systems.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white">
              4. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to the service at our sole discretion, without prior notice, if you breach these Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white">
              5. Contact Us
            </h2>
            <p>
              Questions regarding these Terms should be sent to:{" "}
              <a
                href="mailto:preetverma365@gmail.com"
                className="text-teal-400 underline hover:text-teal-300"
              >
                preetverma365@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
