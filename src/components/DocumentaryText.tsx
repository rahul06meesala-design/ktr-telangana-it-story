import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { loadFont as loadTelugu } from "@remotion/google-fonts/NotoSansTelugu";

const { fontFamily: teluguFont } = loadTelugu();

interface DocumentaryTextProps {
  text: string;
  position?: "bottomLeft" | "bottomCenter" | "topLeft";
}

/**
 * Small investigative-overlay caption -- used sparingly for on-screen
 * annotations (e.g. "2015", "T-Hub"). Restrained, not a subtitle track.
 */
export const DocumentaryText: React.FC<DocumentaryTextProps> = ({
  text,
  position = "bottomLeft",
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, 999999], [0, 1, 1], {
    extrapolateRight: "clamp",
  });

  const posStyle: React.CSSProperties =
    position === "bottomCenter"
      ? { justifyContent: "flex-end", alignItems: "center", textAlign: "center" }
      : position === "topLeft"
      ? { justifyContent: "flex-start", alignItems: "flex-start", textAlign: "left" }
      : { justifyContent: "flex-end", alignItems: "flex-start", textAlign: "left" };

  return (
    <AbsoluteFill
      style={{ ...posStyle, display: "flex", padding: "64px 72px" }}
    >
      <div
        style={{
          opacity,
          fontFamily: `${teluguFont}, Arial, sans-serif`,
          fontSize: 30,
          color: "rgba(255,255,255,0.92)",
          background: "rgba(10,12,16,0.45)",
          padding: "10px 18px",
          borderLeft: position !== "bottomCenter" ? "3px solid rgba(255,255,255,0.7)" : "none",
          borderRadius: 4,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
