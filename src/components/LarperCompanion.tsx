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

const DEADPAN_QUOTES = [
  "say something normal.",
  "41.5 microns or hot tap water.",
  "make it performative.",
  "treat your coffee like the fall of rome.",
  "if it isn't a manifesto, don't send it.",
  "casual texting is for amateurs.",
  "pure lore. zero corporate filler.",
  "niche = knowing exact burr microns.",
  "larp = 100% conviction.",
  "paste it and mute the thread.",
  "i don't text. i perform.",
];

export default function LarperCompanion({
  isLoading,
  hasResult,
  isCopied,
  intensity,
}: LarperCompanionProps) {
  const [bubbleText, setBubbleText] = useState("say something normal.");
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPoking, setIsPoking] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  const prevLoadingRef = useRef(isLoading);
  const prevResultRef = useRef(hasResult);
  const prevCopiedRef = useRef(isCopied);

  // Periodic glasses glint flash
  useEffect(() => {
    const glintInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 240);
    }, 4500);
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
        setBubbleText("existential crisis unlocked.");
      } else if (intensity === "casual") {
        setBubbleText("short. dismissive. elite.");
      } else {
        setBubbleText("paste it and mute the thread.");
      }
      setBubbleVisible(true);
      triggerPose();
    }
    prevResultRef.current = hasResult;
  }, [hasResult, isLoading, intensity]);

  // React to copy
  useEffect(() => {
    if (isCopied && !prevCopiedRef.current) {
      setBubbleText("copied. they aren't ready.");
      setBubbleVisible(true);
      triggerPose();
    }
    prevCopiedRef.current = isCopied;
  }, [isCopied]);

  const triggerPose = () => {
    setIsPoking(true);
    setTimeout(() => setIsPoking(false), 350);
  };

  const handlePoke = () => {
    sound.playSqueak();
    triggerPose();
    setPokeCount((prev) => prev + 1);

    if (isLoading) {
      setBubbleText("cooking. do not rush.");
      setBubbleVisible(true);
      return;
    }

    if (pokeCount >= 5 && pokeCount % 5 === 0) {
      setBubbleText("5 pokes. go larp something.");
    } else {
      const nextQuote =
        DEADPAN_QUOTES[Math.floor(Math.random() * DEADPAN_QUOTES.length)];
      setBubbleText(nextQuote);
    }
    setBubbleVisible(true);
  };

  return (
    <aside
      aria-label="mr. performative companion"
      className="fixed bottom-24 right-2.5 z-40 flex flex-col items-end pointer-events-none select-none sm:bottom-28 sm:right-4 lg:top-32 lg:bottom-auto lg:right-6 xl:right-12"
    >
      {/* Ultra-Compact Non-Overlapping Speech Bubble */}
      {bubbleVisible && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative max-w-[150px] sm:max-w-[165px] mb-2 p-2 rounded-xl bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-md shadow-neutral-200/40 text-[10px] sm:text-[10.5px] font-sans leading-tight text-neutral-800 lowercase animate-in fade-in slide-in-from-bottom-1 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-1 border-b border-neutral-100 mb-1">
            <span className="font-mono text-[8px] text-neutral-900 font-bold inline-flex items-center gap-1 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              mr. performative
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

          {/* Bubble beak */}
          <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white border-r border-b border-neutral-200/90 transform rotate-45" />
        </div>
      )}

      {/* Clean Deadpan Mascot: mr. performative */}
      <button
        onClick={handlePoke}
        title="poke mr. performative"
        className={`pointer-events-auto relative cursor-pointer outline-none transition-all duration-200 active:scale-95 hover:scale-105 ${
          isPoking ? "scale-105" : "animate-float"
        }`}
      >
        <svg
          width="58"
          height="58"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md filter"
        >
          {/* Subtle Ground Ambient Shadow */}
          <ellipse cx="32" cy="58" rx="13" ry="2.5" fill="#18181b" opacity="0.1" />

          {/* Clean Ears (No Earring) */}
          <circle cx="12" cy="33" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.6" />
          <circle cx="52" cy="33" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.6" />

          {/* Chiseled Clean Face Contour */}
          <path
            d="M 14 20 C 14 13, 22 11, 32 11 C 42 11, 50 13, 50 20 L 49 33 C 49 43, 39 51, 32 55 C 25 51, 15 43, 15 33 Z"
            fill="#ffffff"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Subtle High Cheekbone Accents */}
          <path d="M 16 30 L 19 33" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M 48 30 L 45 33" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />

          {/* Swept-Back Architectural Pompadour Hair */}
          <path
            d="M 11 20 C 8 8, 20 3, 32 3 C 44 2, 54 6, 52 20 C 46 12, 35 11, 23 13 C 17 14, 13 16, 11 20 Z"
            fill="#18181b"
            stroke="#18181b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Signature Subtle Neon-Pink Hair Accent */}
          <path
            d="M 23 6 C 30 4, 39 6, 45 10"
            stroke="#f472b6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Cool Resting Eyebrows */}
          <g stroke="#18181b" strokeWidth="1.6" strokeLinecap="round">
            <path d="M 19 21 Q 24 19 28 21" />
            <path d="M 36 21 Q 40 19 45 21" />
          </g>

          {/* Solid Designer Sunglasses (Always On, Deadpan Cool) */}
          <g>
            {/* Left Lens */}
            <path
              d="M 15 24 L 29 24 L 28 33 L 17 33 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Right Lens */}
            <path
              d="M 35 24 L 49 24 L 47 33 L 36 33 Z"
              fill="#18181b"
              stroke="#18181b"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Bridge */}
            <line x1="28" y1="26" x2="36" y2="26" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />

            {/* Reflections on Lenses */}
            {isLoading ? (
              /* Laser scan pulse while generating */
              <line
                x1="17"
                y1="28"
                x2="47"
                y2="28"
                stroke="#f472b6"
                strokeWidth="2"
                className="animate-pulse"
              />
            ) : isBlinking ? (
              /* Crisp White Glint Flash */
              <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round">
                <line x1="19" y1="26" x2="24" y2="31" />
                <line x1="39" y1="26" x2="44" y2="31" />
              </g>
            ) : (
              /* Signature Pink Neon Glints */
              <g stroke="#f472b6" strokeWidth="1.3" strokeLinecap="round">
                <line x1="18" y1="26" x2="23" y2="31" />
                <line x1="38" y1="26" x2="43" y2="31" />
              </g>
            )}
          </g>

          {/* Deadpan Confident Smirk (Clean line, no goofy dimples) */}
          <path
            d="M 26 41 Q 31 43 37 39"
            stroke="#18181b"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Defined Cleft Chin */}
          <line
            x1="32"
            y1="47"
            x2="32"
            y2="50"
            stroke="#18181b"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </button>
    </aside>
  );
}
