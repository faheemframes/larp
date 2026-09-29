"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Play, Pause, RotateCcw, Download, Sparkles, ArrowLeft, Smartphone, Monitor } from "lucide-react";

export default function LaunchVideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 20 seconds
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [isRecording, setIsRecording] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const TOTAL_DURATION = 20; // 20 seconds launch video

  // Initialize Web Audio
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Synthesize clean audio events matching video scenes
  const playSceneAudio = (time: number, prevTime: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const playTone = (freq: number, type: OscillatorType, dur: number, gainVal: number) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
      } catch {}
    };

    // Scene 1: Dull flatline tick (0s)
    if (prevTime < 0.1 && time >= 0.1) {
      playTone(220, "sine", 0.15, 0.08);
    }
    // Scene 1: Flatline fail sound (2.5s)
    if (prevTime < 2.5 && time >= 2.5) {
      playTone(130, "sawtooth", 0.4, 0.06);
    }
    // Scene 2: Bass drop / reveal chime (4.5s)
    if (prevTime < 4.5 && time >= 4.5) {
      playTone(523.25, "triangle", 0.3, 0.12);
      setTimeout(() => playTone(659.25, "sine", 0.4, 0.1), 100);
      setTimeout(() => playTone(783.99, "sine", 0.5, 0.12), 200);
    }
    // Scene 2: Toggle switches (6.5s, 7.5s)
    if (prevTime < 6.5 && time >= 6.5) playTone(700, "sine", 0.05, 0.08);
    if (prevTime < 7.5 && time >= 7.5) playTone(950, "sine", 0.06, 0.09);

    // Scene 3: Synthesis rising arp (9.5s)
    if (prevTime < 9.5 && time >= 9.5) {
      [440, 554, 659, 880, 1108].forEach((f, i) => {
        setTimeout(() => playTone(f, "sine", 0.2, 0.08), i * 80);
      });
    }

    // Scene 3: Mr. Performative Squeak / Pop (13.5s)
    if (prevTime < 13.5 && time >= 13.5) {
      playTone(850, "sine", 0.09, 0.12);
    }

    // Scene 4: Outro victory fanfare (15.5s)
    if (prevTime < 15.5 && time >= 15.5) {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        setTimeout(() => playTone(f, "triangle", 0.4, 0.1), i * 90);
      });
    }
  };

  // Rendering engine: draws each frame on the canvas
  const renderFrame = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background: Clean aesthetic off-white with radial pink glow
    ctx.fillStyle = "#faf9f9";
    ctx.fillRect(0, 0, w, h);

    const grad = ctx.createRadialGradient(w / 2, h * 0.35, 10, w / 2, h * 0.35, w * 0.6);
    grad.addColorStop(0, "rgba(244, 114, 182, 0.14)");
    grad.addColorStop(0.5, "rgba(255, 241, 242, 0.3)");
    grad.addColorStop(1, "rgba(250, 249, 249, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Grid dots (subtle gameify pattern)
    ctx.fillStyle = "rgba(24, 24, 27, 0.03)";
    const dotSpacing = 36;
    for (let x = 18; x < w; x += dotSpacing) {
      for (let y = 18; y < h; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Top watermark
    ctx.fillStyle = "#a1a1aa";
    ctx.font = `500 ${Math.round(w * 0.022)}px monospace`;
    ctx.textAlign = "left";
    ctx.fillText("the larp machine · launch sequence", w * 0.06, h * 0.08);

    ctx.textAlign = "right";
    ctx.fillText(`00:${Math.floor(time).toString().padStart(2, "0")}`, w * 0.94, h * 0.08);

    // ==========================================
    // ACT 1: THE PROBLEM (0.0s - 4.5s)
    // ==========================================
    if (time < 4.5) {
      const p = Math.min(1, time / 0.8);
      ctx.save();
      ctx.globalAlpha = time > 3.8 ? Math.max(0, (4.5 - time) / 0.7) : p;

      // Header Tag
      ctx.fillStyle = "#f472b6";
      ctx.font = `600 ${Math.round(w * 0.024)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("[ act 1: the crisis ]", w / 2, h * 0.3);

      // Kinetic Statement
      ctx.fillStyle = "#18181b";
      ctx.font = `300 ${Math.round(w * 0.045)}px sans-serif`;
      ctx.fillText("your text messages are painfully boring.", w / 2, h * 0.4);

      // Dry text message bubble simulation
      const bubbleW = w * 0.55;
      const bubbleH = h * 0.16;
      const bubbleX = (w - bubbleW) / 2;
      const bubbleY = h * 0.5;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#e4e4e7";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#71717a";
      ctx.font = `400 ${Math.round(w * 0.026)}px sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText('"i drink coffee."', bubbleX + w * 0.04, bubbleY + bubbleH * 0.45);

      ctx.fillStyle = "#ef4444";
      ctx.font = `500 ${Math.round(w * 0.022)}px monospace`;
      ctx.fillText("✖ 0% lore · 100% corporate small talk", bubbleX + w * 0.04, bubbleY + bubbleH * 0.75);

      ctx.restore();
    }

    // ==========================================
    // ACT 2: ENTER THE MACHINE (4.5s - 9.5s)
    // ==========================================
    else if (time >= 4.5 && time < 9.5) {
      const relTime = time - 4.5;
      const p = Math.min(1, relTime / 0.6);
      ctx.save();
      ctx.globalAlpha = time > 8.8 ? Math.max(0, (9.5 - time) / 0.7) : p;

      // Title
      ctx.fillStyle = "#f472b6";
      ctx.font = `600 ${Math.round(w * 0.024)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("[ solution: high-velocity lore ]", w / 2, h * 0.25);

      // Hero Wordmark
      ctx.fillStyle = "#18181b";
      ctx.font = `300 ${Math.round(w * 0.065)}px sans-serif`;
      ctx.fillText("the larp machine.", w / 2, h * 0.35);

      // Subtitle
      ctx.fillStyle = "#71717a";
      ctx.font = `300 ${Math.round(w * 0.028)}px sans-serif`;
      ctx.fillText("for the top 1% performative and niche.", w / 2, h * 0.42);

      // Interactive Intensity Dials simulation
      const cardW = w * 0.68;
      const cardH = h * 0.28;
      const cardX = (w - cardW) / 2;
      const cardY = h * 0.5;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#fbcfe8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.stroke();

      // Dials
      const modes = ["casual snob", "unbearable lore", "existential crisis"];
      const activeIdx = relTime > 2.5 ? 2 : relTime > 1.2 ? 1 : 0;

      modes.forEach((mode, idx) => {
        const btnW = cardW * 0.28;
        const btnH = cardH * 0.28;
        const btnX = cardX + cardW * 0.05 + idx * (btnW + cardW * 0.04);
        const btnY = cardY + cardH * 0.2;

        ctx.fillStyle = idx === activeIdx ? "#18181b" : "#f4f4f5";
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, 12);
        ctx.fill();

        ctx.fillStyle = idx === activeIdx ? "#ffffff" : "#71717a";
        ctx.font = `500 ${Math.round(w * 0.02)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(mode, btnX + btnW / 2, btnY + btnH * 0.6);
      });

      // Status text
      ctx.fillStyle = "#f472b6";
      ctx.font = `500 ${Math.round(w * 0.022)}px monospace`;
      ctx.fillText("dial dialed to: [ existential crisis ]", w / 2, cardY + cardH * 0.8);

      ctx.restore();
    }

    // ==========================================
    // ACT 3: THE TRANSFORMATION & MOGGING (9.5s - 15.5s)
    // ==========================================
    else if (time >= 9.5 && time < 15.5) {
      const relTime = time - 9.5;
      const p = Math.min(1, relTime / 0.6);
      ctx.save();
      ctx.globalAlpha = time > 14.8 ? Math.max(0, (15.5 - time) / 0.7) : p;

      ctx.fillStyle = "#f472b6";
      ctx.font = `600 ${Math.round(w * 0.022)}px monospace`;
      ctx.textAlign = "center";
      ctx.fillText("say this instead of: \"i drink coffee\"", w / 2, h * 0.2);

      // Result Card
      const cardW = w * 0.76;
      const cardH = h * 0.42;
      const cardX = (w - cardW) / 2;
      const cardY = h * 0.26;

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#fbcfe8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 20);
      ctx.fill();
      ctx.stroke();

      // Output text typing simulation
      const fullText = "dialed the conical burrs to 41.5 microns because humidity shifted 3% in my kitchen. if the bloom phase isn't extracting at precisely 93.4°c you're drinking hot battery acid.";
      const charsToShow = Math.min(fullText.length, Math.floor(relTime * 50));
      const currentText = fullText.slice(0, charsToShow);

      ctx.fillStyle = "#18181b";
      ctx.font = `400 ${Math.round(w * 0.028)}px sans-serif`;
      ctx.textAlign = "left";

      // Simple word wrapping
      const words = currentText.split(" ");
      let line = "";
      let lineY = cardY + cardH * 0.25;
      const maxLineW = cardW * 0.88;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxLineW && line !== "") {
          ctx.fillText(line, cardX + cardW * 0.06, lineY);
          line = word + " ";
          lineY += Math.round(w * 0.04);
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, cardX + cardW * 0.06, lineY);

      // Mascot: mr. performative floating avatar
      if (relTime > 2.0) {
        const mascotX = w * 0.82;
        const mascotY = h * 0.76;
        drawMascotAvatar(ctx, mascotX, mascotY, w * 0.065, relTime);

        // Mascot Speech Bubble
        ctx.fillStyle = "#18181b";
        ctx.beginPath();
        ctx.roundRect(w * 0.38, h * 0.74, w * 0.38, h * 0.09, 12);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = `500 ${Math.round(w * 0.02)}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText("paste that and mute the thread.", w * 0.57, h * 0.795);
      }

      ctx.restore();
    }

    // ==========================================
    // ACT 4: OUTRO & LAUNCH CTA (15.5s - 20s)
    // ==========================================
    else {
      const relTime = time - 15.5;
      const p = Math.min(1, relTime / 0.6);
      ctx.save();
      ctx.globalAlpha = p;

      // Mascot in center
      drawMascotAvatar(ctx, w / 2, h * 0.32, w * 0.09, relTime);

      // Hero Title
      ctx.fillStyle = "#18181b";
      ctx.font = `300 ${Math.round(w * 0.07)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("the larp machine.", w / 2, h * 0.52);

      // Tagline
      ctx.fillStyle = "#71717a";
      ctx.font = `300 ${Math.round(w * 0.03)}px sans-serif`;
      ctx.fillText("for the top 1% performative and niche.", w / 2, h * 0.6);

      // URL Pill
      const pillW = w * 0.54;
      const pillH = h * 0.09;
      const pillX = (w - pillW) / 2;
      const pillY = h * 0.68;

      ctx.fillStyle = "#18181b";
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 9999);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = `600 ${Math.round(w * 0.026)}px monospace`;
      ctx.fillText("thelarpmachine.vercel.app", w / 2, pillY + pillH * 0.62);

      // Footer credit
      ctx.fillStyle = "#a1a1aa";
      ctx.font = `400 ${Math.round(w * 0.022)}px monospace`;
      ctx.fillText("built by qubitsorg · live now", w / 2, h * 0.86);

      ctx.restore();
    }
  };

  // Helper to draw clean vector mr. performative on canvas
  const drawMascotAvatar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    time: number
  ) => {
    ctx.save();
    ctx.translate(cx, cy + Math.sin(time * 3) * 3);

    // Face
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = r * 0.07;
    ctx.beginPath();
    ctx.roundRect(-r, -r * 0.9, r * 2, r * 1.8, r * 0.7);
    ctx.fill();
    ctx.stroke();

    // Hair Pompadour
    ctx.fillStyle = "#18181b";
    ctx.beginPath();
    ctx.moveTo(-r * 0.9, -r * 0.7);
    ctx.quadraticCurveTo(0, -r * 1.5, r * 0.9, -r * 0.7);
    ctx.quadraticCurveTo(0, -r * 0.8, -r * 0.9, -r * 0.7);
    ctx.fill();

    // Pink Hair Streak
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = r * 0.08;
    ctx.beginPath();
    ctx.moveTo(-r * 0.3, -r * 1.2);
    ctx.quadraticCurveTo(r * 0.2, -r * 1.3, r * 0.6, -r * 0.9);
    ctx.stroke();

    // Sunglasses
    ctx.fillStyle = "#18181b";
    ctx.beginPath();
    ctx.roundRect(-r * 0.75, -r * 0.35, r * 0.65, r * 0.45, r * 0.1);
    ctx.roundRect(r * 0.1, -r * 0.35, r * 0.65, r * 0.45, r * 0.1);
    ctx.fill();

    // Bridge
    ctx.fillRect(-r * 0.15, -r * 0.2, r * 0.3, r * 0.08);

    // Pink Neon Glints on Sunglasses
    ctx.strokeStyle = "#f472b6";
    ctx.lineWidth = r * 0.05;
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, -r * 0.28);
    ctx.lineTo(-r * 0.35, -r * 0.05);
    ctx.moveTo(r * 0.25, -r * 0.28);
    ctx.lineTo(r * 0.5, -r * 0.05);
    ctx.stroke();

    // Smirk
    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = r * 0.06;
    ctx.beginPath();
    ctx.moveTo(-r * 0.2, r * 0.35);
    ctx.quadraticCurveTo(r * 0.1, r * 0.45, r * 0.35, r * 0.3);
    ctx.stroke();

    // Cleft Chin
    ctx.beginPath();
    ctx.moveTo(0, r * 0.55);
    ctx.lineTo(0, r * 0.68);
    ctx.stroke();

    ctx.restore();
  };

  // Main animation tick
  useEffect(() => {
    let lastTime = currentTime;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp - currentTime * 1000;
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      if (elapsed >= TOTAL_DURATION) {
        setCurrentTime(TOTAL_DURATION);
        setIsPlaying(false);
        renderFrame(TOTAL_DURATION);
        if (isRecording) stopRecording();
        return;
      }

      playSceneAudio(elapsed, lastTime);
      lastTime = elapsed;
      setCurrentTime(elapsed);
      renderFrame(elapsed);

      animFrameRef.current = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      initAudio();
      animFrameRef.current = requestAnimationFrame(tick);
    } else {
      renderFrame(currentTime);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      startTimeRef.current = null;
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    startTimeRef.current = null;
    setTimeout(() => {
      renderFrame(0);
    }, 50);
  };

  // Record video directly to downloadable WebM file
  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    recordedChunksRef.current = [];
    const stream = canvas.captureStream(30); // 30 FPS

    try {
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `the-larp-machine-launch-${aspectRatio.replace(":", "x")}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      handleRestart();
      setTimeout(() => setIsPlaying(true), 100);
    } catch {
      alert("Video export is supported on Chrome/Firefox desktop browsers via WebM.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

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
        <span className="text-[11px] font-mono text-pink-500 bg-pink-50 border border-pink-200/50 px-2.5 py-0.5 rounded-full">
          launch video studio
        </span>
      </div>

      {/* Studio Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 lowercase mb-1">
          launch animation studio<span className="text-pink-400">.</span>
        </h1>
        <p className="text-xs text-neutral-400 font-light lowercase">
          kinetic motion graphics · apple minimalism · synthesized audio · direct video export
        </p>
      </div>

      {/* Video Preview Canvas Stage */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className={`relative rounded-2xl overflow-hidden bg-white border border-pink-100/90 shadow-xl shadow-pink-100/40 transition-all ${
            aspectRatio === "16:9"
              ? "w-full max-w-[720px] aspect-video"
              : "w-full max-w-[340px] aspect-[9/16]"
          }`}
        >
          <canvas
            ref={canvasRef}
            width={aspectRatio === "16:9" ? 1280 : 720}
            height={aspectRatio === "16:9" ? 720 : 1280}
            className="w-full h-full object-contain"
          />

          {/* Recording Badge */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-mono animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>recording video...</span>
            </div>
          )}
        </div>

        {/* Video Scrubber & Timeline */}
        <div className="w-full max-w-[720px] mt-4 flex items-center gap-3">
          <span className="text-[11px] font-mono text-neutral-400">
            {currentTime.toFixed(1)}s
          </span>
          <div className="flex-1 h-1.5 bg-neutral-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-75"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            {TOTAL_DURATION}.0s
          </span>
        </div>

        {/* Control Toolbar */}
        <div className="w-full max-w-[720px] mt-4 flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-neutral-200/70 shadow-xs">
          {/* Play / Pause / Restart */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer active:scale-95 transition-all shadow-xs lowercase"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-pink-300" />
                  <span>pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-pink-300" />
                  <span>play animation</span>
                </>
              )}
            </button>

            <button
              onClick={handleRestart}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Aspect Ratio Switcher */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-neutral-100 border border-neutral-200/60 text-xs font-mono">
            <button
              onClick={() => setAspectRatio("16:9")}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                aspectRatio === "16:9" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-500"
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>16:9 (x / yt)</span>
            </button>
            <button
              onClick={() => setAspectRatio("9:16")}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                aspectRatio === "9:16" ? "bg-white text-neutral-900 shadow-xs" : "text-neutral-500"
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>9:16 (tiktok / reels)</span>
            </button>
          </div>

          {/* Export Video Button */}
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200/70 transition-all cursor-pointer active:scale-95 shadow-xs lowercase"
          >
            <Download className="w-3.5 h-3.5 text-pink-500" />
            <span>export video (.webm)</span>
          </button>
        </div>
      </div>

      {/* Storyboard Script Breakdown */}
      <div className="w-full max-w-[720px] mx-auto mt-8 p-4 rounded-2xl bg-white border border-neutral-100 shadow-xs text-xs space-y-2.5 text-neutral-600 font-mono">
        <div className="font-semibold text-neutral-900 pb-1 border-b border-neutral-100">
          video storyboard (20s motion graphics loop):
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:00 - 00:04</span>
          <span>act 1: the problem — dry corporate small talk flatlines</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:04 - 00:09</span>
          <span>act 2: the machine — 3 lore intensity dials & roulette</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:09 - 00:15</span>
          <span>act 3: the lore — 41.5 microns & mr. performative approving</span>
        </div>
        <div className="flex justify-between">
          <span className="text-pink-600">00:15 - 00:20</span>
          <span>act 4: outro lockup — thelarpmachine.vercel.app · qubitsorg</span>
        </div>
      </div>
    </main>
  );
}
