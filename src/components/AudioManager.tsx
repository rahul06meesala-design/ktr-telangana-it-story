import React from "react";
import { Audio, Sequence, useVideoConfig } from "remotion";
import { shots, shotStartFrames, NARRATION_AUDIO_SRC, MUSIC_BED_SRC } from "../data/videoData";

interface AudioManagerProps {
  /** Set to false to render silently (e.g. before the WAV/MP3 assets exist). */
  enableNarration?: boolean;
  enableMusic?: boolean;
  enableSfx?: boolean;
  /** 0..1 music bed level under narration (ducked). */
  musicDuckedVolume?: number;
}

/**
 * Central audio track for the documentary:
 *  - telugu-narration.wav plays once, full length, as the MASTER TIMELINE
 *    (per the brief: do not compress narration to fit shot timings --
 *    instead, once you have the real file, re-time `durationInSeconds` in
 *    videoData.ts to match it).
 *  - background.mp3 plays under it at a permanently ducked volume so the
 *    narration is always intelligible (per "Music must duck under
 *    narration").
 *  - each shot's sfxCue plays quietly for that shot's duration only.
 */
export const AudioManager: React.FC<AudioManagerProps> = ({
  enableNarration = true,
  enableMusic = true,
  enableSfx = true,
  musicDuckedVolume = 0.12,
}) => {
  const { fps } = useVideoConfig();

  return (
    <>
      {enableMusic && (
        <Audio src={MUSIC_BED_SRC} volume={musicDuckedVolume} loop />
      )}

      {enableNarration && <Audio src={NARRATION_AUDIO_SRC} volume={1} />}

      {enableSfx &&
        shots.map((shot, i) => {
          if (!shot.sfxCue) return null;
          const start = shotStartFrames[i];
          const durationInFrames = Math.round(shot.durationInSeconds * fps);
          return (
            <Sequence key={shot.shot} from={start} durationInFrames={durationInFrames}>
              <Audio src={shot.sfxCue} volume={0.06} />
            </Sequence>
          );
        })}
    </>
  );
};
