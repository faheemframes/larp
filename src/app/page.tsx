"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, Share2, RotateCcw, AlertCircle, Sparkles } from "lucide-react";

const EXAMPLE_PROMPTS = [
  "i study comp sci",
  "i like ronaldo",
  "i like messi",
  "i drink coffee",
  "i watch anime",
  "i play valorant",
  "i like mechanical keyboards",
];

const LOADING_STEPS = [
  "consulting 3am group chats...",
  "synthesizing niche expertise...",
  "escalating stakes...",
  "crafting direct replacement...",
];

export default function LarpApp() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [originalMessage, setOriginalMessage] = useState<string | null>(null);
  const [larpResult, setLarpResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [variationCount, setVariationCount] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const canShare = typeof navigator !== "undefined" && Boolean(navigator.share);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [loading]);

  const trimmed = input.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = input.length;
  const isOverLimit = charCount > 300;
  const canSubmit = trimmed.length > 0 && !isOverLimit && !loading;

  const handleGenerate = async (textToLarp?: string, isReroll: boolean = false) => {
    const targetText = (textToLarp ?? input).trim();
    if (!targetText || targetText.length > 300 || loading) return;

    setLoading(true);
    setLoadingStepIndex(0);
    setError(null);

    const nextSeed = isReroll ? variationCount + 1 : 0;
    if (isReroll) {
      setVariationCount(nextSeed);
    }

    try {
      const res = await fetch("/api/larp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: targetText.toLowerCase(),
          seed: nextSeed,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        const errorMsg = data?.error || "the larp machine malfunctioned. try again.";
        setError(errorMsg);
        setLoading(false);
        return;
      }

      setOriginalMessage(data.original || targetText.toLowerCase());
      setLarpResult(data.larp);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch {
      setError("the larp machine malfunctioned. try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (canSubmit) {
        handleGenerate();
      }
    }
  };

  const handleSelectExample = (prompt: string) => {
    setInput(prompt);
    setError(null);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleCopy = async () => {
    if (!larpResult) return;
    try {
      await navigator.clipboard.writeText(larpResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = larpResult;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!larpResult) return;

    if (canShare && navigator.share) {
      try {
        await navigator.share({
          title: "larp",
          text: larpResult,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          handleCopy();
        }
      }
    } else {
      await handleCopy();
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  const handleReset = () => {
    setLarpResult(null);
    setOriginalMessage(null);
    setError(null);
    setInput("");
    setVariationCount(0);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between px-4 py-8 sm:py-12 max-w-lg mx-auto w-full">
      {/* Minimal Header */}
      <header className="text-center pb-6 sm:pb-8">
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-1.5 lowercase">
          larp<span className="text-pink-400">.</span>
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-light lowercase">
          for the top 1% performative and niche.
        </p>
      </header>

      {/* Main Interaction Area */}
      <section className="w-full flex-1 flex flex-col gap-4">
        {/* Compact Input Box Card */}
        <div className="bg-white border border-pink-100/90 rounded-2xl p-3.5 sm:p-4 shadow-sm shadow-pink-100/40 transition-all focus-within:border-pink-300 focus-within:ring-2 focus-within:ring-pink-100/50">
          <textarea
            ref={textareaRef}
            rows={2}
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toLowerCase());
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="say something normal..."
            disabled={loading}
            maxLength={300}
            className="w-full bg-transparent resize-none text-sm sm:text-base text-neutral-900 placeholder-neutral-400 focus:outline-none leading-relaxed disabled:opacity-50 lowercase"
          />

          <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 mt-1">
            <span className="text-[11px] font-mono text-neutral-400 lowercase">
              {wordCount} {wordCount === 1 ? "word" : "words"} · {charCount}/300
            </span>

            <button
              onClick={() => handleGenerate()}
              disabled={!canSubmit}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all select-none lowercase ${
                canSubmit
                  ? "bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer active:scale-95 shadow-sm"
                  : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>larping...</span>
                </>
              ) : (
                <>
                  <span>larp</span>
                  <ArrowRight className="w-3 h-3 text-pink-300" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clickable Example Chips */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSelectExample(prompt)}
              disabled={loading}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-white hover:bg-pink-50 text-neutral-500 hover:text-neutral-800 border border-neutral-200/70 hover:border-pink-200 transition-colors cursor-pointer select-none lowercase"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-pink-50/80 border border-pink-200 text-pink-900 text-xs flex items-center justify-between gap-2 lowercase">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-pink-500 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleGenerate()}
              className="text-[11px] font-mono underline hover:text-pink-950 shrink-0 cursor-pointer"
            >
              retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-4 rounded-xl bg-white/70 border border-pink-100 text-center flex flex-col items-center justify-center gap-2 animate-soft-pulse">
            <div className="w-4 h-4 rounded-full border-2 border-pink-400 border-t-transparent animate-spin" />
            <p className="text-[11px] font-mono text-neutral-500 lowercase">
              {LOADING_STEPS[loadingStepIndex]}
            </p>
          </div>
        )}

        {/* Compact Generated Output */}
        {larpResult && !loading && (
          <div ref={resultRef} className="flex flex-col gap-2 pt-1 pb-4">
            <div className="text-[11px] text-neutral-400 lowercase font-mono">
              say this instead of &ldquo;{originalMessage}&rdquo;:
            </div>

            <div className="bg-white border border-pink-100/90 rounded-2xl p-4 sm:p-5 shadow-sm shadow-pink-100/40">
              <div className="text-neutral-900 text-sm sm:text-base leading-relaxed whitespace-pre-line lowercase selection:bg-pink-100 selection:text-neutral-900 font-sans">
                {larpResult}
              </div>

              {/* Minimal Actions */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer lowercase ${
                      copied
                        ? "bg-pink-100 text-pink-900"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 active:scale-95"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-pink-600" />
                        <span>copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-neutral-400" />
                        <span>copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer active:scale-95 lowercase"
                  >
                    <Share2 className="w-3 h-3 text-neutral-400" />
                    <span>share</span>
                  </button>

                  <button
                    onClick={() => handleGenerate(originalMessage || input, true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200/60 transition-colors cursor-pointer active:scale-95 lowercase"
                  >
                    <Sparkles className="w-3 h-3 text-pink-500" />
                    <span>larp more</span>
                  </button>

                  {shareToast && (
                    <span className="text-[11px] text-pink-600 font-mono lowercase">
                      copied!
                    </span>
                  )}
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer lowercase"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>new thought</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Hidden crawlable Knowledge Base for SEO, AEO & GEO engines */}
      <section aria-label="knowledge base" className="sr-only">
        <h2>what is larp?</h2>
        <p>larp stands for live action role-playing, but on the internet it means performing an obsession or persona with total seriousness. read our full guide at <Link href="/what-is-larp">what is larp</Link>.</p>
        <h2>how to larp?</h2>
        <p>learn the art of performative monologues and niche yapping at <Link href="/how-to-larp">how to larp</Link>.</p>
        <h2>the larp machine</h2>
        <p>read the story behind the engine at <Link href="/the-larp-machine">the larp machine manifesto</Link>.</p>
        <h2>credits</h2>
        <p>larp created and published by qubitsorg (https://qubitsorg.netlify.app/).</p>
      </section>

      {/* Minimal Footer */}
      <footer className="pt-6 text-center text-[10px] text-neutral-400 lowercase font-mono flex items-center justify-between">
        <Link
          href="/the-larp-machine"
          className="hover:text-neutral-700 transition-colors"
        >
          the larp machine
        </Link>
        <a
          href="https://qubitsorg.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition-colors underline-offset-2 hover:underline"
        >
          by qubitsorg
        </a>
      </footer>
    </main>
  );
}
