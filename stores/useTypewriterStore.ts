import { create } from "zustand";
import { INK_COLORS, FONT_SIZES } from "@/lib/typewriter-constants";
import type { TypewriterOverlay, FrameType } from "@/types/typewriter";

interface TypewriterStore {
  text: string;
  inkColor: string;
  fontSize: number;
  overlays: TypewriterOverlay[];
  selectedOverlayId: string | null;
  setText: (text: string) => void;
  setInkColor: (color: string) => void;
  setFontSize: (size: number) => void;
  addOverlay: (overlay: TypewriterOverlay) => void;
  updateOverlay: (id: string, updates: Partial<TypewriterOverlay>) => void;
  removeOverlay: (id: string) => void;
  selectOverlay: (id: string | null) => void;
  setOverlayFrame: (id: string, frame: FrameType) => void;
  reset: () => void;
}

export const useTypewriterStore = create<TypewriterStore>((set) => ({
  text: "",
  inkColor: INK_COLORS[0].value,
  fontSize: FONT_SIZES[3],
  overlays: [],
  selectedOverlayId: null,

  setText: (text) => set({ text }),
  setInkColor: (inkColor) => set({ inkColor }),
  setFontSize: (fontSize) => set({ fontSize }),

  addOverlay: (overlay) =>
    set((state) => ({
      overlays: [...state.overlays, overlay],
      selectedOverlayId: overlay.id,
    })),

  updateOverlay: (id, updates) =>
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),

  removeOverlay: (id) =>
    set((state) => ({
      overlays: state.overlays.filter((o) => o.id !== id),
      selectedOverlayId:
        state.selectedOverlayId === id ? null : state.selectedOverlayId,
    })),

  selectOverlay: (id) => set({ selectedOverlayId: id }),

  setOverlayFrame: (id, frame) =>
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, frame } : o
      ),
    })),

  reset: () =>
    set({
      text: "",
      inkColor: INK_COLORS[0].value,
      fontSize: FONT_SIZES[3],
      overlays: [],
      selectedOverlayId: null,
    }),
}));
