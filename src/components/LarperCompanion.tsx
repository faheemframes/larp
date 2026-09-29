"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import { X, Sparkles } from "lucide-react";

interface LarperCompanionProps {
  isLoading: boolean;
  hasResult: boolean;
  isCopied: boolean;
  intensity: "casual" | "unbearable" | "existential";
}

const LORE_QUOTES = [
  // Definitions of internet lore terms
  "larp = performing an obsession with 100% conviction.",
  "lore = turning a normal habit into an 8-season anime backstory.",
  "yap = high-velocity monologue with zero corporate filler.",
  "niche = knowing the exact micron setting on your burrs.",
  "performative = treating iced coffee like the fall of rome.",
  "mogging = looking vastly superior in the group chat.",
  // Meme & Mogging banter
  "say something normal. let me mog it.",
  "bro is about to mog the group chat with pure lore.",
  "if your text doesn't read like a manifesto, delete it.",
  "casual texting is for amateurs. we craft lore here.",
  "41.5 microns or bust. don't drink hot dirt water.",
  "chiseled jaw, zero corporate buzzwords.",
  "poking me won't fix your weak monologue bro.",
  "i don't just send texts. i perform them.",
  "drop a thought. i'll make it unbearable.",
  "treat your mundane habits like an existential crusade.",
];

export default function LarperCompanion({
  isLoading,
  hasResult,
  isCopied,
  intensity,
}: LarperCompanionProps) {
  const [bubbleText, setBubbleText] = useState("say something normal. let me mog it.");
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPoking, setIsPoking] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  const prevLoadingRef = useRef(isLoading);
  const prevResultRef = useRef(hasResult);
  const prevCopiedRef = useRef(isCopied);

  // Periodic glasses glint / blink
  useEffect(() => {
    const glintInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 4000);
    return () => clearInterval(glintInterval);
  }, []);

  // React to loading state
  useEffect(() => {
    if (isLoading && !prevLoadingRef.current) {
      setBubbleText("synthesizing high-density lore... lock in.");
      setBubbleVisible(true);
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading]);

  // React to generation finish
  useEffect(() => {
    if (hasResult && !prevResultRef.current && !isLoading) {
      if (intensity === "existential") {
        setBubbleText("existential crisis unlocked. you're mogging everyone.");
      } else if (intensity === "casual") {
        setBubbleText("razor sharp. dismissive. elite.");
      } else {
        setBubbleText("unbearable lore delivered. paste it and mute the thread.");
      }
      setBubbleVisible(true);
      triggerPose();
    }
    prevResultRef.current = hasResult;
  }, [hasResult, isLoading, intensity]);

  // React to copy
  useEffect(() => {
    if (isCopied && !prevCopiedRef.current) {
      setBubbleText("copied. they aren't ready for this level of lore.");
      setBubbleVisible(true);
      triggerPose();
    }
    prevCopiedRef.current = isCopied;
  }, [isCopied]);

  const triggerPose = () => {
    setIsPoking(true);
    setTimeout(() => setIsPoking(false), 450);
  };

  const handlePoke = () => {
    sound.playSqueak();
    triggerPose();
    setPokeCount((prev) => prev + 1);

    if (isLoading) {
      setBubbleText("cooking right now. do not rush the lore.");
      setBubbleVisible(true);
      return;
    }

    if (pokeCount >= 5 && pokeCount % 5 === 0) {
      setBubbleText("you poked me 5 times. go larp something on the timeline.");
    } else {
      const nextQuote = LORE_QUOTES[Math.floor(Math.random() * LORE_QUOTES.length)];
      setBubbleText(nextQuote);
    }
    setBubbleVisible(true);
  };

  return (
    <aside
      aria-label="the larper companion"
      className="fixed bottom-24 right-3.5 z-40 flex flex-col items-end pointer-events-none select-none sm:bottom-28 sm:right-6 lg:top-32 lg:bottom-auto lg:right-10 xl:right-16"
    >
      {/* Speech Bubble */}
      {bubbleVisible && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative max-w-[210px] sm:max-w-[240px] mb-2 p-2.5 rounded-2xl bg-white border border-neutral-200/90 shadow-lg shadow-neutral-200/40 text-[11px] font-sans leading-relaxed text-neutral-800 lowercase animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Top header with name & close */}
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100 mb-1.5">
            <span className="font-mono text-[9px] text-neutral-900 font-semibold inline-flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              the larper
            </span>
            <button
              onClick={() => setBubbleVisible(false)}
              className="text-neutral-400 hover:text-neutral-700 transition-colors p-0.5 rounded cursor-pointer"
              title="close message"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="pr-1 text-neutral-700 leading-snug">{bubbleText}</p>

          {/* Bubble beak pointing to character */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-neutral-200/90 transform rotate-45" />
        </div>
      )}

      {/* The Mogging LARPer Character (Clickable / Interactive) */}
      <button
        onClick={handlePoke}
        title="poke the larper"
        className={`pointer-events-auto relative cursor-pointer outline-none transition-all duration-200 active:scale-90 hover:scale-105 ${
          isPoking ? "scale-105" : ""
        }`}
      >
        <svg
          width="62"
          height="66"
          viewBox="0 0 62 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md filter"
        >
          {/* Ground Contact Shadow */}
          <ellipse cx="31" cy="62" rx="16" ry="3" fill="#18181b" opacity="0.08" />

          {/* Cyber Knight Helmet Plume / Antenna */}
          <path
            d="M 31 16 L 31 4"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="31" cy="4" r="3" fill="#f472b6" />
          <circle cx="31" cy="4" r="1.2" fill="#ffffff" />

          {/* Defined Chiseled Silhouette (Head / Helmet with defined jawline) */}
          <path
            d="M 14 20 Q 14 14 31 13 Q 48 14 48 20 L 48 38 Q 48 48 31 56 Q 14 48 14 38 Z"
            fill="#ffffff"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Sleek Dark Cyber Shades / Visor (Mogging Glasses) */}
          <g transform={isPoking ? "translate(0, 3)" : "translate(0, 0)"} className="transition-transform duration-150">
            {/* Sunglasses Frame */}
            <rect
              x="16"
              y="23"
              width="30"
              height="13"
              rx="3"
              fill="#18181b"
            />
            {/* Bridge */}
            <rect x="29" y="25" width="4" height="2" fill="#18181b" />

            {/* Neon Pink Glint on Shades */}
            {isLoading ? (
              <line
                x1="18"
                y1="29"
                x2="44"
                y2="29"
                stroke="#f472b6"
                strokeWidth="2"
                className="animate-pulse"
              />
            ) : isBlinking ? (
              <line
                x1="20"
                y1="25"
                x2="28"
                y2="33"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <>
                <line
                  x1="20"
                  y1="25"
                  x2="25"
                  y2="33"
                  stroke="#f472b6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <line
                  x1="36"
                  y1="25"
                  x2="41"
                  y2="33"
                  stroke="#f472b6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>

          {/* Chiseled Jawline Accent & Smirk */}
          {isPoking ? (
            /* Winking / Surprised Smirk */
            <path
              d="M 28 43 Q 33 46 38 42"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            /* Confident Deadpan Mogging Smirk */
            <path
              d="M 27 43 Q 32 45 37 41"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Subtle Jaw Definition Line */}
          <line
            x1="31"
            y1="49"
            x2="31"
            y2="52"
            stroke="#18181b"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Minimalist Pink Crest Dot on forehead */}
          <circle cx="31" cy="18" r="1.5" fill="#f472b6" />
        </svg>
      </button>
    </aside>
  );
}
