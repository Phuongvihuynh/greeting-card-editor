"use client";

import dynamic from "next/dynamic";
import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import StickerPanel from "@/components/StickerPanel";
import PropertiesPanel from "@/components/PropertiesPanel";
import TypewriterToolbar from "@/components/typewriter/TypewriterToolbar";
import TypewriterStickerPanel from "@/components/typewriter/TypewriterStickerPanel";
import TypewriterImageUpload from "@/components/typewriter/TypewriterImageUpload";
import { useCardStore } from "@/stores/useCardStore";

const TypewriterMode = dynamic(
  () => import("@/components/typewriter/TypewriterMode"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-[700px] h-[520px] bg-parchment border border-warm-brown/20 rounded">
        <p className="text-ink/50">Loading typewriter...</p>
      </div>
    ),
  }
);

export default function EditorPage() {
  const editorMode = useCardStore((s) => s.editorMode);
  const setEditorMode = useCardStore((s) => s.setEditorMode);

  return (
    <div className="h-screen flex">
      <aside className="w-64 bg-parchment border-r border-warm-brown/20 flex flex-col overflow-y-auto">
        {/* Mode Toggle */}
        <div className="p-4 border-b border-warm-brown/20">
          <div className="flex rounded overflow-hidden border border-warm-brown/30">
            <button
              onClick={() => setEditorMode("canvas")}
              className={`flex-1 py-1.5 text-sm font-medium transition-colors ${
                editorMode === "canvas"
                  ? "bg-warm-brown text-cream"
                  : "bg-cream text-ink/70 hover:bg-warm-brown/10"
              }`}
            >
              Canvas
            </button>
            <button
              onClick={() => setEditorMode("typewriter")}
              className={`flex-1 py-1.5 text-sm font-medium transition-colors ${
                editorMode === "typewriter"
                  ? "bg-warm-brown text-cream"
                  : "bg-cream text-ink/70 hover:bg-warm-brown/10"
              }`}
            >
              Typewriter
            </button>
          </div>
        </div>

        {/* Mode-specific sidebar */}
        {editorMode === "canvas" ? (
          <>
            <Toolbar />
            <StickerPanel />
            <PropertiesPanel />
          </>
        ) : (
          <>
            <TypewriterToolbar />
            <TypewriterStickerPanel />
            <TypewriterImageUpload />
          </>
        )}
      </aside>
      <main className="flex-1 bg-cream overflow-auto flex items-center justify-center">
        {editorMode === "canvas" ? <Canvas /> : <TypewriterMode />}
      </main>
    </div>
  );
}
