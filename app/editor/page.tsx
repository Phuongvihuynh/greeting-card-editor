"use client";

import dynamic from "next/dynamic";
import TypewriterToolbar from "@/components/typewriter/TypewriterToolbar";
import TypewriterStickerPanel from "@/components/typewriter/TypewriterStickerPanel";
import TypewriterImageUpload from "@/components/typewriter/TypewriterImageUpload";

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
  return (
    <div className="h-screen flex">
      <aside className="w-64 bg-parchment border-r border-warm-brown/20 flex flex-col overflow-y-auto">
        <TypewriterToolbar />
        <TypewriterStickerPanel />
        <TypewriterImageUpload />
      </aside>
      <main className="flex-1 bg-cream overflow-auto flex items-center justify-center">
        <TypewriterMode />
      </main>
    </div>
  );
}
