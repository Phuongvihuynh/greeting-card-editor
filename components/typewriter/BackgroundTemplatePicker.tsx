"use client";

import { useState } from "react";
import {
  BACKGROUND_TEMPLATES,
  BACKGROUND_CATEGORIES,
} from "@/lib/background-templates";
import { useTypewriterStore } from "@/stores/useTypewriterStore";

export default function BackgroundTemplatePicker() {
  const { paperBackgroundImage, setPaperBackgroundImage } =
    useTypewriterStore();
  const [category, setCategory] = useState<
    (typeof BACKGROUND_CATEGORIES)[number]
  >("All");

  const filtered =
    category === "All"
      ? BACKGROUND_TEMPLATES
      : BACKGROUND_TEMPLATES.filter((t) => t.category === category);

  return (
    <div>
      <h3 className="text-sm font-semibold text-ink mb-2">
        Background Templates
      </h3>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 mb-2">
        {BACKGROUND_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2 py-0.5 text-[10px] rounded-full transition-colors ${
              category === cat
                ? "bg-warm-brown text-cream"
                : "bg-warm-brown/10 text-warm-brown hover:bg-warm-brown/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {filtered.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setPaperBackgroundImage(tmpl.src)}
            title={tmpl.name}
            className="flex flex-col items-center gap-0.5 p-1 rounded border transition-colors"
            style={{
              borderColor:
                paperBackgroundImage === tmpl.src
                  ? "#8B6914"
                  : "rgba(139, 105, 20, 0.2)",
              borderWidth: paperBackgroundImage === tmpl.src ? 2 : 1,
            }}
          >
            <div
              className="w-full aspect-square rounded-sm overflow-hidden"
              style={{
                backgroundImage: `url(${tmpl.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: tmpl.preview,
              }}
            />
            <span className="text-[8px] text-ink/60 leading-tight truncate w-full text-center">
              {tmpl.name}
            </span>
          </button>
        ))}
      </div>

      {/* Clear background */}
      {paperBackgroundImage && (
        <button
          onClick={() => setPaperBackgroundImage(null)}
          className="w-full mt-2 py-1 px-2 rounded border border-warm-brown/30 text-ink/50 text-xs hover:bg-warm-brown/10 transition-colors"
        >
          Remove Background
        </button>
      )}
    </div>
  );
}
