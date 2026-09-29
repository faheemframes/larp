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
  "if your text isn't a manifesto, why send it?",
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

  // Periodic glasses glint / lens flash
  useEffect(() => {
    const glintInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 260);
    }, 4200);
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
    setTimeout(() => setIsPoking(false), 500);
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
      aria-label="mr. performative companion"
      className="fixed bottom-24 right-2.5 z-40 flex flex-col items-end pointer-events-none select-none sm:bottom-28 sm:right-4 lg:top-32 lg:bottom-auto lg:right-6 xl:right-12"
    >
      {/* Ultra-Compact Non-Overlapping Speech Bubble */}
      {bubbleVisible && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-auto relative max-w-[155px] sm:max-w-[170px] mb-2 p-2 rounded-xl bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-md shadow-neutral-200/40 text-[10px] sm:text-[10.5px] font-sans leading-tight text-neutral-800 lowercase animate-in fade-in slide-in-from-bottom-1 duration-150"
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

      {/* Iconic Floating Cartoon Mascot: mr. performative */}
      <button
        onClick={handlePoke}
        title="poke mr. performative"
        className={`pointer-events-auto relative cursor-pointer outline-none transition-all duration-200 active:scale-90 hover:scale-105 ${
          isPoking ? "scale-105" : "animate-float"
        }`}
      >
        <svg
          width="62"
          height="62"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md filter"
        >
          <defs>
            {/* Subtle Face Gradient */}
            <linearGradient id="faceGrad" x1="32" y1="12" x2="32" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#fdf7f9" />
            </linearGradient>
            {/* Hair Shine Gradient */}
            <linearGradient id="hairGrad" x1="10" y1="4" x2="54" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>

          {/* Subtle Ground Ambient Shadow */}
          <ellipse cx="32" cy="59" rx="14" ry="2.5" fill="#18181b" opacity="0.12" />

          {/* Ears with Pink Stud */}
          <circle cx="12" cy="33" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
          <circle cx="52" cy="33" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
          <circle cx="11.5" cy="34" r="1.2" fill="#f472b6" />

          {/* Chiseled Golden-Ratio Face Contour */}
          <path
            d="M 14 20 C 14 13, 22 11, 32 11 C 42 11, 50 13, 50 20 L 49 33 C 49 43, 39 51, 32 55 C 25 51, 15 43, 15 33 Z"
            fill="url(#faceGrad)"
            stroke="#18181b"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Defined High Cheekbone Accents */}
          <path d="M 16 30 L 20 34" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
          <path d="M 48 30 L 44 34" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

          {/* Soft Aesthetic Pink Blush Dots */}
          <ellipse cx="19" cy="35" rx="3.2" ry="1.6" fill="#f472b6" opacity="0.35" />
          <ellipse cx="45" cy="35" rx="3.2" ry="1.6" fill="#f472b6" opacity="0.35" />

          {/* Iconic Swept-Back Chad Pompadour Hair */}
          <path
            d="M 11 20 C 8 8, 20 3, 32 3 C 44 2, 54 6, 52 20 C 46 12, 35 11, 23 13 C 17 14, 13 16, 11 20 Z"
            fill="url(#hairGrad)"
            stroke="#18181b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Signature Neon-Pink Highlight Wave */}
          <path
            d="M 22 6 C 30 4, 40 6, 47 11"
            stroke="#f472b6"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Piercing Eyebrows (visible above or when shades slide) */}
          {isPoking ? (
            /* Quizzical Raised Brows on Poke */
            <g stroke="#18181b" strokeWidth="1.8" strokeLinecap="round">
              <path d="M 19 20 Q 24 16 28 19" />
              <path d="M 36 21 Q 40 22 45 20" />
            </g>
          ) : (
            /* Sleek Confident Brows */
            <g stroke="#18181b" strokeWidth="1.8" strokeLinecap="round">
              <path d="M 19 22 Q 24 19 28 22" />
              <path d="M 36 22 Q 40 19 45 22" />
            </g>
          )}

          {/* Eyes revealed when shades lower on poke */}
          {isPoking && (
            <g fill="#18181b">
              <circle cx="24" cy="24" r="2.2" />
              <circle cx="40" cy="24" r="2.2" />
              {/* White reflections */}
              <circle cx="23.2" cy="23.2" r="0.8" fill="#ffffff" />
              <circle cx="39.2" cy="23.2" r="0.8" fill="#ffffff" />
            </g>
          )}

          {/* Iconic Designer Sunglasses (Mogging Shades) */}
          <g
            transform={isPoking ? "translate(0, 5)" : "translate(0, 0)"}
            className="transition-transform duration-200"
          >
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
            {/* Sleek Bridge */}
            <line x1="28" y1="26" x2="36" y2="26" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />

            {/* Neon Pink Reflections on Lenses */}
            {isLoading ? (
              /* Laser scan pulse while cooking */
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
              /* White Glint Flash */
              <g stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round">
                <line x1="19" y1="26" x2="24" y2="31" />
                <line x1="39" y1="26" x2="44" y2="31" />
              </g>
            ) : (
              /* Signature Double Pink Neon Glints */
              <g stroke="#f472b6" strokeWidth="1.4" strokeLinecap="round">
                <line x1="18" y1="26" x2="23" y2="31" />
                <line x1="23" y1="26" x2="25" y2="29" opacity="0.6" />
                <line x1="38" y1="26" x2="43" y2="31" />
                <line x1="43" y1="26" x2="45" y2="29" opacity="0.6" />
              </g>
            )}
          </g>

          {/* Confident Asymmetrical Mogging Smirk */}
          {isPoking ? (
            /* Smirking half-grin with dimple */
            <g>
              <path
                d="M 26 41 Q 32 45 39 39"
                stroke="#18181b"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="40" cy="38" r="0.8" fill="#18181b" />
            </g>
          ) : (
            /* Classic Immaculate Deadpan Smirk */
            <g>
              <path
                d="M 26 41 Q 32 44 38 39"
                stroke="#18181b"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="39" cy="38" r="0.8" fill="#18181b" />
            </g>
          )}

          {/* Defined Cleft Chin */}
          <line
            x1="32"
            y1="47"
            x2="32"
            y2="51"
            stroke="#18181b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </aside>
  );
}
