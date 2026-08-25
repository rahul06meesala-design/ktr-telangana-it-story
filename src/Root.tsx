import React from "react";
import { Composition } from "remotion";
import { KTRDocumentary, totalDurationInFrames } from "./compositions/KTRDocumentary";
import { FPS } from "./data/videoData";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="KTRDocumentary"
        component={KTRDocumentary}
        durationInFrames={totalDurationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
