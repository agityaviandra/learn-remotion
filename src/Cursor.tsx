import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const CURSOR_BLINK_FRAMES = 16;

export const Cursor = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame % CURSOR_BLINK_FRAMES,
    [0, CURSOR_BLINK_FRAMES / 2, CURSOR_BLINK_FRAMES],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        width: 4,
        height: 38,
        backgroundColor: "#0066CC",
        marginLeft: 4,
        marginTop: 2,
        borderRadius: 2,
        opacity,
      }}
    />
  );
};
