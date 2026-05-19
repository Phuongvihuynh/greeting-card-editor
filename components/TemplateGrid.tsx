"use client";

import { useRouter } from "next/navigation";
import { useCardStore } from "@/stores/useCardStore";
import { templates } from "@/lib/templates";
import type { CardTemplate } from "@/lib/templates";

/** Small inline preview that renders colored shapes to hint at the template layout. */
function TemplatePreview({ template }: { template: CardTemplate }) {
  const { card } = template;
  const scaleX = 1 / (card.width / 240);
  const scaleY = 1 / (card.height / 160);

  return (
    <div
      className="w-full aspect-[4/3] rounded-lg overflow-hidden relative"
      style={{ backgroundColor: card.backgroundColor }}
    >
      {card.elements.map((el) => {
        const left = el.x * scaleX;
        const top = el.y * scaleY;
        const width = el.width * scaleX;
        const height = el.height * scaleY;

        if (el.type === "text") {
          const fontSize = Math.max(6, (el.fontSize || 24) * Math.min(scaleX, scaleY));
          return (
            <span
              key={el.id}
              className="absolute leading-tight font-serif"
              style={{
                left,
                top,
                width,
                fontSize,
                color: el.fill || "#2C2C2C",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {el.content}
            </span>
          );
        }

        const isCircle = el.shapeType === "circle";
        return (
          <span
            key={el.id}
            className="absolute"
            style={{
              left: isCircle ? left - width / 2 : left,
              top: isCircle ? top - height / 2 : top,
              width,
              height,
              backgroundColor: el.fill || "#9CAF88",
              borderRadius: isCircle ? "50%" : 2,
              transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

export default function TemplateGrid() {
  const router = useRouter();
  const loadTemplate = useCardStore((s) => s.loadTemplate);

  const handleSelect = (template: CardTemplate) => {
    loadTemplate(template.card);
    router.push("/editor");
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl w-full px-4">
      {templates.map((t) => (
        <button
          key={t.templateId}
          onClick={() => handleSelect(t)}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-warm-brown/20 bg-parchment hover:border-warm-brown/50 hover:shadow-md transition-all cursor-pointer"
        >
          <TemplatePreview template={t} />
          <span className="text-sm font-medium text-warm-brown">{t.name}</span>
        </button>
      ))}
    </div>
  );
}
