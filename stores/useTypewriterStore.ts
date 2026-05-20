import { create } from "zustand";
import { INK_COLORS, FONT_SIZES, FONT_FAMILIES, PAPER_TEMPLATES, PAPER, PAPER_SIZES } from "@/lib/typewriter-constants";
import type { TypewriterOverlay, FrameType } from "@/types/typewriter";

// Undoable state snapshot
interface Snapshot {
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
  lineSpacing: number;
  overlays: TypewriterOverlay[];
}

const MAX_HISTORY = 50;

interface TypewriterStore extends Snapshot {
  customBackgrounds: { id: string; src: string; name: string }[];
  selectedOverlayId: string | null;
  _past: Snapshot[];
  _future: Snapshot[];
  _saveSnapshot: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setText: (text: string) => void;
  setInkColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (id: string) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  setTextAlign: (align: "left" | "center" | "right") => void;
  setLineSpacing: (spacing: number) => void;
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

function getSnapshot(state: TypewriterStore): Snapshot {
  return {
    text: state.text,
    inkColor: state.inkColor,
    fontSize: state.fontSize,
    fontFamilyId: state.fontFamilyId,
    paperWidth: state.paperWidth,
    paperHeight: state.paperHeight,
    paperBackground: state.paperBackground,
    paperLineColor: state.paperLineColor,
    paperBackgroundImage: state.paperBackgroundImage,
    isBold: state.isBold,
    isItalic: state.isItalic,
    isUnderline: state.isUnderline,
    textAlign: state.textAlign,
    lineSpacing: state.lineSpacing,
    overlays: state.overlays,
  };
}

export const useTypewriterStore = create<TypewriterStore>((set, get) => ({
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
  lineSpacing: PAPER.lineSpacing,
  customBackgrounds: [],
  overlays: [],
  selectedOverlayId: null,
  _past: [],
  _future: [],
  canUndo: false,
  canRedo: false,

  _saveSnapshot: () => {
    const snap = getSnapshot(get());
    set((s) => ({
      _past: [...s._past.slice(-(MAX_HISTORY - 1)), snap],
      _future: [],
      canUndo: true,
      canRedo: false,
    }));
  },

  undo: () => {
    const { _past } = get();
    if (_past.length === 0) return;
    const prev = _past[_past.length - 1];
    const currentSnap = getSnapshot(get());
    set({
      ...prev,
      _past: _past.slice(0, -1),
      _future: [...get()._future, currentSnap],
      canUndo: _past.length - 1 > 0,
      canRedo: true,
    });
  },

  redo: () => {
    const { _future } = get();
    if (_future.length === 0) return;
    const next = _future[_future.length - 1];
    const currentSnap = getSnapshot(get());
    set({
      ...next,
      _past: [...get()._past, currentSnap],
      _future: _future.slice(0, -1),
      canUndo: true,
      canRedo: _future.length - 1 > 0,
    });
  },

  setText: (text) => set({ text }),
  setInkColor: (inkColor) => {
    get()._saveSnapshot();
    set({ inkColor });
  },
  setFontSize: (fontSize) => {
    get()._saveSnapshot();
    set({ fontSize });
  },
  setFontFamily: (fontFamilyId) => {
    get()._saveSnapshot();
    set({ fontFamilyId });
  },
  toggleBold: () => {
    get()._saveSnapshot();
    set((s) => ({ isBold: !s.isBold }));
  },
  toggleItalic: () => {
    get()._saveSnapshot();
    set((s) => ({ isItalic: !s.isItalic }));
  },
  toggleUnderline: () => {
    get()._saveSnapshot();
    set((s) => ({ isUnderline: !s.isUnderline }));
  },
  setTextAlign: (textAlign) => {
    get()._saveSnapshot();
    set({ textAlign });
  },
  setLineSpacing: (lineSpacing) => {
    get()._saveSnapshot();
    set({ lineSpacing });
  },
  setPaperSize: (sizeId) => {
    const size = PAPER_SIZES.find((s) => s.id === sizeId);
    if (size) {
      get()._saveSnapshot();
      set({ paperWidth: size.width, paperHeight: size.height });
    }
  },
  setPaperTemplate: (templateId) => {
    const tmpl = PAPER_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      get()._saveSnapshot();
      set({
        paperBackground: tmpl.background,
        paperLineColor: tmpl.lineColor,
        paperBackgroundImage: null,
      });
    }
  },
  setPaperBackgroundImage: (src) => {
    get()._saveSnapshot();
    set({ paperBackgroundImage: src });
  },

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

  addOverlay: (overlay) => {
    get()._saveSnapshot();
    set((state) => ({
      overlays: [...state.overlays, overlay],
      selectedOverlayId: overlay.id,
    }));
  },

  updateOverlay: (id, updates) =>
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),

  removeOverlay: (id) => {
    get()._saveSnapshot();
    set((state) => ({
      overlays: state.overlays.filter((o) => o.id !== id),
      selectedOverlayId:
        state.selectedOverlayId === id ? null : state.selectedOverlayId,
    }));
  },

  selectOverlay: (id) => set({ selectedOverlayId: id }),

  setOverlayFrame: (id, frame) => {
    get()._saveSnapshot();
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, frame } : o
      ),
    }));
  },

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
      lineSpacing: PAPER.lineSpacing,
      overlays: [],
      selectedOverlayId: null,
      _past: [],
      _future: [],
      canUndo: false,
      canRedo: false,
    }),
}));
