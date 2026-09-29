"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import { X } from "lucide-react";

interface LarperCompanionProps {
  isLoading: boolean;
  hasResult: boolean;
  isCopied: boolean;
  intensity: "casual" | "unbearable" | "existential";
}

const COMPACT_LORE_QUOTES = [
  "say something normal. let me mog it.",
  "larp = 100% conviction.",
  "lore = deep anime backstory.",
  "yap = high velocity, zero filler.",
  "niche = knowing exact burr microns.",
  "chiseled jaw, zero corporate buzzwords.",
  "41.5 microns or hot dirt water.",
  "i don't text. i perform.",
  "make it performative or delete it.",
  "bro is about to mog the group chat.",
  "treat coffee like the fall of rome.",
  "casual small talk is for mortals.",
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
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(glintInterval);
  }, []);

  // React to loading state
  useEffect(() => {
    if (isLoading && !prevLoadingRef.current) {
      setBubbleText("cooking lore... lock in.");
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
        setBubbleText("short, rude, and elite.");
      } else {
        setBubbleText("unbearable lore delivered. go mog the chat.");
      }
      setBubbleVisible(true);
      triggerPose();
    }
    prevResultRef.current = hasResult;
  }, [hasResult, isLoading, intensity]);

  // React to copy
  useEffect(() => {
    if (isCopied && !prevCopiedRef.current) {
      setBubbleText("copied! they aren't ready.");
      setBubbleVisible(true);
      triggerPose();
    }
    prevCopiedRef.current = isCopied;
  }, [isCopied]);

  const triggerPose = () => {
    setIsPoking(true);
    setTimeout(() => setIsPoking(false), 400);
  };

  const handlePoke = () => {
    sound.playSqueak();
    triggerPose();
    setPokeCount((prev) => prev + 1);

    if (isLoading) {
      setBubbleText("cooking right now. do not rush.");
      setBubbleVisible(true);
      return;
    }

    if (pokeCount >= 5 && pokeCount % 5 === 0) {
      setBubbleText("5 pokes. go larp something.");
    } else {
      const nextQuote =
        COMPACT_LORE_QUOTES[Math.floor(Math.random() * COMPACT_LORE_QUOTES.length)];
      setBubbleText(nextQuote);
    }
    setBubbleVisible(true);
  };

  return (
    <aside
      aria-label="the larper companion"
      className="fixed bottom-28 right-2.5 z-40 flex flex-col items-end pointer-events-none select-none sm:bottom-32 sm:right-4 lg:top-36 lg:bottom-auto lg:right-6 xl:right-12"
    >
      {/* Compact, Non-Overlapping Speech Bubble */}
      {bubbleVisible && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative max-w-[155px] sm:max-w-[175px] mb-1.5 p-2 rounded-xl bg-white border border-neutral-200/90 shadow-md shadow-neutral-200/50 text-[10px] sm:text-[10.5px] font-sans leading-tight text-neutral-800 lowercase animate-in fade-in slide-in-from-bottom-1 duration-150"
        >
          {/* Top header with name & close */}
          <div className="flex items-center justify-between pb-0.5 border-b border-neutral-100 mb-1">
            <span className="font-mono text-[8px] text-neutral-900 font-bold inline-flex items-center gap-1 uppercase tracking-wider">
              <span className="w-1 h-1 rounded-full bg-pink-500 animate-pulse" />
              the larper
            </span>
            <button
              onClick={() => setBubbleVisible(false)}
              className="text-neutral-300 hover:text-neutral-600 transition-colors p-0.5 rounded cursor-pointer"
              title="close"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>

          <p className="text-neutral-700 leading-snug">{bubbleText}</p>

          {/* Bubble beak pointing to character */}
          <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white border-r border-b border-neutral-200/90 transform rotate-45" />
        </div>
      )}

      {/* Cartoon Gigachad Character (Interactive / Pokeable) */}
      <button
        onClick={handlePoke}
        title="poke the larper"
        className={`pointer-events-auto relative cursor-pointer outline-none transition-transform duration-200 active:scale-90 hover:scale-105 ${
          isPoking ? "scale-105" : ""
        }`}
      >
        <svg
          width="58"
          height="64"
          viewBox="0 0 58 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md filter"
        >
          {/* Subtle Ground Shadow */}
          <ellipse cx="29" cy="62" rx="14" ry="2" fill="#18181b" opacity="0.08" />

          {/* Strong Traps / Neck Silhouette */}
          <path
            d="M 18 48 L 12 60 L 46 60 L 40 48 Z"
            fill="#ffffff"
            stroke="#18181b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Iconic Gigachad Chiseled Head & Razor-Sharp Jawline */}
          <path
            d="M 16 22 L 15 36 Q 16 46 29 53 Q 42 46 43 36 L 42 22 Z"
            fill="#ffffff"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* High Angular Cheekbones */}
          <path
            d="M 16 32 L 20 37"
            stroke="#18181b"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M 42 32 L 38 37"
            stroke="#18181b"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Iconic Swept-Back Voluminous Chad Hair */}
          <path
            d="M 13 24 Q 10 12 20 7 Q 29 2 40 6 Q 48 10 44 24 Q 38 15 28 15 Q 18 15 13 24 Z"
            fill="#18181b"
            stroke="#18181b"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Hair Highlight Strand */}
          <path
            d="M 22 8 Q 30 5 38 9"
            stroke="#f472b6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Sleek Dark Chad Sunglasses */}
          <g
            transform={isPoking ? "translate(0, 2)" : "translate(0, 0)"}
            className="transition-transform duration-150"
          >
            {/* Left & Right Lenses with sharp angular curve */}
            <path
              d="M 16 26 L 27 26 L 26 34 L 18 34 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="1.2"
            />
            <path
              d="M 31 26 L 42 26 L 40 34 L 32 34 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="1.2"
            />
            {/* Bridge */}
            <line x1="27" y1="28" x2="31" y2="28" stroke="#18181b" strokeWidth="1.8" />

            {/* Neon Pink Glint on Sunglasses */}
            {isLoading ? (
              <line
                x1="18"
                y1="30"
                x2="40"
                y2="30"
                stroke="#f472b6"
                strokeWidth="1.8"
                className="animate-pulse"
              />
            ) : isBlinking ? (
              <line
                x1="20"
                y1="28"
                x2="24"
                y2="33"
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <>
                <line
                  x1="19"
                  y1="28"
                  x2="23"
                  y2="33"
                  stroke="#f472b6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <line
                  x1="34"
                  y1="28"
                  x2="38"
                  y2="33"
                  stroke="#f472b6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>

          {/* Confident Chiseled Chad Smirk */}
          {isPoking ? (
            /* Winking / Laughing Smirk */
            <path
              d="M 24 42 Q 29 46 34 41"
              stroke="#18181b"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            /* Classic Immaculate Mogging Smirk */
            <path
              d="M 24 42 Q 29 44 35 39"
              stroke="#18181b"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Strong Chin Cleft */}
          <line
            x1="29"
            y1="47"
            x2="29"
            y2="50"
            stroke="#18181b"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Collar / V-neck detail */}
          <path
            d="M 23 55 L 29 60 L 35 55"
            stroke="#18181b"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </aside>
  );
}
