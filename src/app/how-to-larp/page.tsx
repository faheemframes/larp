import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "how to larp: the masterclass in performative internet lore",
  description:
    "a step-by-step masterclass on how to larp ordinary thoughts into unbearable, hyper-specific internet monologues.",
  keywords: [
    "how to larp",
    "how to be performative",
    "how to be niche",
    "how to yap",
    "larp guide",
    "the larp machine",
    "qubitsorg",
  ],
};

export default function HowToLarpPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 max-w-xl mx-auto w-full">
      {/* Navigation */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors font-mono lowercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back to the machine</span>
        </Link>
        <span className="text-[11px] font-mono text-pink-500 bg-pink-50 border border-pink-200/50 px-2 py-0.5 rounded-full">
          masterclass
        </span>
      </div>

      {/* Article Header */}
      <header className="w-full text-left mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 lowercase mb-3">
          how to larp.
        </h1>
        <p className="text-sm font-serif italic text-neutral-500">
          the mechanics of turning mild interest into an all-consuming crusade.
        </p>
      </header>

      {/* Body Content */}
      <article className="w-full text-sm text-neutral-700 leading-relaxed space-y-6 text-left font-sans">
        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            rule 1: eliminate generic qualifiers
          </h2>
          <p>
            never say <em>&quot;i think&quot;</em>, <em>&quot;in my opinion&quot;</em>, or <em>&quot;personally&quot;</em>. a true larp does not admit doubt. your perspective is not a preference; it is an immutable law of physics you are merely documenting for the uninitiated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            rule 2: cite obsessive subcultural specifics
          </h2>
          <p>
            the power of the larp is in the nouns. do not talk about playing games; talk about frame-data hitboxes on 240hz refresh panels. do not talk about studying code; mention diagnosing thread-safety race conditions in valgrind at 4:18am with three nested terminal windows.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            rule 3: escalate the stakes
          </h2>
          <p>
            if your sentence does not imply that human civilization hangs in the balance between two minor technical choices, you have failed to larp. every routine decision must be framed as an existential turning point.
          </p>
        </section>

        {/* Example comparison */}
        <section className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-3 font-mono text-xs">
          <div className="text-neutral-400">before (normal):</div>
          <div className="text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-200">
            &quot;i like messi.&quot;
          </div>
          <div className="text-pink-500 pt-2">after (the larp):</div>
          <div className="text-neutral-800 bg-pink-50/50 p-2.5 rounded-lg border border-pink-200/60 leading-relaxed font-sans text-xs">
            &quot;bro watched a 2011 camp nou low block masterclass once and realized human kinetics peaked when a five-foot-seven rosario native walked four kilometers across the pitch and decided geometry was a suggestion.&quot;
          </div>
        </section>

        {/* CTA Card */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-pink-100 shadow-sm text-center space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 lowercase">
            skip the manual effort
          </h3>
          <p className="text-xs text-neutral-500">
            the larp machine synthesizes this cadence automatically in under 1 second.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] lowercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>generate your larp</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="w-full pt-10 text-center text-[10px] text-neutral-400 lowercase font-mono flex items-center justify-between border-t border-neutral-100 mt-10">
        <span>the larp machine</span>
        <a
          href="https://qubitsorg.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition-colors"
        >
          by qubitsorg
        </a>
      </footer>
    </main>
  );
}
