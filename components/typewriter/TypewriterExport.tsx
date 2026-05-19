"use client";

import { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text, Line } from "react-konva";
import { PAPER } from "@/lib/typewriter-constants";
import { useTypewriterStore } from "@/stores/useTypewriterStore";
import OverlayExportLayer from "./OverlayExportLayer";
import type Konva from "konva";

export default function TypewriterExport() {
  const stageRef = useRef<Konva.Stage>(null);
  const { text, inkColor, fontSize, overlays, paperBackground, paperLineColor } =
    useTypewriterStore();

  useEffect(() => {
    const handleExport = async () => {
      const stage = stageRef.current;
      if (!stage) return;

      // Wait for font and overlay images to be available
      await document.fonts.ready;

      // Give overlay images time to load in the Konva layer
      if (overlays.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const dataUrl = stage.toDataURL({ pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "typewriter-letter.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    window.addEventListener("typewriter:export", handleExport);
    return () => window.removeEventListener("typewriter:export", handleExport);
  }, [overlays.length]);

  // Generate ruled lines
  const lines: number[] = [];
  for (
    let y = PAPER.paddingTop + PAPER.lineSpacing;
    y < PAPER.height;
    y += PAPER.lineSpacing
  ) {
    lines.push(y);
  }

  return (
    <div style={{ position: "fixed", left: -9999, top: -9999, pointerEvents: "none" }}>
      <Stage ref={stageRef} width={PAPER.width} height={PAPER.height}>
        <Layer>
          {/* Paper background */}
          <Rect
            x={0}
            y={0}
            width={PAPER.width}
            height={PAPER.height}
            fill={paperBackground}
          />

          {/* Ruled lines */}
          {lines.map((y) => (
            <Line
              key={y}
              points={[0, y, PAPER.width, y]}
              stroke={paperLineColor}
              strokeWidth={1}
            />
          ))}

          {/* Text */}
          <Text
            x={PAPER.paddingLeft}
            y={PAPER.paddingTop}
            width={PAPER.width - PAPER.paddingLeft - PAPER.paddingRight}
            text={text}
            fontSize={fontSize}
            fontFamily="Special Elite, monospace"
            fill={inkColor}
            lineHeight={PAPER.lineSpacing / fontSize}
          />

          {/* Overlays (stickers + images with frames) */}
          <OverlayExportLayer />
        </Layer>
      </Stage>
    </div>
  );
}
