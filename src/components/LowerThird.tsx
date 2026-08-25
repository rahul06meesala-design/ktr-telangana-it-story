import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont as loadTelugu } from "@remotion/google-fonts/NotoSansTelugu";

const { fontFamily: teluguFont } = loadTelugu();

interface LowerThirdProps {
  name: string;
  role?: string;
}

/**
 * Broadcast-documentary style lower third for identifying a real person
 * or official (e.g. "K. T. Rama Rao — Former IT Minister, Telangana" or
 * "Duddilla Sridhar Babu — IT Minister, Telangana"). Slides in from the
 * left, holds, then exits -- never announces itself with campaign colors.
 */
export const LowerThird: React.FC<LowerThirdProps> = ({ name, role }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exitStart = durationInFrames - 12;
  const exitProgress = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(enter, [0, 1], [-40, 0]) + exitProgress * -40;
  const opacity = interpolate(enter, [0, 1], [0, 1]) * (1 - exitProgress);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 0 150px 72px" }}>
      <div style={{ opacity, transform: `translateX(${translateX}px)`, display: "inline-flex" }}>
        <div
          style={{
            background: "rgba(12,14,18,0.72)",
            borderLeft: "4px solid rgba(255,255,255,0.85)",
            padding: "12px 22px",
            maxWidth: 640,
          }}
        >
          <div
            style={{
              fontFamily: `${teluguFont}, Arial, sans-serif`,
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {name}
          </div>
          {role ? (
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 18,
                color: "rgba(255,255,255,0.75)",
                marginTop: 2,
              }}
            >
              {role}
            </div>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
