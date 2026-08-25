import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFont as loadTelugu } from "@remotion/google-fonts/NotoSansTelugu";

const { fontFamily: teluguFont } = loadTelugu();

interface MapAnimationProps {
  label: string; // e.g. "Hyderabad, Telangana"
}

/**
 * Subtle abstract map-style location callout: a soft radar-ping marker
 * with a location label. Deliberately abstract/schematic (not a literal
 * GIS map) to match the "subtle maps" note in the motion-graphics language
 * section and avoid a HUD/sci-fi look.
 */
export const MapAnimation: React.FC<MapAnimationProps> = ({ label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const pingProgress = (frame % Math.round(fps * 1.6)) / (fps * 1.6);
  const pingScale = interpolate(pingProgress, [0, 1], [0.4, 2.2], {
    easing: Easing.out(Easing.cubic),
  });
  const pingOpacity = interpolate(pingProgress, [0, 1], [0.55, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: "0 0 150px 72px" }}>
      <div style={{ opacity, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative", width: 22, height: 22 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.8)",
              transform: `scale(${pingScale})`,
              opacity: pingOpacity,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 9,
              height: 9,
              marginTop: -4.5,
              marginLeft: -4.5,
              borderRadius: "50%",
              background: "#ffffff",
              boxShadow: "0 0 8px rgba(255,255,255,0.7)",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: `${teluguFont}, Arial, sans-serif`,
            fontSize: 22,
            color: "rgba(255,255,255,0.9)",
            background: "rgba(10,12,16,0.5)",
            padding: "6px 14px",
            borderRadius: 4,
          }}
        >
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
};
