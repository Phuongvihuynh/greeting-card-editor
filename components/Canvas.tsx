"use client";

import dynamic from "next/dynamic";

const Stage = dynamic(() => import("react-konva").then((mod) => mod.Stage), {
  ssr: false,
});
const Layer = dynamic(() => import("react-konva").then((mod) => mod.Layer), {
  ssr: false,
});
const Rect = dynamic(() => import("react-konva").then((mod) => mod.Rect), {
  ssr: false,
});

import { useCardStore } from "@/stores/useCardStore";

export default function Canvas() {
  const { card } = useCardStore();

  return (
    <div className="flex items-center justify-center p-8">
      <Stage width={card.width} height={card.height}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={card.width}
            height={card.height}
            fill={card.backgroundColor}
          />
        </Layer>
      </Stage>
    </div>
  );
}
