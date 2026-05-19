"use client";

import { useCallback } from "react";
import { useOverlayDrag } from "@/hooks/useOverlayDrag";
import { useTypewriterStore } from "@/stores/useTypewriterStore";
import { getFrameStyles } from "@/lib/frame-templates";
import type { TypewriterOverlay } from "@/types/typewriter";

interface DraggableOverlayProps {
  overlay: TypewriterOverlay;
  isSelected: boolean;
}

export default function DraggableOverlay({
  overlay,
  isSelected,
}: DraggableOverlayProps) {
  const { updateOverlay, removeOverlay, selectOverlay } = useTypewriterStore();

  const onDragEnd = useCallback(
    (x: number, y: number) => {
      updateOverlay(overlay.id, { x, y });
    },
    [overlay.id, updateOverlay]
  );

  const { elementRef, onPointerDown, onPointerMove, onPointerUp } =
    useOverlayDrag({ onDragEnd });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      selectOverlay(overlay.id);
    },
    [overlay.id, selectOverlay]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      removeOverlay(overlay.id);
    },
    [overlay.id, removeOverlay]
  );

  const handleDeletePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Prevent the parent drag handler from capturing this event
      e.stopPropagation();
    },
    []
  );

  const frameStyles =
    overlay.frame !== "none"
      ? getFrameStyles(overlay.frame, overlay.width, overlay.height)
      : {};

  return (
    <div
      ref={elementRef}
      onClick={handleClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute pointer-events-auto select-none"
      style={{
        left: overlay.x,
        top: overlay.y,
        cursor: "grab",
        touchAction: "none",
        outline: isSelected ? "2px solid #8B6914" : "none",
        outlineOffset: 2,
      }}
    >
      {/* Frame wrapper */}
      <div style={frameStyles}>
        {/* Tape corner decorations */}
        {overlay.frame === "tape-corners" && (
          <>
            <div
              className="absolute -top-2 -left-2 w-8 h-4 bg-amber-100/70 rotate-[-25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
            <div
              className="absolute -top-2 -right-2 w-8 h-4 bg-amber-100/70 rotate-[25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
            <div
              className="absolute -bottom-2 -left-2 w-8 h-4 bg-amber-100/70 rotate-[25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
            <div
              className="absolute -bottom-2 -right-2 w-8 h-4 bg-amber-100/70 rotate-[-25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
          </>
        )}

        <img
          src={overlay.src}
          alt=""
          draggable={false}
          style={{
            width: overlay.width,
            height: overlay.height,
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Delete button */}
      {isSelected && (
        <button
          onClick={handleDelete}
          onPointerDown={handleDeletePointerDown}
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors shadow"
          style={{ pointerEvents: "auto" }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
