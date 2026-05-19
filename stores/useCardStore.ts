import { create } from "zustand";
import type { Card, CardElement } from "@/types/card";

interface CardStore {
  card: Card;
  selectedElementId: string | null;
  setCard: (card: Card) => void;
  addElement: (element: CardElement) => void;
  updateElement: (id: string, updates: Partial<CardElement>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
}

const defaultCard: Card = {
  id: "",
  title: "Untitled Card",
  width: 800,
  height: 600,
  backgroundColor: "#FDF6E3",
  elements: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const useCardStore = create<CardStore>((set) => ({
  card: defaultCard,
  selectedElementId: null,

  setCard: (card) => set({ card }),

  addElement: (element) =>
    set((state) => ({
      card: { ...state.card, elements: [...state.card.elements, element] },
    })),

  updateElement: (id, updates) =>
    set((state) => ({
      card: {
        ...state.card,
        elements: state.card.elements.map((el) =>
          el.id === id ? { ...el, ...updates } : el
        ),
      },
    })),

  removeElement: (id) =>
    set((state) => ({
      card: {
        ...state.card,
        elements: state.card.elements.filter((el) => el.id !== id),
      },
    })),

  selectElement: (id) => set({ selectedElementId: id }),
}));
