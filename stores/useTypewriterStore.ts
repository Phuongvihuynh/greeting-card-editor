import { create } from "zustand";
import { INK_COLORS, FONT_SIZES, FONT_FAMILIES, PAPER_TEMPLATES, PAPER, PAPER_SIZES } from "@/lib/typewriter-constants";
import type { TypewriterOverlay, FrameType } from "@/types/typewriter";

interface TypewriterStore {
  text: string;
  inkColor: string;
  fontSize: number;
  fontFamilyId: string;
  paperWidth: number;
  paperHeight: number;
  paperBackground: string;
  paperLineColor: string;
  paperBackgroundImage: string | null;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlign: "left" | "center" | "right";
  customBackgrounds: { id: string; src: string; name: string }[];
  overlays: TypewriterOverlay[];
  selectedOverlayId: string | null;
  setText: (text: string) => void;
  setInkColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (id: string) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  setTextAlign: (align: "left" | "center" | "right") => void;
  setPaperSize: (sizeId: string) => void;
  setPaperTemplate: (templateId: string) => void;
  setPaperBackgroundImage: (src: string | null) => void;
  addCustomBackground: (src: string, name: string) => void;
  removeCustomBackground: (id: string) => void;
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
  fontFamilyId: FONT_FAMILIES[0].id,
  paperWidth: PAPER.width,
  paperHeight: PAPER.height,
  paperBackground: PAPER_TEMPLATES[0].background,
  paperLineColor: PAPER_TEMPLATES[0].lineColor,
  paperBackgroundImage: null,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  textAlign: "left" as const,
  customBackgrounds: [],
  overlays: [],
  selectedOverlayId: null,

  setText: (text) => set({ text }),
  setInkColor: (inkColor) => set({ inkColor }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontFamily: (fontFamilyId) => set({ fontFamilyId }),
  toggleBold: () => set((s) => ({ isBold: !s.isBold })),
  toggleItalic: () => set((s) => ({ isItalic: !s.isItalic })),
  toggleUnderline: () => set((s) => ({ isUnderline: !s.isUnderline })),
  setTextAlign: (textAlign) => set({ textAlign }),
  setPaperSize: (sizeId) => {
    const size = PAPER_SIZES.find((s) => s.id === sizeId);
    if (size) {
      set({ paperWidth: size.width, paperHeight: size.height });
    }
  },
  setPaperTemplate: (templateId) => {
    const tmpl = PAPER_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      set({
        paperBackground: tmpl.background,
        paperLineColor: tmpl.lineColor,
        paperBackgroundImage: null,
      });
    }
  },
  setPaperBackgroundImage: (src) => set({ paperBackgroundImage: src }),

  addCustomBackground: (src, name) =>
    set((state) => ({
      customBackgrounds: [
        ...state.customBackgrounds,
        { id: `custom-${Date.now()}`, src, name },
      ],
    })),

  removeCustomBackground: (id) =>
    set((state) => ({
      customBackgrounds: state.customBackgrounds.filter((bg) => bg.id !== id),
      paperBackgroundImage:
        state.customBackgrounds.find((bg) => bg.id === id)?.src === state.paperBackgroundImage
          ? null
          : state.paperBackgroundImage,
    })),

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
      fontFamilyId: FONT_FAMILIES[0].id,
      paperWidth: PAPER.width,
      paperHeight: PAPER.height,
      paperBackground: PAPER_TEMPLATES[0].background,
      paperLineColor: PAPER_TEMPLATES[0].lineColor,
      paperBackgroundImage: null,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      textAlign: "left" as const,
      overlays: [],
      selectedOverlayId: null,
    }),
}));
