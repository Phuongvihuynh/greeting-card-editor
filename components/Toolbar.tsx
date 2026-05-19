"use client";

import { useCardStore } from "@/stores/useCardStore";
import type { CardElement } from "@/types/card";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Toolbar() {
  const { addElement, selectElement } = useCardStore();

  const addText = () => {
    const el: CardElement = {
      id: generateId(),
      type: "text",
      x: 350,
      y: 270,
      width: 200,
      height: 30,
      rotation: 0,
      content: "Your text here",
      fill: "#2C2C2C",
      fontSize: 24,
      fontFamily: "Arial",
    };
    addElement(el);
    selectElement(el.id);
  };

  const addRectangle = () => {
    const el: CardElement = {
      id: generateId(),
      type: "shape",
      shapeType: "rect",
      x: 350,
      y: 250,
      width: 100,
      height: 100,
      rotation: 0,
      fill: "#9CAF88",
    };
    addElement(el);
    selectElement(el.id);
  };

  const addCircle = () => {
    const el: CardElement = {
      id: generateId(),
      type: "shape",
      shapeType: "circle",
      x: 400,
      y: 300,
      width: 100,
      height: 100,
      rotation: 0,
      fill: "#F2C4C4",
    };
    addElement(el);
    selectElement(el.id);
  };

  return (
    <div className="p-4 border-b border-warm-brown/20">
      <h2 className="text-sm font-semibold text-warm-brown mb-3">Add Elements</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={addText}
          className="px-3 py-2 text-sm bg-warm-brown text-cream rounded hover:bg-warm-brown/90 transition-colors"
        >
          Add Text
        </button>
        <button
          onClick={addRectangle}
          className="px-3 py-2 text-sm bg-sage-green text-cream rounded hover:bg-sage-green/90 transition-colors"
        >
          Add Rectangle
        </button>
        <button
          onClick={addCircle}
          className="px-3 py-2 text-sm bg-soft-pink text-ink rounded hover:bg-soft-pink/90 transition-colors"
        >
          Add Circle
        </button>
      </div>
    </div>
  );
}
