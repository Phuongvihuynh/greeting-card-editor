"use client";

import { useRef } from "react";
import { useCardStore } from "@/stores/useCardStore";
import type { CardElement } from "@/types/card";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const MAX_DIMENSION = 300;

export default function Toolbar() {
  const { addElement, selectElement } = useCardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Please select an image under 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
          const scale = MAX_DIMENSION / Math.max(w, h);
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }
        const el: CardElement = {
          id: generateId(),
          type: "image",
          x: (800 - w) / 2,
          y: (600 - h) / 2,
          width: w,
          height: h,
          rotation: 0,
          src: dataUrl,
        };
        addElement(el);
        selectElement(el.id);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
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
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2 text-sm bg-warm-brown/70 text-cream rounded hover:bg-warm-brown/60 transition-colors"
        >
          Add Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
