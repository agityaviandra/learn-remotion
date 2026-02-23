import React from "react";
import { AbsoluteFill } from "remotion";
import { TerminalContent } from "./TerminalContent";

export const MacTerminal = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: 50,
      }}
    >
      <div
        style={{
          width: 1000,
          height: 560,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Terminal Window Header */}
        <div
          style={{
            height: 56,
            backgroundColor: "#F8F8FA",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Traffic Light Buttons */}
          <div
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#FF5F57",
                border: "0.5px solid rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#FEBC2E",
                border: "0.5px solid rgba(0, 0, 0, 0.1)",
              }}
            />
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "#28C840",
                border: "0.5px solid rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>

          {/* Window Title */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 500,
              color: "#1D1D1F",
              letterSpacing: 0.2,
            }}
          >
            terminal — -zsh
          </div>

          {/* Spacer to balance the traffic lights */}
          <div style={{ width: 44 }} />
        </div>

        <TerminalContent />

      </div>
    </AbsoluteFill>
  );
};
