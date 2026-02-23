import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Cursor } from "./Cursor";

const FULL_TEXT = `npx skills install remotion-dev/skills

░█▀▀░█░█░▀█▀░█░░░█░░░█▀▀
░▀▀█░█▀▄░░█░░█░░░█░░░▀▀█
░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀





┌  skills
│
◇  Source: https://github.com/remotion-dev/skills.git
│
◇  Repository cloned
│
◇  Found 1 skill
│
●  Skill: remotion-best-practices
│
│  Best practices for Remotion - Video creation in React
│
◇  Detected 2 agents
│
└  Installation complete`;

const MS_PER_LINE = 50;
const CHAR_FRAMES = 2;

const LINES = FULL_TEXT.split("\n");
const COMMAND = LINES[0];
const COMMAND_FRAMES = COMMAND.length * CHAR_FRAMES;

const FONT_SIZE = 28;
const ASCII_ART_FONT_SIZE = 32;
const ASCII_ART_LINE_START = 2;
const ASCII_ART_LINE_END = 9;
const LINE_HEIGHT = 1.6;
const LINE_HEIGHT_PX = FONT_SIZE * LINE_HEIGHT;
const ASCII_ART_LINE_HEIGHT_PX = ASCII_ART_FONT_SIZE * LINE_HEIGHT;
const CONTENT_VIEWPORT_HEIGHT = 770;
const SCROLL_EXTRA_PX = 0;

const getLineHeightPx = (lineIndex: number) =>
  lineIndex >= ASCII_ART_LINE_START && lineIndex <= ASCII_ART_LINE_END
    ? ASCII_ART_LINE_HEIGHT_PX
    : LINE_HEIGHT_PX;

export const TerminalContent = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const framesPerLine = (MS_PER_LINE / 1000) * fps;

  const isTypewriterPhase = frame < COMMAND_FRAMES;
  const typedCommandChars = Math.min(
    COMMAND.length,
    Math.floor(frame / CHAR_FRAMES),
  );
  const typedCommand = COMMAND.slice(0, typedCommandChars);

  const staggeredLineCount =
    frame < COMMAND_FRAMES
      ? 0
      : Math.min(
        LINES.length - 1,
        Math.floor((frame - COMMAND_FRAMES) / framesPerLine),
      );
  const visibleLineCount = 1 + staggeredLineCount;
  const visibleText = isTypewriterPhase
    ? typedCommand
    : LINES[0] + "\n" + LINES.slice(1, 1 + staggeredLineCount).join("\n");

  const textHeight = Array.from({ length: visibleLineCount }, (_, i) =>
    getLineHeightPx(i),
  ).reduce((a, b) => a + b, 0);
  const bottomBufferPx = LINE_HEIGHT_PX * 3;
  const contentHeight = Math.max(
    LINE_HEIGHT_PX,
    textHeight + bottomBufferPx,
  );
  const scrollY = Math.min(
    0,
    CONTENT_VIEWPORT_HEIGHT - contentHeight - SCROLL_EXTRA_PX,
  );

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: "24px 28px",
        fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
        fontSize: FONT_SIZE,
        lineHeight: LINE_HEIGHT,
        color: "#1D1D1F",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          transform: `translateY(${scrollY}px)`,
        }}
      >
        <span
          style={{
            color: "#0066CC",
            marginRight: 12,
            flexShrink: 0,
          }}
        >
          ~
        </span>
        <span
          style={{
            color: "#FF3B30",
            marginRight: 12,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          $
        </span>
        {isTypewriterPhase ? (
          <span style={{ color: "#1D1D1F" }}>{visibleText}</span>
        ) : (
          <span style={{ color: "#1D1D1F", display: "flex", flexDirection: "column" }}>
            <span style={{ display: "block" }}>{LINES[0]}</span>
            {Array.from({ length: staggeredLineCount }, (_, i) => {
              const lineIndex = i + 1;
              const line = LINES[lineIndex];
              const isAsciiArt =
                lineIndex >= ASCII_ART_LINE_START &&
                lineIndex <= ASCII_ART_LINE_END;
              return (
                <span
                  key={lineIndex}
                  style={{
                    display: "block",
                    fontSize: isAsciiArt ? ASCII_ART_FONT_SIZE : FONT_SIZE,
                    lineHeight: LINE_HEIGHT,
                  }}
                >
                  {line}
                </span>
              );
            })}
          </span>
        )}
        <Cursor />
      </div>
    </div>
  );
};
