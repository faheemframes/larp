"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Player } from "@remotion/player";
import { LaunchVideo } from "@/remotion/LaunchVideo";
import {
  Download,
  ArrowLeft,
  Smartphone,
  Monitor,
  Sparkles,
  CheckCircle2,
  Film,
} from "lucide-react";

export default function LaunchVideoPage() {
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");

  const mp4Url =
    aspectRatio === "16:9"
      ? "/the-larp-machine-launch-16x9.mp4"
      : "/the-larp-machine-launch-9x16.mp4";

  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-8 max-w-4xl mx-auto w-full text-neutral-900">
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 transition-colors font-mono lowercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>back to the machine</span>
        </Link>
        <span className="text-[11px] font-mono text-pink-500 bg-pink-50 border border-pink-200/50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>remotion launch engine</span>
        </span>
      </div>

      {/* Studio Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 lowercase mb-1">
          launch animation studio<span className="text-pink-400">.</span>
        </h1>
        <p className="text-xs text-neutral-400 font-light lowercase">
          pixel-perfect remotion composition · apple typography · spring kinematics · h.264 mp4 export
        </p>
      </div>

      {/* Player Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className={`relative rounded-2xl overflow-hidden bg-white border border-pink-100 shadow-xl shadow-pink-100/30 transition-all ${
            aspectRatio === "16:9"
              ? "w-full max-w-[760px] aspect-video"
              : "w-full max-w-[360px] aspect-[9/16]"
          }`}
        >
          <Player
            component={LaunchVideo}
            inputProps={{
              aspectRatio,
            }}
            durationInFrames={600}
            compositionWidth={aspectRatio === "16:9" ? 1920 : 1080}
            compositionHeight={aspectRatio === "16:9" ? 1080 : 1920}
            fps={30}
            controls
            autoPlay
            loop
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Aspect Ratio & MP4 Export Controls */}
        <div className="w-full max-w-[760px] mt-5 flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-neutral-200/70 shadow-xs">
          {/* Format Selector */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-neutral-100 border border-neutral-200/60 text-xs font-mono">
            <button
              onClick={() => setAspectRatio("16:9")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                aspectRatio === "16:9"
                  ? "bg-white text-neutral-900 font-medium shadow-xs"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>16:9 landscape (x / yt)</span>
            </button>
            <button
              onClick={() => setAspectRatio("9:16")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                aspectRatio === "9:16"
                  ? "bg-white text-neutral-900 font-medium shadow-xs"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 vertical (reels / tiktok)</span>
            </button>
          </div>

          {/* Direct MP4 Download Button */}
          <a
            href={mp4Url}
            download={`the-larp-machine-launch-${aspectRatio.replace(":", "x")}.mp4`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white transition-all cursor-pointer active:scale-95 shadow-xs lowercase"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span>download {aspectRatio} mp4</span>
          </a>
        </div>

        {/* Video Specs Banner */}
        <div className="w-full max-w-[760px] mt-3 flex items-center justify-between px-2 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>h.264 mp4 · 60 FPS interpolated · ready for upload</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-neutral-400" />
            <span>duration: 20s (600 frames)</span>
          </div>
        </div>
      </div>

      {/* Storyboard Script Breakdown */}
      <div className="w-full max-w-[760px] mx-auto mt-8 p-4 rounded-2xl bg-white border border-neutral-100 shadow-xs text-xs space-y-2.5 text-neutral-600 font-mono">
        <div className="font-semibold text-neutral-900 pb-1 border-b border-neutral-100 flex items-center justify-between">
          <span>video storyboard (4 sequenced acts):</span>
          <span className="text-[11px] text-pink-500">600 frames @ 30fps</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:00 - 00:05</span>
          <span>act 1: the problem — dry corporate small talk struck through</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:05 - 00:10</span>
          <span>act 2: the machine — 3 lore intensity modes dialed in</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:10 - 00:15</span>
          <span>act 3: the lore — 18.2g ethiopian beans & mr. performative</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:15 - 00:20</span>
          <span>act 4: outro lockup — thelarpmachine.vercel.app · qubitsorg</span>
        </div>
      </div>
    </main>
  );
}
