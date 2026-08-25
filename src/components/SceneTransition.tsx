import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

interface SceneTransitionProps {
  /** Frames from the start of THIS shot's Sequence over which to fade in. */
  fadeInFrames?: number;
  /** Frames before the end of THIS shot's Sequence over which to fade out. */
  fadeOutFrames?: number;
  durationInFrames: number;
  children: React.ReactNode;
}

/**
 * Restrained cross-dissolve in/out wrapper for each shot. Documentary pacing
 * calls for simple dissolves, not "random transitions" (explicitly avoided
 * per the motion-graphics language section) -- no wipes, spins or flashy
 * cuts. Wrap each <Sequence> content in this component.
 */
export const SceneTransition: React.FC<SceneTransitionProps> = ({
  fadeInFrames = 12,
  fadeOutFrames = 12,
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = Math.min(1, frame / fadeInFrames);
  const framesFromEnd = durationInFrames - frame;
  const fadeOut = Math.min(1, framesFromEnd / fadeOutFrames);
  const opacity = Math.max(0, Math.min(fadeIn, fadeOut));

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
