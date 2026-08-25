import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate } from "remotion";
import { getCameraTransform } from "./CameraMove";
import type { MotionType } from "../data/videoData";
import { FilmGrain } from "./FilmGrain";

interface CinematicImageProps {
  src: string;
  motionType: MotionType;
  durationInFrames: number;
  /** Fallback color shown if the asset hasn't been placed yet. */
  placeholderLabel?: string;
  vignette?: boolean;
  grain?: boolean;
  hazeOpacity?: number;
}

/**
 * Renders a still image with cinematic camera motion (Ken Burns family),
 * restrained motion blur via CSS filter, a soft vignette, atmospheric haze
 * and film grain. If the asset file is missing (not yet supplied by the
 * editor) it renders a labeled placeholder card instead of crashing the
 * render, so `npm run render` always succeeds end-to-end.
 */
export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  motionType,
  durationInFrames,
  placeholderLabel,
  vignette = true,
  grain = true,
  hazeOpacity = 0.06,
}) => {
  const frame = useCurrentFrame();
  const progress = durationInFrames > 0 ? frame / durationInFrames : 0;
  const { scale, translateX, translateY } = getCameraTransform(
    motionType,
    progress
  );

  // Restrained motion blur: only during the fastest part of the move.
  const speed = Math.abs(
    interpolate(progress, [0, 1], [0, 1]) - interpolate(
      Math.max(0, progress - 0.02),
      [0, 1],
      [0, 1]
    )
  );
  const blur = Math.min(0.6, speed * 6);

  const [errored, setErrored] = React.useState(false);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0b0d10" }}>
      {!errored ? (
        <Img
          src={src}
          onError={() => setErrored(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            filter: `blur(${blur}px)`,
          }}
        />
      ) : (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(135deg, #14181f 0%, #1d232c 60%, #0b0d10 100%)",
            transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          }}
        >
          <div
            style={{
              color: "#5c6675",
              fontFamily: "Noto Sans Telugu, Arial, sans-serif",
              fontSize: 28,
              textAlign: "center",
              maxWidth: "70%",
              border: "1px dashed #3a4250",
              borderRadius: 12,
              padding: "24px 32px",
            }}
          >
            Missing asset
            <div style={{ fontSize: 18, marginTop: 8, opacity: 0.8 }}>
              {src}
            </div>
            {placeholderLabel ? (
              <div style={{ fontSize: 16, marginTop: 12, opacity: 0.6 }}>
                {placeholderLabel}
              </div>
            ) : null}
          </div>
        </AbsoluteFill>
      )}

      {/* Atmospheric haze */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0.15) 100%)",
          opacity: hazeOpacity * 10,
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      {vignette && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {grain && <FilmGrain opacity={0.045} />}
    </AbsoluteFill>
  );
};
