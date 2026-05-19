"use client";

import { useRef, useCallback } from "react";
import { PAPER } from "@/lib/typewriter-constants";
import { useTypewriterStore } from "@/stores/useTypewriterStore";
import CarriageReturn from "./CarriageReturn";
import TypewriterExport from "./TypewriterExport";
import OverlayLayer from "./OverlayLayer";

export default function TypewriterMode() {
  const {
    text,
    setText,
    inkColor,
    fontSize,
    paperBackground,
    paperLineColor,
    paperBackgroundImage,
    selectOverlay,
  } = useTypewriterStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCarriageReturn = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) {
      setText(text + "\n");
      return;
    }

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = text.slice(0, start);
    const after = text.slice(end);
    const newText = before + "\n" + after;
    setText(newText);

    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      ta.selectionStart = start + 1;
      ta.selectionEnd = start + 1;
      ta.focus();
    });
  }, [text, setText]);

  // Generate ruled-line background
  const ruledLinesBg = `repeating-linear-gradient(
    to bottom,
    transparent,
    transparent ${PAPER.lineSpacing - 1}px,
    ${paperLineColor} ${PAPER.lineSpacing - 1}px,
    ${paperLineColor} ${PAPER.lineSpacing}px
  )`;

  return (
    <div className="flex flex-col items-center">
      {/* Carriage */}
      <CarriageReturn onReturn={handleCarriageReturn} />

      {/* Paper */}
      <div
        className="relative border border-warm-brown/30 shadow-lg"
        style={{
          width: PAPER.width,
          height: PAPER.height,
          backgroundColor: paperBackground,
          backgroundImage: paperBackgroundImage
            ? `url(${paperBackgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => selectOverlay(null)}
      >
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: ruledLinesBg,
            backgroundPositionY: PAPER.paddingTop,
          }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none"
          style={{
            fontFamily: "var(--font-special-elite), monospace",
            fontSize,
            lineHeight: `${PAPER.lineSpacing}px`,
            color: inkColor,
            caretColor: inkColor,
            padding: `${PAPER.paddingTop}px ${PAPER.paddingRight}px 20px ${PAPER.paddingLeft}px`,
            zIndex: 10,
            position: "relative",
          }}
          placeholder="Start typing your letter..."
          spellCheck={false}
          autoFocus
        />

        {/* Overlay layer for stickers and images */}
        <OverlayLayer />
      </div>

      {/* Hidden export stage */}
      <TypewriterExport />
    </div>
  );
}
