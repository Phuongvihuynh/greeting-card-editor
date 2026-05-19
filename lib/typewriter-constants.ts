export const INK_COLORS = [
  { name: "Black", value: "#2C2C2C" },
  { name: "Navy", value: "#1B3A5C" },
  { name: "Red", value: "#8B2500" },
  { name: "Green", value: "#2E5A2E" },
  { name: "Sepia", value: "#704214" },
  { name: "Purple", value: "#4A2060" },
] as const;

export const FONT_SIZES = [16, 18, 20, 22, 24, 28, 32] as const;

export const PAPER = {
  width: 700,
  height: 520,
  background: "#F5E6CA",
  lineSpacing: 28,
  paddingTop: 40,
  paddingLeft: 48,
  paddingRight: 48,
  lineColor: "rgba(139, 105, 20, 0.15)",
} as const;

export const PAPER_TEMPLATES = [
  {
    id: "parchment",
    name: "Parchment",
    background: "#F5E6CA",
    lineColor: "rgba(139, 105, 20, 0.15)",
  },
  {
    id: "rose",
    name: "Rose",
    background: "#F9E4E4",
    lineColor: "rgba(180, 100, 100, 0.15)",
  },
  {
    id: "lavender",
    name: "Lavender",
    background: "#EDE4F3",
    lineColor: "rgba(120, 80, 160, 0.15)",
  },
  {
    id: "sky",
    name: "Sky",
    background: "#E2EEF6",
    lineColor: "rgba(60, 100, 150, 0.15)",
  },
  {
    id: "mint",
    name: "Mint",
    background: "#E4F2E8",
    lineColor: "rgba(70, 130, 80, 0.15)",
  },
  {
    id: "cream",
    name: "Cream",
    background: "#FDF6E3",
    lineColor: "rgba(160, 130, 60, 0.12)",
  },
  {
    id: "blush",
    name: "Blush",
    background: "#FAE8E0",
    lineColor: "rgba(170, 110, 90, 0.15)",
  },
  {
    id: "ivory",
    name: "Ivory",
    background: "#FFFFF0",
    lineColor: "rgba(140, 130, 100, 0.12)",
  },
] as const;

export type PaperTemplate = (typeof PAPER_TEMPLATES)[number];

export const CARRIAGE = {
  trackHeight: 32,
  handleWidth: 48,
  returnThreshold: 0.7,
  springBackDuration: 400,
} as const;

export type InkColor = (typeof INK_COLORS)[number];
