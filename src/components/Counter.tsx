import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

interface CounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  /** How many frames the count-up animation takes (default: ~1.2s). */
  animateOverFrames?: number;
  decimals?: number;
}

/**
 * Animated count-up number, e.g. "$1.94" -> billion, or "2,000" -> +.
 * Formats with thousands separators unless decimals are requested.
 */
export const Counter: React.FC<CounterProps> = ({
  targetValue,
  prefix = "",
  suffix = "",
  animateOverFrames = 36,
  decimals,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frames = animateOverFrames ?? Math.round(fps * 1.2);

  const progress = interpolate(frame, [0, frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const isDecimal = decimals !== undefined || !Number.isInteger(targetValue);
  const decimalPlaces = decimals ?? (isDecimal ? 2 : 0);
  const current = targetValue * progress;

  const formatted = isDecimal
    ? current.toFixed(decimalPlaces)
    : Math.round(current).toLocaleString("en-IN");

  return (
    <div style={{ fontSize: 34, fontWeight: 800, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {formatted}
      {suffix}
    </div>
  );
};
