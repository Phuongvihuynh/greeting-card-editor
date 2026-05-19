export interface CardElement {
  id: string;
  type: "text" | "image" | "shape";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string;
  src?: string;
  fill?: string;
  fontSize?: number;
  fontFamily?: string;
}

export interface Card {
  id: string;
  title: string;
  width: number;
  height: number;
  backgroundColor: string;
  elements: CardElement[];
  createdAt: string;
  updatedAt: string;
}
