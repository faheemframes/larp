import { ImageResponse } from "next/og";

export const alt = "the larp machine — for the top 1% performative and niche";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf9f9",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 84,
              fontWeight: 700,
              color: "#18181b",
              lineHeight: 1,
              marginBottom: 24,
            }}
          >
            <span>the larp machine</span>
            <span
              style={{
                display: "flex",
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: "#f472b6",
                marginLeft: 8,
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 400,
              color: "#71717a",
              marginBottom: 40,
            }}
          >
            for the top 1% performative and niche.
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 28,
              paddingRight: 28,
              borderRadius: 9999,
              border: "1px solid #fbcfe8",
              backgroundColor: "#ffffff",
              fontSize: 20,
              color: "#52525b",
            }}
          >
            <span>the larp machine</span>
            <span style={{ color: "#f472b6", marginLeft: 12, marginRight: 12 }}>·</span>
            <span>by qubitsorg</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
