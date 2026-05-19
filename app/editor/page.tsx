"use client";

import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import StickerPanel from "@/components/StickerPanel";
import PropertiesPanel from "@/components/PropertiesPanel";

export default function EditorPage() {
  return (
    <div className="h-screen flex">
      <aside className="w-64 bg-parchment border-r border-warm-brown/20 flex flex-col overflow-y-auto">
        <Toolbar />
        <StickerPanel />
        <PropertiesPanel />
      </aside>
      <main className="flex-1 bg-cream overflow-auto flex items-center justify-center">
        <Canvas />
      </main>
    </div>
  );
}
