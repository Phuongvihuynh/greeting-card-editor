"use client";

import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("./KonvaCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-[800px] h-[600px] bg-parchment border border-warm-brown/20 rounded">
      <p className="text-ink/50">Loading canvas...</p>
    </div>
  ),
});

export default function Canvas() {
  return <KonvaCanvas />;
}
