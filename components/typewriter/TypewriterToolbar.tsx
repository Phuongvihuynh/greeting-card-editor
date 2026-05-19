"use client";

import { useRef } from "react";
import {
  INK_COLORS,
  FONT_SIZES,
  FONT_FAMILIES,
  PAPER_TEMPLATES,
  PAPER_SIZES,
} from "@/lib/typewriter-constants";
import { useTypewriterStore } from "@/stores/useTypewriterStore";

export default function TypewriterToolbar() {
  const {
    inkColor,
    setInkColor,
    fontSize,
    setFontSize,
    fontFamilyId,
    setFontFamily,
    paperWidth,
    paperHeight,
    paperBackground,
    paperBackgroundImage,
    isBold,
    isItalic,
    isUnderline,
    setPaperSize,
    setPaperTemplate,
    setPaperBackgroundImage,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    reset,
  } = useTypewriterStore();
  const bgInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPaperBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

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

      {/* Paper Size */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Paper Size</h3>
        <div className="flex flex-wrap gap-1">
          {PAPER_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => setPaperSize(size.id)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                paperWidth === size.width && paperHeight === size.height
                  ? "bg-warm-brown text-cream"
                  : "bg-warm-brown/10 text-warm-brown hover:bg-warm-brown/20"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-ink/40 mt-1">
          {paperWidth} &times; {paperHeight}px
        </p>
      </div>

      {/* Paper Color */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Paper Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {PAPER_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setPaperTemplate(tmpl.id)}
              title={tmpl.name}
              className="flex flex-col items-center gap-1 p-1 rounded border transition-colors"
              style={{
                borderColor:
                  !paperBackgroundImage && paperBackground === tmpl.background
                    ? "#8B6914"
                    : "rgba(139, 105, 20, 0.2)",
                borderWidth:
                  !paperBackgroundImage && paperBackground === tmpl.background
                    ? 2
                    : 1,
              }}
            >
              <div
                className="w-8 h-8 rounded-sm border border-warm-brown/10"
                style={{ backgroundColor: tmpl.background }}
              />
              <span className="text-[9px] text-ink/60 leading-tight">
                {tmpl.name}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => bgInputRef.current?.click()}
            className="flex-1 py-1.5 px-2 rounded border border-dashed border-warm-brown/40 text-ink/70 text-xs hover:bg-warm-brown/5 transition-colors"
          >
            + Upload Background
          </button>
          {paperBackgroundImage && (
            <button
              onClick={() => setPaperBackgroundImage(null)}
              className="py-1.5 px-2 rounded border border-warm-brown/30 text-ink/50 text-xs hover:bg-warm-brown/10 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={bgInputRef}
          type="file"
          accept="image/*"
          onChange={handleBgUpload}
          className="hidden"
        />
      </div>

      {/* Text Formatting */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Format</h3>
        <div className="flex gap-1">
          <button
            onClick={toggleBold}
            className={`flex-1 py-1.5 text-sm font-bold rounded border transition-colors ${
              isBold
                ? "bg-warm-brown text-cream border-warm-brown"
                : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
            }`}
          >
            B
          </button>
          <button
            onClick={toggleItalic}
            className={`flex-1 py-1.5 text-sm italic rounded border transition-colors ${
              isItalic
                ? "bg-warm-brown text-cream border-warm-brown"
                : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
            }`}
          >
            I
          </button>
          <button
            onClick={toggleUnderline}
            className={`flex-1 py-1.5 text-sm underline rounded border transition-colors ${
              isUnderline
                ? "bg-warm-brown text-cream border-warm-brown"
                : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
            }`}
          >
            U
          </button>
        </div>
      </div>

      {/* Font Family */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Font</h3>
        <div className="grid grid-cols-2 gap-1">
          {FONT_FAMILIES.map((font) => (
            <button
              key={font.id}
              onClick={() => setFontFamily(font.id)}
              className={`px-2 py-1.5 text-xs rounded border transition-colors truncate ${
                fontFamilyId === font.id
                  ? "bg-warm-brown text-cream border-warm-brown"
                  : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
              }`}
              style={{ fontFamily: font.css }}
            >
              {font.name}
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
