export interface Sticker {
  id: string;
  name: string;
  category: string;
  src: string;
  width: number;
  height: number;
}

export const CATEGORIES = ["All", "Flowers", "Decorations", "Nature"] as const;

export type Category = (typeof CATEGORIES)[number];

export const STICKERS: Sticker[] = [
  // Flowers
  { id: "rose", name: "Rose", category: "Flowers", src: "/stickers/rose.svg", width: 100, height: 100 },
  { id: "daisy", name: "Daisy", category: "Flowers", src: "/stickers/daisy.svg", width: 100, height: 100 },
  { id: "tulip", name: "Tulip", category: "Flowers", src: "/stickers/tulip.svg", width: 100, height: 100 },
  { id: "sunflower", name: "Sunflower", category: "Flowers", src: "/stickers/sunflower.svg", width: 100, height: 100 },
  // Decorations
  { id: "ribbon", name: "Ribbon", category: "Decorations", src: "/stickers/ribbon.svg", width: 100, height: 100 },
  { id: "wax-seal", name: "Wax Seal", category: "Decorations", src: "/stickers/wax-seal.svg", width: 100, height: 100 },
  { id: "bow", name: "Bow", category: "Decorations", src: "/stickers/bow.svg", width: 100, height: 100 },
  { id: "banner", name: "Banner", category: "Decorations", src: "/stickers/banner.svg", width: 100, height: 100 },
  // Nature
  { id: "leaf", name: "Leaf", category: "Nature", src: "/stickers/leaf.svg", width: 100, height: 100 },
  { id: "branch", name: "Branch", category: "Nature", src: "/stickers/branch.svg", width: 100, height: 100 },
  { id: "butterfly", name: "Butterfly", category: "Nature", src: "/stickers/butterfly.svg", width: 100, height: 100 },
  { id: "heart", name: "Heart", category: "Nature", src: "/stickers/heart.svg", width: 100, height: 100 },
];
