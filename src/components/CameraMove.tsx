import { interpolate, Easing } from "remotion";
import type { MotionType } from "../data/videoData";

export interface CameraTransform {
  scale: number;
  translateX: number;
  translateY: number;
}

/**
 * Returns a scale/translate transform for the given frame progress (0..1)
 * and MotionType. Every motion type animates DIFFERENTLY on purpose --
 * per the brief: "Do not make every shot move identically."
 *
 * progress: 0 at shot start, 1 at shot end (post easing already applied
 * by the caller if desired -- here we apply our own easing per style).
 */
export const getCameraTransform = (
  motionType: MotionType,
  rawProgress: number
): CameraTransform => {
  const p = Math.max(0, Math.min(1, rawProgress));

  switch (motionType) {
    case "pushIn": {
      // Wide skyline -> slow push toward the subject.
      const eased = Easing.bezier(0.25, 0.1, 0.25, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.0, 1.12]);
      return { scale, translateX: 0, translateY: 0 };
    }
    case "pullOut": {
      const eased = Easing.bezier(0.25, 0.1, 0.25, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.14, 1.0]);
      return { scale, translateX: 0, translateY: 0 };
    }
    case "parallaxPush": {
      // KTR portrait / speaking -> subtle push + gentle parallax drift.
      const eased = Easing.bezier(0.33, 0, 0.2, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.02, 1.09]);
      const translateX = interpolate(eased, [0, 1], [0, -10]);
      return { scale, translateX, translateY: 0 };
    }
    case "verticalReveal": {
      // Tall landmark -> slow vertical reveal.
      const eased = Easing.bezier(0.4, 0, 0.2, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.1, 1.02]);
      const translateY = interpolate(eased, [0, 1], [26, -6]);
      return { scale, translateX: 0, translateY };
    }
    case "forwardMove": {
      // Road / traffic -> forward-feeling push with slight vertical drift.
      const eased = Easing.bezier(0.2, 0, 0.2, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.0, 1.16]);
      const translateY = interpolate(eased, [0, 1], [4, -10]);
      return { scale, translateX: 0, translateY };
    }
    case "lateralMove": {
      // Meeting / conference -> gentle lateral drift.
      const eased = Easing.bezier(0.45, 0, 0.55, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.06, 1.1]);
      const translateX = interpolate(eased, [0, 1], [-14, 14]);
      return { scale, translateX, translateY: 0 };
    }
    case "slowPan": {
      // Group / montage -> slow crop/pan across the frame.
      const eased = Easing.linear(p);
      const scale = interpolate(eased, [0, 1], [1.08, 1.08]);
      const translateX = interpolate(eased, [0, 1], [12, -12]);
      const translateY = interpolate(eased, [0, 1], [-4, 4]);
      return { scale, translateX, translateY };
    }
    case "kenBurns":
    default: {
      const eased = Easing.bezier(0.42, 0, 0.58, 1)(p);
      const scale = interpolate(eased, [0, 1], [1.03, 1.13]);
      const translateX = interpolate(eased, [0, 1], [-6, 8]);
      const translateY = interpolate(eased, [0, 1], [6, -8]);
      return { scale, translateX, translateY };
    }
  }
};
