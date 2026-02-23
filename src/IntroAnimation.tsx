import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MacTerminal } from "./MacTerminal";
import { Cursor } from "./Cursor";

// --- Composition Configuration ---
const COMPOSITION_WIDTH = 1280;
const COMPOSITION_HEIGHT = 720;
const FPS = 30;
const TOTAL_FRAMES = 90; // 3 seconds at 30fps

// --- Animation Timings (frames) ---
const LOGO_FADE_IN_END = 30;
const LOGO_SCALE_END = 30;
const TITLE_FADE_IN_START = 20;
const TITLE_FADE_IN_END = 50;
const BACKGROUND_FADE_IN_START = 60;
const BACKGROUND_FADE_IN_END = 90;

// --- Animation Configurations ---
const LOGO_SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 0.8,
  overshootClamping: true,
};

const TITLE_SPRING_CONFIG = {
  damping: 12,
  stiffness: 200,
  mass: 1,
  overshootClamping: true,
};

const BACKGROUND_ZOOM_CONFIG = {
  damping: 20,
  stiffness: 100,
  mass: 0.6,
  overshootClamping: true,
};

// --- Interfaces ---
interface LogoAnimationProps {
  opacity: number;
  scale: number;
}

interface TitleAnimationProps {
  translateY: number;
  opacity: number;
}

interface BackgroundAnimationProps {
  scale: number;
  opacity: number;
}

// --- Logo Component ---
const AnimatedLogo = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, LOGO_FADE_IN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, LOGO_SCALE_END], [0.5, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const settledScale = spring(frame, {
    to: 1,
    frame: LOGO_SCALE_END,
    config: LOGO_SPRING_CONFIG,
  });

  const finalScale = Math.min(scale, settledScale);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: \`translate(-50%, -50%) scale(\${finalScale})\`,
          opacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Simple SVG Logo Placeholder */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(102, 126, 234, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#FFFFFF",
              letterSpacing: 4,
            }}
          >
            A
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// --- Title Component ---
const AnimatedTitle = () => {
  const frame = useCurrentFrame();

  const translateY = interpolate(frame, [TITLE_FADE_IN_START, TITLE_FADE_IN_END], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(frame, [TITLE_FADE_IN_START, TITLE_FADE_IN_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: \`translate(-50%, calc(-50% + \${translateY}px))\`,
        opacity,
        textAlign: "center",
        width: "100%",
      }}
    >
      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: 8,
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          textShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        }}
      >
        PRODUCTION READY
      </h1>
    </div>
  );
};

// --- Background Effect Component ---
const BackgroundGlow = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [BACKGROUND_FADE_IN_START, BACKGROUND_FADE_IN_END],
    [1, 1.1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacity = interpolate(
    frame,
    [BACKGROUND_FADE_IN_START, BACKGROUND_FADE_IN_END],
    [0, 0.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0A",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: \`scale(\${scale})\`,
          opacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ambient glow effect */}
        <div
          style={{
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// --- Main Composition ---
export const IntroAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Sequence from={0} width={COMPOSITION_WIDTH} height={COMPOSITION_HEIGHT}>
      {/* Background Glow Effect */}
      <BackgroundGlow />

      {/* Logo Animation */}
      {frame <= LOGO_FADE_IN_END && <AnimatedLogo />}

      {/* Title Animation */}
      {frame >= TITLE_FADE_IN_START && <AnimatedTitle />}
    </Sequence>
  );
};

// --- Root Registration ---
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="IntroAnimation"
        component={IntroAnimation}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMPOSITION_WIDTH}
        height={COMPOSITION_HEIGHT}
        defaultProps={{
          // No default props needed for intro
        }}
      />
    </>
  );
};
