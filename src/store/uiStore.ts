import { create } from 'zustand';

interface UIState {
  selectedCategory: string | null;
  selectedState: string | null;
  showFilters: boolean;
  setSelectedCategory: (category: string | null) => void;
  setSelectedState: (state: string | null) => void;
  setShowFilters: (show: boolean) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedCategory: null,
  selectedState: null,
  showFilters: false,
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedState: (state) => set({ selectedState: state }),
  setShowFilters: (show) => set({ showFilters: show }),
  resetFilters: () => set({ selectedCategory: null, selectedState: null }),
})); 