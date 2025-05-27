// src/stores/uiStore.ts
import { create } from 'zustand';

interface UIState {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedCategory: 'general',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
