"use client";

import { useRef } from "react";
import { useCardStore } from "@/stores/useCardStore";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function PropertiesPanel() {
  const { card, selectedElementId, updateElement, removeElement, selectElement } =
    useCardStore();
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const selected = card.elements.find((el) => el.id === selectedElementId);

  if (!selected) {
    return (
      <div className="p-4 text-sm text-ink/50">
        Select an element to edit its properties.
      </div>
    );
  }

  const update = (updates: Record<string, unknown>) => {
    updateElement(selected.id, updates);
  };

  const handleDelete = () => {
    removeElement(selected.id);
    selectElement(null);
  };

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (replaceInputRef.current) replaceInputRef.current.value = "";
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Please select an image under 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      update({ src: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 flex flex-col gap-3 text-sm">
      <h2 className="font-semibold text-warm-brown">Properties</h2>

      <fieldset className="flex gap-2">
        <label className="flex flex-col flex-1">
          <span className="text-ink/60 text-xs">X</span>
          <input
            type="number"
            value={Math.round(selected.x)}
            onChange={(e) => update({ x: Number(e.target.value) })}
            className="border border-warm-brown/20 rounded px-2 py-1 bg-cream"
          />
        </label>
        <label className="flex flex-col flex-1">
          <span className="text-ink/60 text-xs">Y</span>
          <input
            type="number"
            value={Math.round(selected.y)}
            onChange={(e) => update({ y: Number(e.target.value) })}
            className="border border-warm-brown/20 rounded px-2 py-1 bg-cream"
          />
        </label>
      </fieldset>

      <fieldset className="flex gap-2">
        <label className="flex flex-col flex-1">
          <span className="text-ink/60 text-xs">W</span>
          <input
            type="number"
            value={Math.round(selected.width)}
            onChange={(e) => update({ width: Number(e.target.value) })}
            className="border border-warm-brown/20 rounded px-2 py-1 bg-cream"
          />
        </label>
        <label className="flex flex-col flex-1">
          <span className="text-ink/60 text-xs">H</span>
          <input
            type="number"
            value={Math.round(selected.height)}
            onChange={(e) => update({ height: Number(e.target.value) })}
            className="border border-warm-brown/20 rounded px-2 py-1 bg-cream"
          />
        </label>
      </fieldset>

      <label className="flex flex-col">
        <span className="text-ink/60 text-xs">Rotation</span>
        <input
          type="number"
          value={Math.round(selected.rotation)}
          onChange={(e) => update({ rotation: Number(e.target.value) })}
          className="border border-warm-brown/20 rounded px-2 py-1 bg-cream"
        />
      </label>

      {selected.type === "image" && selected.src && (
        <div className="flex flex-col gap-2">
          <span className="text-ink/60 text-xs">Image Preview</span>
          <img
            src={selected.src}
            alt="Element preview"
            className="w-full rounded border border-warm-brown/20 object-contain max-h-32"
          />
          <button
            onClick={() => replaceInputRef.current?.click()}
            className="px-3 py-2 text-sm bg-warm-brown/70 text-cream rounded hover:bg-warm-brown/60 transition-colors"
          >
            Replace Image
          </button>
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            onChange={handleReplaceImage}
            className="hidden"
          />
        </div>
      )}

      {selected.type !== "image" && (
        <label className="flex flex-col">
          <span className="text-ink/60 text-xs">Color</span>
          <input
            type="color"
            value={selected.fill || "#000000"}
            onChange={(e) => update({ fill: e.target.value })}
            className="h-8 w-full border border-warm-brown/20 rounded bg-cream cursor-pointer"
          />
        </label>
      )}

      {selected.type === "text" && (
        <>
          <label className="flex flex-col">
            <span className="text-ink/60 text-xs">Text Content</span>
            <textarea
              value={selected.content || ""}
              onChange={(e) => update({ content: e.target.value })}
              rows={3}
              className="border border-warm-brown/20 rounded px-2 py-1 bg-cream resize-none"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-ink/60 text-xs">Font Size</span>
            <input
              type="number"
              value={selected.fontSize || 24}
              onChange={(e) => update({ fontSize: Number(e.target.value) })}
              className="border border-warm-brown/20 rounded px-2 py-1 bg-cream"
            />
          </label>
        </>
      )}

      <button
        onClick={handleDelete}
        className="mt-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Delete Element
      </button>
    </div>
  );
}
