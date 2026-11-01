import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  Sequence,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { MrPerformativeMascot } from "./MrPerformativeMascot";

export interface LaunchVideoProps {
  aspectRatio?: "16:9" | "9:16";
}

// Scene 1: The Problem — Dry small talk & flatlining AI prose (Frames 0 - 150 = 5.0s)
const SceneProblem: React.FC<{ isVertical: boolean }> = ({ isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(
    frame,
    [0, 15, 135, 150],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cardY = spring({
    frame,
    fps,
    config: { damping: 16, mass: 0.8 },
  });

  const cardTranslateY = interpolate(cardY, [0, 1], [30, 0]);

  // Cursor typing animation
  const typedText = "i like coffee.";
  const charsShown = Math.floor(
    interpolate(frame, [20, 65], [0, typedText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Corporate AI rewrite pop-in
  const aiBubbleSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, mass: 0.7 },
  });
  const aiBubbleScale = interpolate(aiBubbleSpring, [0, 1], [0.85, 1]);
  const aiBubbleOpacity = interpolate(frame, [75, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flatline strike-through
  const strikeProgress = interpolate(frame, [105, 130], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "0 40px" : "0 80px",
      }}
    >
      {/* Pill Badge */}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: isVertical ? 20 : 18,
          color: "#737373",
          letterSpacing: "-0.02em",
          marginBottom: 24,
          padding: "6px 16px",
          borderRadius: 9999,
          background: "rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        problem: internet conversation is dying
      </div>

      {/* Main Boring Card */}
      <div
        style={{
          width: "100%",
          maxWidth: isVertical ? 620 : 760,
          background: "#ffffff",
          borderRadius: 24,
          padding: isVertical ? 36 : 40,
          border: "1.5px solid #e5e5e5",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)",
          transform: `translateY(${cardTranslateY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            color: "#a3a3a3",
            marginBottom: 12,
          }}
        >
          human_statement.txt
        </div>
        <div
          style={{
            fontSize: isVertical ? 32 : 36,
            fontWeight: 400,
            color: "#171717",
            letterSpacing: "-0.03em",
            minHeight: 48,
          }}
        >
          {typedText.slice(0, charsShown)}
          {charsShown < typedText.length && (
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: isVertical ? 28 : 32,
                backgroundColor: "#f43f5e",
                marginLeft: 4,
                verticalAlign: "middle",
              }}
            />
          )}
        </div>
      </div>

      {/* Standard Generic LLM Response (The boring corporate response) */}
      {frame >= 75 && (
        <div
          style={{
            marginTop: 24,
            width: "100%",
            maxWidth: isVertical ? 620 : 760,
            background: "#fbfbfe",
            borderRadius: 20,
            padding: isVertical ? 28 : 32,
            border: "1.5px dashed #d4d4d8",
            opacity: aiBubbleOpacity,
            transform: `scale(${aiBubbleScale})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: "#9ca3af",
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>typical_llm_response</span>
            <span style={{ color: "#ef4444" }}>cliché detected</span>
          </div>
          <div
            style={{
              fontSize: isVertical ? 20 : 22,
              lineHeight: 1.45,
              color: "#52525b",
              fontWeight: 400,
              position: "relative",
            }}
          >
            &ldquo;coffee is a celestial tapestry that illuminates the soul and fosters deep human synergy...&rdquo;
            {/* Red strike through bar */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                height: 4,
                backgroundColor: "#ef4444",
                width: `${strikeProgress}%`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Scene 2: The Solution — Introducing The LARP Machine & Controls (Frames 150 - 300 = 5.0s)
const SceneSolution: React.FC<{ isVertical: boolean }> = ({ isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(
    frame,
    [0, 15, 135, 150],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const popSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const scale = interpolate(popSpring, [0, 1], [0.92, 1]);

  // Highlight active intensity mode
  const activeModeIndex = frame < 40 ? 0 : frame < 80 ? 1 : 2;
  const modes = [
    { id: "casual", label: "casual snob", desc: "dismissive, sharp" },
    { id: "unbearable", label: "unbearable lore", desc: "41.5 micron grind" },
    { id: "existential", label: "existential crisis", desc: "spiritual collapse" },
  ];

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "0 40px" : "0 80px",
      }}
    >
      {/* Title Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: isVertical ? 24 : 32,
          transform: `scale(${scale})`,
        }}
      >
        <MrPerformativeMascot size={isVertical ? 60 : 72} isGlancing={frame % 30 > 15} />
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: isVertical ? 38 : 46,
              fontWeight: 400,
              letterSpacing: "-0.04em",
              color: "#0a0a0a",
              lineHeight: 1.1,
            }}
          >
            the larp machine<span style={{ color: "#ec4899" }}>.</span>
          </h1>
          <p
            style={{
              margin: "4px 0 0 0",
              fontSize: isVertical ? 16 : 18,
              color: "#737373",
              fontFamily: "monospace",
            }}
          >
            turn mundane statements into authentic internet lore
          </p>
        </div>
      </div>

      {/* Interactive Intensity Selector */}
      <div
        style={{
          width: "100%",
          maxWidth: isVertical ? 620 : 780,
          background: "#ffffff",
          borderRadius: 24,
          padding: isVertical ? 28 : 36,
          border: "1.5px solid #fbcfe8",
          boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.12)",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            color: "#a3a3a3",
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>dial_intensity_mode</span>
          <span style={{ color: "#db2777" }}>zero ai fluff filter active</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isVertical ? "1fr" : "1fr 1fr 1fr",
            gap: 14,
          }}
        >
          {modes.map((mode, idx) => {
            const isActive = idx === activeModeIndex;
            return (
              <div
                key={mode.id}
                style={{
                  padding: "16px 20px",
                  borderRadius: 16,
                  border: isActive ? "2px solid #ec4899" : "1.5px solid #e5e5e5",
                  background: isActive ? "#fdf2f8" : "#fafafa",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: isActive ? "#be185d" : "#262626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{mode.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#ec4899",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: isActive ? "#db2777" : "#737373",
                    fontFamily: "monospace",
                  }}
                >
                  {mode.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: The Payoff — The Unhinged Monologue & Mascot Squeak (Frames 300 - 460 = 5.33s)
const SceneLore: React.FC<{ isVertical: boolean }> = ({ isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(
    frame,
    [0, 15, 145, 160],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.7 },
  });

  const mascotSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  const fullText =
    "i'm in too deep with coffee to the point where normal cafes taste like warm battery acid. i'm weighing out 18.2 grams of washed ethiopian beans on an acaia scale every morning and timing my pour-over to the second. if the drawdown takes 3 minutes and 5 seconds instead of 2:55 my whole mood is ruined for the day.";

  const textProgress = Math.floor(
    interpolate(frame, [10, 100], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "0 40px" : "0 80px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: isVertical ? 620 : 820,
          position: "relative",
        }}
      >
        {/* Mascot Floats on the corner */}
        <div
          style={{
            position: "absolute",
            top: isVertical ? -55 : -45,
            right: 20,
            zIndex: 10,
            transform: `scale(${interpolate(mascotSpring, [0, 1], [0, 1])}) rotate(${
              frame % 40 > 20 ? "3deg" : "-3deg"
            })`,
          }}
        >
          <MrPerformativeMascot size={isVertical ? 80 : 92} glow isGlancing />
        </div>

        {/* Monologue Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: isVertical ? "40px 32px" : "48px 48px",
            border: "2px solid #18181b",
            boxShadow: "8px 8px 0px #18181b",
            transform: `scale(${interpolate(cardSpring, [0, 1], [0.94, 1])})`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              borderBottom: "1.5px solid #f4f4f5",
              paddingBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#18181b",
                }}
              >
                larp_generated: unbearable
              </span>
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                color: "#db2777",
                background: "#fdf2f8",
                padding: "2px 8px",
                borderRadius: 6,
              }}
            >
              18.2g ethiopian
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: isVertical ? 22 : 26,
              lineHeight: 1.48,
              fontWeight: 400,
              color: "#18181b",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            {fullText.slice(0, textProgress)}
            {textProgress < fullText.length && (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: 22,
                  backgroundColor: "#db2777",
                  marginLeft: 4,
                  verticalAlign: "middle",
                }}
              />
            )}
          </p>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "#a1a1aa",
              }}
            >
              paste it & mute the thread
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "#18181b",
                background: "#f4f4f5",
                padding: "4px 10px",
                borderRadius: 8,
              }}
            >
              copy text
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Outro Lockup & Call To Action (Frames 460 - 600 = 4.67s)
const SceneOutro: React.FC<{ isVertical: boolean }> = ({ isVertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  const buttonSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        opacity: containerOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isVertical ? "0 40px" : "0 80px",
      }}
    >
      <div
        style={{
          transform: `scale(${interpolate(logoSpring, [0, 1], [0.85, 1])})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <MrPerformativeMascot size={isVertical ? 100 : 120} glow isGlancing />

        <h1
          style={{
            margin: "24px 0 8px 0",
            fontSize: isVertical ? 44 : 56,
            fontWeight: 400,
            letterSpacing: "-0.04em",
            color: "#09090b",
          }}
        >
          the larp machine<span style={{ color: "#ec4899" }}>.</span>
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: isVertical ? 20 : 24,
            fontWeight: 300,
            color: "#52525b",
            letterSpacing: "-0.02em",
          }}
        >
          say less. yap like you never logged off.
        </p>

        {/* URL Pill Badge */}
        <div
          style={{
            marginTop: 36,
            transform: `scale(${interpolate(buttonSpring, [0, 1], [0.85, 1])})`,
            padding: isVertical ? "16px 36px" : "18px 44px",
            background: "#18181b",
            color: "#ffffff",
            borderRadius: 9999,
            fontSize: isVertical ? 22 : 26,
            fontWeight: 500,
            fontFamily: "monospace",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.25)",
            border: "1px solid #3f3f46",
            letterSpacing: "-0.02em",
          }}
        >
          thelarpmachine.vercel.app
        </div>

        {/* Maker Credits */}
        <div
          style={{
            marginTop: 24,
            fontSize: 14,
            fontFamily: "monospace",
            color: "#a1a1aa",
          }}
        >
          by qubitsorg · 100% free · zero login
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LaunchVideo: React.FC<LaunchVideoProps> = ({ aspectRatio = "16:9" }) => {
  const isVertical = aspectRatio === "9:16";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background Soft Ambient Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(#e4e4e7 1px, transparent 1px), radial-gradient(#e4e4e7 1px, #fafafa 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
          opacity: 0.6,
        }}
      />

      {/* Sound Effects Sequenced Across Beats */}
      {/* Beat 1: Initial Whoosh / Arrival */}
      <Sequence from={5} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.4} />
      </Sequence>

      {/* Beat 2: Cliché detected alert / switch */}
      <Sequence from={75} durationInFrames={30}>
        <Audio src={staticFile("sfx/switch.wav")} volume={0.45} />
      </Sequence>

      {/* Beat 3: Act 2 Scene Transition Whoosh */}
      <Sequence from={150} durationInFrames={30}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.5} />
      </Sequence>

      {/* Beat 4: Dialing intensity modes (clicks) */}
      <Sequence from={190} durationInFrames={25}>
        <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={230} durationInFrames={25}>
        <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.65} />
      </Sequence>

      {/* Beat 5: Act 3 Monologue Generation Ding / Chime */}
      <Sequence from={300} durationInFrames={45}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.55} />
      </Sequence>

      {/* Beat 6: Act 4 Outro Fanfare Ding */}
      <Sequence from={460} durationInFrames={50}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.6} />
      </Sequence>

      {/* Act 1: The Problem (0 to 5s = 150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <SceneProblem isVertical={isVertical} />
      </Sequence>

      {/* Act 2: The Solution / Controls (150 to 300 = 150 frames) */}
      <Sequence from={150} durationInFrames={150}>
        <SceneSolution isVertical={isVertical} />
      </Sequence>

      {/* Act 3: The Lore Payoff (300 to 460 = 160 frames) */}
      <Sequence from={300} durationInFrames={160}>
        <SceneLore isVertical={isVertical} />
      </Sequence>

      {/* Act 4: Outro Lockup & CTA (460 to 600 = 140 frames) */}
      <Sequence from={460} durationInFrames={140}>
        <SceneOutro isVertical={isVertical} />
      </Sequence>
    </AbsoluteFill>
  );
};
