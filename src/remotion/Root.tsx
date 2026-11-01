import React from "react";
import { Composition } from "remotion";
import { LaunchVideo } from "./LaunchVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LaunchVideoLandscape"
        component={LaunchVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          aspectRatio: "16:9",
        }}
      />
      <Composition
        id="LaunchVideoVertical"
        component={LaunchVideo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          aspectRatio: "9:16",
        }}
      />
    </>
  );
};
