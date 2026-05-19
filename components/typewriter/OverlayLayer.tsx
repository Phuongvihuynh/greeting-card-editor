"use client";

import { useTypewriterStore } from "@/stores/useTypewriterStore";
import DraggableOverlay from "./DraggableOverlay";

export default function OverlayLayer() {
  const overlays = useTypewriterStore((s) => s.overlays);
  const selectedOverlayId = useTypewriterStore((s) => s.selectedOverlayId);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20 }}
    >
      {overlays.map((overlay) => (
        <DraggableOverlay
          key={overlay.id}
          overlay={overlay}
          isSelected={overlay.id === selectedOverlayId}
        />
      ))}
    </div>
  );
}
