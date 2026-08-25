import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random, interpolate } from "remotion";

interface ParticleAtmosphereProps {
  count?: number;
  opacity?: number;
}

/**
 * Very restrained floating dust/haze particles to add atmospheric depth
 * to establishing shots (skylines, workshop interiors). Deterministic via
 * Remotion's `random(seed)` so it renders identically every frame pass.
 */
export const ParticleAtmosphere: React.FC<ParticleAtmosphereProps> = ({
  count = 22,
  opacity = 0.18,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const particles = new Array(count).fill(0).map((_, i) => {
    const seedX = random(`p-x-${i}`);
    const seedY = random(`p-y-${i}`);
    const seedSize = random(`p-size-${i}`);
    const seedSpeed = random(`p-speed-${i}`);
    const speed = 0.15 + seedSpeed * 0.5; // vertical drift speed

    const progress = ((frame / durationInFrames) * speed + seedY) % 1;
    const y = interpolate(progress, [0, 1], [height * 1.05, -height * 0.05]);
    const x = seedX * width;
    const size = 1.5 + seedSize * 3;

    return { x, y, size, key: i };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#ffffff",
            opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
