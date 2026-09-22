import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "the larp machine — the monologue engine by qubitsorg",
  description:
    "the larp machine is an AI text engine engineered for the top 1% performative and niche. turn everyday statements into unbearable lore.",
  keywords: [
    "the larp machine",
    "larp machine",
    "larp generator",
    "the monologue engine",
    "copypasta machine",
    "qubitsorg larp",
    "qubitsorg",
  ],
};

export default function TheLarpMachinePage() {
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
          manifesto
        </span>
      </div>

      {/* Article Header */}
      <header className="w-full text-left mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 lowercase mb-3">
          the larp machine.
        </h1>
        <p className="text-sm font-serif italic text-neutral-500">
          engineered for the top 1% performative and niche.
        </p>
      </header>

      {/* Body Content */}
      <article className="w-full text-sm text-neutral-700 leading-relaxed space-y-6 text-left font-sans">
        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            why we built it
          </h2>
          <p>
            most generative ai outputs feel like high school essays or corporate linkedin announcements. they use words like <em>&quot;tapestry&quot;</em>, <em>&quot;testament&quot;</em>, and <em>&quot;delve&quot;</em> that no human has uttered in an iMessage thread since 1842.
          </p>
          <p>
            the larp machine was built to dismantle that. it speaks in authentic internet cadence: sharp, unhinged, observant, and deeply steeped in subcultural literacy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            how it works
          </h2>
          <p>
            behind the minimalist white canvas, a multi-model cascade parses your mundane input, strips away the polite pleasantries, injects high-density technical and aesthetic terminology, and returns a direct first-person monologue ready to paste into your group chat or post to the timeline.
          </p>
        </section>

        {/* CTA Card */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-pink-100 shadow-sm text-center space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 lowercase">
            test the machine now
          </h3>
          <p className="text-xs text-neutral-500">
            zero cost. zero corporate fluff. pure lore.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] lowercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>start larping</span>
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
