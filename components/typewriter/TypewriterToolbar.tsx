"use client";

import { INK_COLORS, FONT_SIZES } from "@/lib/typewriter-constants";
import { useTypewriterStore } from "@/stores/useTypewriterStore";

export default function TypewriterToolbar() {
  const { inkColor, setInkColor, fontSize, setFontSize, reset } =
    useTypewriterStore();

  const handleDownload = () => {
    window.dispatchEvent(new CustomEvent("typewriter:export"));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Ink Color */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Ink Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {INK_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setInkColor(color.value)}
              className="flex flex-col items-center gap-1 p-1.5 rounded border transition-colors"
              style={{
                borderColor:
                  inkColor === color.value
                    ? color.value
                    : "rgba(139, 105, 20, 0.2)",
                backgroundColor:
                  inkColor === color.value
                    ? "rgba(139, 105, 20, 0.08)"
                    : "transparent",
              }}
            >
              <div
                className="w-5 h-5 rounded-full border border-warm-brown/20"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-[10px] text-ink/70">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Font Size</h3>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full px-2 py-1.5 rounded border border-warm-brown/20 bg-cream text-ink text-sm"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* Download */}
      <button
        onClick={handleDownload}
        className="w-full py-2 px-3 rounded bg-warm-brown text-cream text-sm font-medium hover:bg-warm-brown/90 transition-colors"
      >
        Download as Image
      </button>

      {/* Clear */}
      <button
        onClick={reset}
        className="w-full py-2 px-3 rounded border border-warm-brown/30 text-ink/70 text-sm hover:bg-warm-brown/10 transition-colors"
      >
        Clear Letter
      </button>
    </div>
  );
}
