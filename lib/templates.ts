import type { Card, CardElement } from "@/types/card";

export interface CardTemplate {
  templateId: string;
  name: string;
  thumbnail: string; // description of the preview visual
  card: Card;
}

function el(
  overrides: Partial<CardElement> & Pick<CardElement, "id" | "type" | "x" | "y" | "width" | "height">
): CardElement {
  return {
    rotation: 0,
    ...overrides,
  } as CardElement;
}

const now = new Date().toISOString();

export const templates: CardTemplate[] = [
  {
    templateId: "birthday",
    name: "Birthday",
    thumbnail: "Warm yellow background with confetti shapes and birthday text",
    card: {
      id: "",
      title: "Birthday Card",
      width: 800,
      height: 600,
      backgroundColor: "#FFF3C4",
      elements: [
        el({ id: "b1", type: "text", x: 200, y: 60, width: 400, height: 60, content: "Happy Birthday!", fontSize: 48, fontFamily: "Georgia", fill: "#8B6914" }),
        el({ id: "b2", type: "text", x: 250, y: 480, width: 300, height: 30, content: "Wishing you a wonderful day!", fontSize: 20, fontFamily: "Georgia", fill: "#8B6914" }),
        // confetti circles
        el({ id: "b3", type: "shape", shapeType: "circle", x: 120, y: 180, width: 30, height: 30, fill: "#F2C4C4" }),
        el({ id: "b4", type: "shape", shapeType: "circle", x: 680, y: 150, width: 24, height: 24, fill: "#9CAF88" }),
        el({ id: "b5", type: "shape", shapeType: "circle", x: 200, y: 350, width: 20, height: 20, fill: "#E8A87C" }),
        el({ id: "b6", type: "shape", shapeType: "circle", x: 600, y: 380, width: 28, height: 28, fill: "#F2C4C4" }),
        el({ id: "b7", type: "shape", shapeType: "circle", x: 500, y: 200, width: 18, height: 18, fill: "#C4A2D8" }),
        // confetti rects
        el({ id: "b8", type: "shape", shapeType: "rect", x: 150, y: 250, width: 20, height: 20, rotation: 30, fill: "#87CEEB" }),
        el({ id: "b9", type: "shape", shapeType: "rect", x: 650, y: 280, width: 16, height: 16, rotation: 45, fill: "#E8A87C" }),
        el({ id: "b10", type: "shape", shapeType: "rect", x: 350, y: 400, width: 22, height: 22, rotation: 15, fill: "#9CAF88" }),
      ],
      createdAt: now,
      updatedAt: now,
    },
  },
  {
    templateId: "thankyou",
    name: "Thank You",
    thumbnail: "Sage-green accented card with thank you text and border decoration",
    card: {
      id: "",
      title: "Thank You Card",
      width: 800,
      height: 600,
      backgroundColor: "#F5F0E8",
      elements: [
        el({ id: "t1", type: "text", x: 250, y: 220, width: 300, height: 60, content: "Thank You", fontSize: 52, fontFamily: "Georgia", fill: "#5C7A4B" }),
        el({ id: "t2", type: "text", x: 250, y: 320, width: 300, height: 30, content: "Your kindness means the world.", fontSize: 18, fontFamily: "Georgia", fill: "#6B7B5E" }),
        // border decoration — four edge rects
        el({ id: "t3", type: "shape", shapeType: "rect", x: 30, y: 30, width: 740, height: 8, fill: "#9CAF88" }),
        el({ id: "t4", type: "shape", shapeType: "rect", x: 30, y: 562, width: 740, height: 8, fill: "#9CAF88" }),
        el({ id: "t5", type: "shape", shapeType: "rect", x: 30, y: 30, width: 8, height: 540, fill: "#9CAF88" }),
        el({ id: "t6", type: "shape", shapeType: "rect", x: 762, y: 30, width: 8, height: 540, fill: "#9CAF88" }),
      ],
      createdAt: now,
      updatedAt: now,
    },
  },
  {
    templateId: "congratulations",
    name: "Congratulations",
    thumbnail: "Soft pink background with congratulations text and decorative shapes",
    card: {
      id: "",
      title: "Congratulations Card",
      width: 800,
      height: 600,
      backgroundColor: "#FDE8E8",
      elements: [
        el({ id: "c1", type: "text", x: 150, y: 200, width: 500, height: 60, content: "Congratulations!", fontSize: 46, fontFamily: "Georgia", fill: "#8B4567" }),
        el({ id: "c2", type: "text", x: 220, y: 300, width: 360, height: 30, content: "So proud of your achievement!", fontSize: 20, fontFamily: "Georgia", fill: "#8B6978" }),
        // decorative shapes
        el({ id: "c3", type: "shape", shapeType: "circle", x: 100, y: 100, width: 50, height: 50, fill: "#F2C4C4" }),
        el({ id: "c4", type: "shape", shapeType: "circle", x: 700, y: 100, width: 40, height: 40, fill: "#E8C4F2" }),
        el({ id: "c5", type: "shape", shapeType: "circle", x: 100, y: 500, width: 35, height: 35, fill: "#C4D8F2" }),
        el({ id: "c6", type: "shape", shapeType: "circle", x: 700, y: 500, width: 45, height: 45, fill: "#F2E4C4" }),
        el({ id: "c7", type: "shape", shapeType: "rect", x: 380, y: 430, width: 40, height: 40, rotation: 45, fill: "#D4A8C8" }),
      ],
      createdAt: now,
      updatedAt: now,
    },
  },
  {
    templateId: "love",
    name: "With Love",
    thumbnail: "Pink-toned card with heart-like circle arrangement and love text",
    card: {
      id: "",
      title: "Love Card",
      width: 800,
      height: 600,
      backgroundColor: "#FFF0F3",
      elements: [
        el({ id: "l1", type: "text", x: 280, y: 260, width: 240, height: 50, content: "With Love", fontSize: 44, fontFamily: "Georgia", fill: "#C44569" }),
        el({ id: "l2", type: "text", x: 280, y: 340, width: 240, height: 30, content: "You mean everything to me.", fontSize: 16, fontFamily: "Georgia", fill: "#B56576" }),
        // heart-like circle arrangement (two overlapping circles + triangle-ish rect)
        el({ id: "l3", type: "shape", shapeType: "circle", x: 370, y: 140, width: 60, height: 60, fill: "#F2C4C4" }),
        el({ id: "l4", type: "shape", shapeType: "circle", x: 430, y: 140, width: 60, height: 60, fill: "#F2C4C4" }),
        el({ id: "l5", type: "shape", shapeType: "rect", x: 362, y: 148, width: 76, height: 50, rotation: 0, fill: "#F2C4C4" }),
        // small accent circles
        el({ id: "l6", type: "shape", shapeType: "circle", x: 150, y: 450, width: 20, height: 20, fill: "#F5B7C5" }),
        el({ id: "l7", type: "shape", shapeType: "circle", x: 650, y: 450, width: 20, height: 20, fill: "#F5B7C5" }),
        el({ id: "l8", type: "shape", shapeType: "circle", x: 400, y: 500, width: 16, height: 16, fill: "#F5B7C5" }),
      ],
      createdAt: now,
      updatedAt: now,
    },
  },
  {
    templateId: "blank",
    name: "Blank Canvas",
    thumbnail: "Empty canvas to start from scratch",
    card: {
      id: "",
      title: "Untitled Card",
      width: 800,
      height: 600,
      backgroundColor: "#FDF6E3",
      elements: [],
      createdAt: now,
      updatedAt: now,
    },
  },
];
