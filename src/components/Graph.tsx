import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFont as loadTelugu } from "@remotion/google-fonts/NotoSansTelugu";

const { fontFamily: teluguFont } = loadTelugu();

export interface GraphPoint {
  label: string;
  value: number; // 0-100 relative scale
}

interface GraphProps {
  title: string;
  points: GraphPoint[];
  position?: "bottomRight" | "center";
}

/**
 * Restrained animated bar graph -- deliberately plain (no neon HUD look)
 * per the brief's "restrained graphs" note. Bars grow in with a documentary
 * data-overlay feel, not a broadcast-graphics sting.
 */
export const Graph: React.FC<GraphProps> = ({ title, points, position = "bottomRight" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const growProgress = interpolate(frame, [0, Math.round(fps * 1.4)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  const maxVal = Math.max(...points.map((p) => p.value), 1);
  const barWidth = 46;
  const gap = 22;
  const chartHeight = 140;

  const alignStyle: React.CSSProperties =
    position === "center"
      ? { justifyContent: "center", alignItems: "center" }
      : { justifyContent: "flex-end", alignItems: "flex-end" };

  return (
    <AbsoluteFill style={{ ...alignStyle, display: "flex", padding: "0 72px 150px 0" }}>
      <div
        style={{
          opacity,
          background: "rgba(10,12,16,0.6)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 6,
          padding: "20px 26px",
        }}
      >
        <div
          style={{
            fontFamily: `${teluguFont}, Arial, sans-serif`,
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          {title.toUpperCase()}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", height: chartHeight, gap }}>
          {points.map((p, i) => {
            const h = (p.value / maxVal) * chartHeight * growProgress;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: barWidth,
                    height: h,
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: "2px 2px 0 0",
                  }}
                />
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: `${teluguFont}, Arial, sans-serif`,
                    maxWidth: barWidth + 20,
                    textAlign: "center",
                  }}
                >
                  {p.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
