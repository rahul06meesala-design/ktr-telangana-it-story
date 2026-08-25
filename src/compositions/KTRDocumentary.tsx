import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import {
  shots,
  shotStartFrames,
  FPS,
  totalDurationInFrames,
} from "../data/videoData";
import { CinematicImage } from "../components/CinematicImage";
import { ParallaxImage } from "../components/ParallaxImage";
import { CinematicText } from "../components/CinematicText";
import { DocumentaryText } from "../components/DocumentaryText";
import { LowerThird } from "../components/LowerThird";
import { DataCard } from "../components/DataCard";
import { MapAnimation } from "../components/MapAnimation";
import { ParticleAtmosphere } from "../components/ParticleAtmosphere";
import { SceneTransition } from "../components/SceneTransition";
import { AudioManager } from "../components/AudioManager";

export { totalDurationInFrames };

/**
 * Real-person identification text shown via <LowerThird /> for shots that
 * require real/licensed footage of a named public official (per the
 * brief's own ASSET PRIORITY rule: "For KTR shots, use real/licensed
 * images or video supplied by the editor. Do not fabricate identifiable
 * event footage, quotes or political statements."). This project never
 * synthesizes their likeness -- it only lays out where a real photo/clip
 * goes and labels it factually.
 */
const LOWER_THIRD_BY_SHOT: Record<number, { name: string; role: string }> = {
  2: { name: "K. T. Rama Rao", role: "Former IT Minister, Telangana" },
  12: { name: "K. T. Rama Rao", role: "Former IT Minister, Telangana" },
  13: { name: "K. T. Rama Rao", role: "Former IT Minister, Telangana" },
  36: { name: "K. T. Rama Rao", role: "Former IT Minister, Telangana" },
  47: { name: "Duddilla Sridhar Babu", role: "IT, Electronics & Communications Minister, Telangana" },
  57: { name: "K. T. Rama Rao", role: "Former IT Minister, Telangana" },
  62: { name: "K. T. Rama Rao", role: "Former IT Minister, Telangana" },
};

const KTR_MISSING_ASSET_NOTE =
  "Real/licensed photo or video required — see ASSET_INSTRUCTIONS.md. Do not use AI-generated likeness of a real person.";

export const KTRDocumentary: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {shots.map((shot, i) => {
        const start = shotStartFrames[i];
        const durationInFrames = Math.round(shot.durationInSeconds * fps);
        const lowerThird = LOWER_THIRD_BY_SHOT[shot.shot];
        const showActCard = shot.isActOpener;

        return (
          <Sequence
            key={shot.shot}
            from={start}
            durationInFrames={durationInFrames}
            name={`Shot ${String(shot.shot).padStart(2, "0")} — ${shot.title}`}
          >
            <SceneTransition durationInFrames={durationInFrames}>
              {/* Base visual layer */}
              {shot.motionType === "parallaxPush" ? (
                <ParallaxImage
                  backgroundSrc={shot.assetPath}
                  foregroundSrc={shot.assetPath}
                  durationInFrames={durationInFrames}
                />
              ) : (
                <CinematicImage
                  src={shot.assetPath}
                  motionType={shot.motionType}
                  durationInFrames={durationInFrames}
                  placeholderLabel={
                    shot.realFootageRequired
                      ? KTR_MISSING_ASSET_NOTE
                      : shot.visual
                  }
                />
              )}

              {/* Ambient atmosphere for wide establishing/city shots */}
              {shot.assetCategory === "hyderabad" && (
                <ParticleAtmosphere count={16} opacity={0.12} />
              )}

              {/* Act chapter card (first ~1.6s of an act's opening shot) */}
              {showActCard && (
                <Sequence from={0} durationInFrames={Math.min(48, durationInFrames)}>
                  <CinematicText
                    eyebrow={`ACT ${shot.act}`}
                    title={shot.actTitle}
                  />
                </Sequence>
              )}

              {/* Location callout for the Telangana-formation act */}
              {shot.act === 3 && !showActCard && (
                <MapAnimation label="Telangana · Hyderabad" />
              )}

              {/* Real-person identification lower third */}
              {lowerThird && (
                <LowerThird name={lowerThird.name} role={lowerThird.role} />
              )}

              {/* Factual data-card overlay, only where the brief's source
                  narration states a concrete figure */}
              {shot.dataCard && <DataCard stats={shot.dataCard} />}

              {/* Optional short on-screen caption for the shot title on
                  non-act-opener, non-data-card shots that carry a discrete
                  year/institution beat (kept minimal by design) */}
              {!showActCard && !shot.dataCard && shot.shot === 45 && (
                <DocumentaryText text="2023" position="topLeft" />
              )}
            </SceneTransition>
          </Sequence>
        );
      })}

      <AudioManager />
    </AbsoluteFill>
  );
};

export const ktrDocumentaryFps = FPS;
