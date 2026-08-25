import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate } from "remotion";
import { FilmGrain } from "./FilmGrain";

interface ParallaxImageProps {
  /** Background layer (e.g. blurred/darkened crop of the same image). */
  backgroundSrc: string;
  /** Foreground/subject layer. */
  foregroundSrc: string;
  durationInFrames: number;
  intensity?: number; // px of drift
}

/**
 * Two-layer parallax: background drifts slower than the foreground subject,
 * used for KTR portrait / meeting shots per the brief's "subtle parallax"
 * note. If foregroundSrc === backgroundSrc, it still works -- it just
 * layers the same image twice with different drift speeds and a soft
 * vignette between them for a cheap depth illusion.
 */
export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  backgroundSrc,
  foregroundSrc,
  durationInFrames,
  intensity = 18,
}) => {
  const frame = useCurrentFrame();
  const progress = durationInFrames > 0 ? frame / durationInFrames : 0;

  const bgX = interpolate(progress, [0, 1], [-intensity * 0.4, intensity * 0.4]);
  const bgScale = interpolate(progress, [0, 1], [1.08, 1.14]);

  const fgX = interpolate(progress, [0, 1], [intensity * 0.6, -intensity * 0.6]);
  const fgScale = interpolate(progress, [0, 1], [1.02, 1.08]);

  const [bgError, setBgError] = React.useState(false);
  const [fgError, setFgError] = React.useState(false);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0b0d10" }}>
      {!bgError ? (
        <Img
          src={backgroundSrc}
          onError={() => setBgError(true)}
          style={{
            position: "absolute",
            width: "110%",
            height: "110%",
            objectFit: "cover",
            filter: "blur(6px) brightness(0.7)",
            transform: `scale(${bgScale}) translateX(${bgX}px)`,
          }}
        />
      ) : null}

      {!fgError ? (
        <Img
          src={foregroundSrc}
          onError={() => setFgError(true)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${fgScale}) translateX(${fgX}px)`,
          }}
        />
      ) : null}

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
      <FilmGrain opacity={0.045} />
    </AbsoluteFill>
  );
};
