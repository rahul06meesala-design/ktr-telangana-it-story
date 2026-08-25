import React from "react";
import { useCurrentFrame, random, AbsoluteFill } from "remotion";

/**
 * Subtle animated film-grain / noise overlay to give the documentary a
 * shot-on-film texture instead of a flat digital-slideshow look.
 */
export const FilmGrain: React.FC<{ opacity?: number }> = ({
  opacity = 0.05,
}) => {
  const frame = useCurrentFrame();
  // Cheap flicker: shift a repeating noise pattern's position every frame.
  const seed = Math.floor(frame / 2);
  const dx = Math.floor(random(`grain-x-${seed}`) * 6) - 3;
  const dy = Math.floor(random(`grain-y-${seed}`) * 6) - 3;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundPosition: `${dx}px ${dy}px`,
        transform: "scale(1.1)",
      }}
    />
  );
};
