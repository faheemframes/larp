import React from "react";

interface MrPerformativeMascotProps {
  size?: number;
  isGlancing?: boolean;
  glow?: boolean;
}

export const MrPerformativeMascot: React.FC<MrPerformativeMascotProps> = ({
  size = 64,
  isGlancing = false,
  glow = false,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        filter: glow ? "drop-shadow(0 0 16px rgba(244, 114, 182, 0.6))" : undefined,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground ambient shadow */}
        <ellipse cx="32" cy="58" rx="13" ry="2.5" fill="#18181b" opacity="0.12" />

        {/* Ears */}
        <circle cx="12" cy="33" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.6" />
        <circle cx="52" cy="33" r="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.6" />

        {/* Chiseled Face Contour */}
        <path
          d="M 14 20 C 14 13, 22 11, 32 11 C 42 11, 50 13, 50 20 L 49 33 C 49 43, 39 51, 32 55 C 25 51, 15 43, 15 33 Z"
          fill="#ffffff"
          stroke="#18181b"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Cheekbone Accents */}
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

        {/* Resting Eyebrows */}
        <g stroke="#18181b" strokeWidth="1.6" strokeLinecap="round">
          <path d="M 19 21 Q 24 19 28 21" />
          <path d="M 36 21 Q 40 19 45 21" />
        </g>

        {/* Solid Designer Sunglasses */}
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

          {/* Reflections */}
          <line
            x1="18"
            y1="26"
            x2="22"
            y2="31"
            stroke={isGlancing ? "#f472b6" : "#ffffff"}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <line
            x1="38"
            y1="26"
            x2="42"
            y2="31"
            stroke={isGlancing ? "#f472b6" : "#ffffff"}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* Chiseled Nose Bridge Accent */}
        <path d="M 32 32 L 30 39 L 32 39" stroke="#18181b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Neutral Smirk */}
        <path d="M 27 45 Q 32 46.5 37 44.5" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" />

        {/* Chiseled Chin Cleft */}
        <path d="M 30.5 50.5 Q 32 51.5 33.5 50.5" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    </div>
  );
};
