import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "what is larp? internet slang & performative lore explained",
  description:
    "what does larp mean in modern internet culture? from live action roleplay to twitter monologues, explore how ordinary thoughts become performative lore.",
  keywords: [
    "what is larp",
    "larp meaning",
    "larp internet slang",
    "what does larp stand for",
    "larping on twitter",
    "how to larp",
    "the larp machine",
    "qubitsorg",
  ],
};

export default function WhatIsLarpPage() {
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
          culture guide
        </span>
      </div>

      {/* Article Header */}
      <header className="w-full text-left mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 lowercase mb-3">
          what is larp?
        </h1>
        <p className="text-sm font-serif italic text-neutral-500">
          from medieval foam swords to 3am group chat monologues.
        </p>
      </header>

      {/* Body Content */}
      <article className="w-full text-sm text-neutral-700 leading-relaxed space-y-6 text-left font-sans">
        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            1. the traditional definition
          </h2>
          <p>
            historically, <strong>LARP</strong> is an acronym for <em>Live Action Role-Playing</em>. in its original context, participants dress in physical costume, head into forests or rented convention halls, and act out fictional characters in fantasy or sci-fi tabletop worlds using foam weapons and dice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            2. the modern internet evolution
          </h2>
          <p>
            over the past decade on twitter/x, reddit, and discord, the word underwent a massive semantic mutation. today, to <strong>larp</strong> on the internet means to inhabit a hyper-specific persona, aesthetic, or philosophical crusade with total, uncompromising conviction.
          </p>
          <p>
            when someone on the timeline claims they can taste the exact altitude and soil minerality in a pour-over coffee, or writes a five-paragraph dissertation explaining why pep guardiola&apos;s inverted fullback system is an epistemological crisis, they are larping. they have taken a mundane preference and elevated it into high-stakes lore.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900 font-mono lowercase">
            3. why do people do it?
          </h2>
          <p>
            because standard conversational text is boring. saying <em>&quot;i drink coffee&quot;</em> communicates nothing about your character. saying <em>&quot;i dial my burrs to 42 microns and refuse to speak until the bloom phase completes&quot;</em> turns a caffeine addiction into narrative fiction.
          </p>
          <p>
            it is performative, self-aware comedy designed for the top 1% who appreciate subcultural minutiae over generic small talk.
          </p>
        </section>

        {/* CTA Card */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-pink-100 shadow-sm text-center space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 lowercase">
            ready to turn a normal thought into lore?
          </h3>
          <p className="text-xs text-neutral-500">
            type any ordinary sentence and let the machine escalate the stakes for you.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] lowercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>open the larp machine</span>
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
