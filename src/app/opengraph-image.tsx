import { ImageResponse } from "next/og";
import { agent, siteIdentity } from "@/lib/site-contact";

export const alt = `${siteIdentity.siteName} — Elkhorn Springs (${siteIdentity.zip}) real estate`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #141a18 0%, #1f3d32 45%, #2a5c47 100%)",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#9cb8a8",
            margin: 0,
          }}
        >
          Las Vegas {siteIdentity.zip}
        </p>
        <p
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#f4f6f4",
            lineHeight: 1.1,
            margin: "16px 0 0",
            maxWidth: 900,
          }}
        >
          {siteIdentity.primaryArea} real estate
        </p>
        <p style={{ fontSize: 30, color: "#c8d9d0", margin: "28px 0 0", maxWidth: 900 }}>
          {siteIdentity.siteName}
        </p>
        <p style={{ fontSize: 22, color: "#8fa89a", margin: "48px 0 0" }}>
          {agent.name} · {agent.brokerage}
        </p>
      </div>
    ),
    { ...size },
  );
}
