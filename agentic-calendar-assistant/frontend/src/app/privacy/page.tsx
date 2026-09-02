import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Lock, Calendar, EyeOff } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Muhurat AI",
  description: "Privacy Policy and Google User Data usage policy for Muhurat AI.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: September 2, 2026
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="size-4.5 text-teal-400" />
              1. Overview & Commitment
            </h2>
            <p>
              Muhurat AI (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Service&rdquo;) provides an autonomous AI calendar assistant that helps users optimize meeting scheduling, detect conflict-free timeslots, and manage Google Calendar events. We respect your privacy and are committed to protecting your personal information and Google user data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="size-4.5 text-teal-400" />
              2. Google API Data & Scopes
            </h2>
            <p>
              When you connect your Google Account with Muhurat AI, we request access to the following OAuth scope:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
              <li>
                <code className="bg-black/30 px-1.5 py-0.5 rounded text-teal-300">https://www.googleapis.com/auth/calendar</code>: Used solely to read your calendar events for conflict detection and write/update/delete events you explicitly instruct the AI agent to manage.
              </li>
            </ul>
            <p className="font-medium text-white">
              Google API Limited Use Disclosure:
            </p>
            <p>
              Muhurat AI&apos;s use and transfer to any other app of information received from Google APIs will adhere to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noreferrer"
                className="text-teal-400 underline hover:text-teal-300"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <EyeOff className="size-4.5 text-teal-400" />
              3. What We Do NOT Do with Your Data
            </h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
              <li>We do <strong>NOT</strong> sell your personal data or Google Calendar information to any third parties.</li>
              <li>We do <strong>NOT</strong> use your private calendar event contents or attendee information for training generalized foundation AI models.</li>
              <li>We do <strong>NOT</strong> share your calendar details with advertisers or data brokers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <Lock className="size-4.5 text-teal-400" />
              4. Data Storage & Security
            </h2>
            <p>
              All Google OAuth tokens are stored encrypted using Descope Outbound Application token vaults with industry-standard TLS 1.3 encryption in transit and AES-256 at rest. You may revoke access at any time by disconnecting your Google account from the dashboard or through your Google Account Security settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-semibold text-white">
              5. Contact Information
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact our support team at:{" "}
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
