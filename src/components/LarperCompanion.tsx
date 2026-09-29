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

const IDLE_QUOTES = [
  "psst... say something normal, i dare you.",
  "41.5 microns or bust. your call.",
  "bro is really contemplating the lore.",
  "drop a sentence. i won't judge (i will).",
  "ready to ruin a group chat?",
  "treat your morning coffee like the fall of rome.",
  "poking me won't fix your code bro.",
  "make it performative or go home.",
  "casual small talk is dead. embrace lore.",
  "the top 1% never sends an unedited text.",
];

export default function LarperCompanion({
  isLoading,
  hasResult,
  isCopied,
  intensity,
}: LarperCompanionProps) {
  const [bubbleText, setBubbleText] = useState("say something normal, i dare you.");
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  const prevLoadingRef = useRef(isLoading);
  const prevResultRef = useRef(hasResult);
  const prevCopiedRef = useRef(isCopied);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // React to loading state
  useEffect(() => {
    if (isLoading && !prevLoadingRef.current) {
      setBubbleText("hold on... synthesizing unbearable lore...");
      setBubbleVisible(true);
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading]);

  // React to generation finish
  useEffect(() => {
    if (hasResult && !prevResultRef.current && !isLoading) {
      if (intensity === "existential") {
        setBubbleText("existential crisis unlocked. post that immediately.");
      } else if (intensity === "casual") {
        setBubbleText("short, rude, and elite. perfect.");
      } else {
        setBubbleText("now paste that in the group chat and mute notifications.");
      }
      setBubbleVisible(true);
      triggerBounce();
    }
    prevResultRef.current = hasResult;
  }, [hasResult, isLoading, intensity]);

  // React to copy
  useEffect(() => {
    if (isCopied && !prevCopiedRef.current) {
      setBubbleText("copied! they are not ready for this monologue.");
      setBubbleVisible(true);
      triggerBounce();
    }
    prevCopiedRef.current = isCopied;
  }, [isCopied]);

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  const handlePoke = () => {
    sound.playSqueak();
    triggerBounce();
    setPokeCount((prev) => prev + 1);

    if (isLoading) {
      setBubbleText("i'm cooking, don't rush the lore!");
      setBubbleVisible(true);
      return;
    }

    if (pokeCount >= 5 && pokeCount % 5 === 0) {
      setBubbleText("ok you've poked me 5 times. go larp something.");
    } else {
      const nextQuote = IDLE_QUOTES[Math.floor(Math.random() * IDLE_QUOTES.length)];
      setBubbleText(nextQuote);
    }
    setBubbleVisible(true);
  };

  return (
    <aside
      aria-label="the larper companion"
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none sm:bottom-6 sm:right-6"
    >
      {/* Speech Bubble */}
      {bubbleVisible && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative max-w-[210px] sm:max-w-[240px] mb-2 p-2.5 rounded-2xl bg-white border border-pink-200/90 shadow-md shadow-pink-100/50 text-[11px] font-sans leading-relaxed text-neutral-800 lowercase animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Top header with name & close */}
          <div className="flex items-center justify-between pb-1 border-b border-pink-100/60 mb-1.5">
            <span className="font-mono text-[9px] text-pink-600 font-medium inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
              the larper
            </span>
            <button
              onClick={() => setBubbleVisible(false)}
              className="text-neutral-300 hover:text-neutral-600 transition-colors p-0.5 rounded cursor-pointer"
              title="close message"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <p className="pr-1">{bubbleText}</p>

          {/* Bubble beak pointing to character */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-pink-200/90 transform rotate-45" />
        </div>
      )}

      {/* The Larper Character (Clickable / Interactive) */}
      <button
        onClick={handlePoke}
        title="poke the larper"
        className={`pointer-events-auto relative cursor-pointer outline-none transition-transform duration-200 active:scale-90 hover:scale-105 ${
          isBouncing ? "animate-bounce" : ""
        }`}
      >
        <svg
          width="60"
          height="62"
          viewBox="0 0 60 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm filter"
        >
          {/* Soft Shadow */}
          <ellipse cx="30" cy="59" rx="18" ry="3" fill="#fce7f3" opacity="0.6" />

          {/* Antenna / Left Ear */}
          <path
            d="M 20 18 Q 14 7 17 4 Q 21 2 25 14"
            fill="#fff0f3"
            stroke="#fbcfe8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="17" cy="4" r="2" fill="#f472b6" />

          {/* Antenna / Right Ear */}
          <path
            d="M 40 18 Q 46 7 43 4 Q 39 2 35 14"
            fill="#fff0f3"
            stroke="#fbcfe8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="43" cy="4" r="2" fill="#f472b6" />

          {/* Main Body (Soft rounded marshmallow blob) */}
          <rect
            x="8"
            y="14"
            width="44"
            height="44"
            rx="22"
            fill="#ffffff"
            stroke="#fbcfe8"
            strokeWidth="1.75"
          />

          {/* Subtle inner blush glow */}
          <ellipse cx="30" cy="24" rx="14" ry="7" fill="#fff5f7" />

          {/* Eyes State Logic */}
          {isLoading ? (
            /* Thinking / Loading swirls */
            <g fill="#18181b">
              <circle cx="23" cy="32" r="2.5" className="animate-ping" />
              <circle cx="37" cy="32" r="2.5" className="animate-ping" />
            </g>
          ) : isBlinking ? (
            /* Blinking / Sleeping eyes */
            <g stroke="#18181b" strokeWidth="1.8" strokeLinecap="round">
              <line x1="20" y1="33" x2="26" y2="33" />
              <line x1="34" y1="33" x2="40" y2="33" />
            </g>
          ) : isBouncing ? (
            /* Happy / Excited squint eyes */
            <g stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none">
              <path d="M 20 34 Q 23 30 26 34" />
              <path d="M 34 34 Q 37 30 40 34" />
            </g>
          ) : (
            /* Normal wide glossy eyes */
            <g fill="#18181b">
              <circle cx="23" cy="33" r="3.2" />
              <circle cx="37" cy="33" r="3.2" />
              {/* White eye highlight glints */}
              <circle cx="22" cy="31.8" r="1.1" fill="#ffffff" />
              <circle cx="36" cy="31.8" r="1.1" fill="#ffffff" />
            </g>
          )}

          {/* Soft Pink Blush Cheeks */}
          <ellipse cx="16" cy="37" rx="3.5" ry="2" fill="#f472b6" opacity="0.45" />
          <ellipse cx="44" cy="37" rx="3.5" ry="2" fill="#f472b6" opacity="0.45" />

          {/* Tiny Cat Mouth */}
          <path
            d="M 27 38 Q 28.5 40 30 38 Q 31.5 40 33 38"
            stroke="#18181b"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sparkle badge on head */}
          <g transform="translate(26, 17) scale(0.65)" opacity="0.7">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          </g>
        </svg>
      </button>
    </aside>
  );
}
