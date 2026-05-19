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

export const CARRIAGE = {
  trackHeight: 32,
  handleWidth: 48,
  returnThreshold: 0.7,
  springBackDuration: 400,
} as const;

export type InkColor = (typeof INK_COLORS)[number];
