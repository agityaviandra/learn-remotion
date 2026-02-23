import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MacTerminal } from "./MacTerminal";

const COMPOSITION_WIDTH = 1280;
const COMPOSITION_HEIGHT = 700;

const ENTRANCE_DURATION_FRAMES = 18;

export const MasterComposition = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const entranceProgress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 300 },
    durationInFrames: ENTRANCE_DURATION_FRAMES,
    from: 1,
    to: 0,
  });

  const translateY = entranceProgress * COMPOSITION_HEIGHT;

  const rotateY = interpolate(
    frame,
    [0, durationInFrames - 1],
    [20, -20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#9CA3AF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1200,
      }}
    >
      <div
        style={{
          width: COMPOSITION_WIDTH,
          height: COMPOSITION_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${translateY}px) rotateX(20deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Sequence from={0} width={COMPOSITION_WIDTH} height={COMPOSITION_HEIGHT}>
          <MacTerminal />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
