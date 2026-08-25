import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { loadFont as loadTelugu } from "@remotion/google-fonts/NotoSansTelugu";

const { fontFamily: teluguFont } = loadTelugu();

interface CinematicTextProps {
  eyebrow?: string; // e.g. "ACT 3"
  title: string; // e.g. act title or chapter title
  align?: "center" | "left";
}

/**
 * Large chapter-card typography used at the start of each ACT. Clean,
 * restrained documentary type -- no glowing text, no HUD effects.
 */
export const CinematicText: React.FC<CinematicTextProps> = ({
  eyebrow,
  title,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 12, 999999], [0, 1, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(enter, [0, 1], [18, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: align === "center" ? "center" : "flex-start",
        padding: "0 90px 96px",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: align,
          maxWidth: 1400,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
              letterSpacing: 6,
              color: "rgba(255,255,255,0.65)",
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            fontFamily: `${teluguFont}, Arial, sans-serif`,
            fontSize: 52,
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.25,
            textShadow: "0 2px 24px rgba(0,0,0,0.55)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 18,
            width: 64,
            height: 3,
            background: "rgba(255,255,255,0.55)",
            marginLeft: align === "center" ? "auto" : 0,
            marginRight: align === "center" ? "auto" : 0,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
