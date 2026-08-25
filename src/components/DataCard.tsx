import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadTelugu } from "@remotion/google-fonts/NotoSansTelugu";
import { Counter } from "./Counter";
import type { DataCardStat } from "../data/videoData";

const { fontFamily: teluguFont } = loadTelugu();

interface DataCardProps {
  stats: DataCardStat[];
  position?: "bottomRight" | "center";
}

/**
 * Restrained data-card overlay for factual stats pulled directly from the
 * source narration (e.g. T-Hub's 2,000+ startups / $1.94B raised). Numeric
 * values that start with a currency/number are animated with <Counter />;
 * anything else fades in as static text.
 */
export const DataCard: React.FC<DataCardProps> = ({ stats, position = "bottomRight" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const translateY = interpolate(enter, [0, 1], [16, 0]);

  const alignStyle: React.CSSProperties =
    position === "center"
      ? { justifyContent: "center", alignItems: "center" }
      : { justifyContent: "flex-end", alignItems: "flex-end" };

  return (
    <AbsoluteFill style={{ ...alignStyle, display: "flex", padding: "0 72px 150px 0" }}>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          background: "rgba(10,12,16,0.62)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 6,
          padding: "22px 28px",
          minWidth: 340,
        }}
      >
        {stats.map((s, i) => {
          const numericMatch = s.value.match(/^([\$]?)([\d,]+(?:\.\d+)?)(.*)$/);
          return (
            <div
              key={i}
              style={{
                marginBottom: i === stats.length - 1 ? 0 : 14,
                fontFamily: `${teluguFont}, Arial, sans-serif`,
              }}
            >
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>
                {s.label.toUpperCase()}
              </div>
              {numericMatch ? (
                <Counter
                  prefix={numericMatch[1]}
                  targetValue={parseFloat(numericMatch[2].replace(/,/g, ""))}
                  suffix={numericMatch[3]}
                />
              ) : (
                <div style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}>{s.value}</div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
