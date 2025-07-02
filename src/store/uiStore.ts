import { create } from 'zustand';

interface UIState {
  selectedCategory: string | null;
  selectedState: string | null;
  selectedSubcategory: string | null;
  selectedCountry: string | null;
  selectedCity: string | null;
  selectedRegion: string | null;
  selectedStateCity: string | null;
  showFilters: boolean;
  setSelectedCategory: (category: string | null) => void;
  setSelectedState: (state: string | null) => void;
  setSelectedSubcategory: (subcategory: string | null) => void;
  setSelectedCountry: (country: string | null) => void;
  setSelectedCity: (city: string | null) => void;
  setSelectedRegion: (region: string | null) => void;
  setSelectedStateCity: (stateCity: string | null) => void;
  setShowFilters: (show: boolean) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedCategory: null,
  selectedState: null,
  selectedSubcategory: null,
  selectedCountry: null,
  selectedCity: null,
  selectedRegion: null,
  selectedStateCity: null,
  showFilters: false,
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedSubcategory: (subcategory) => set({ selectedSubcategory: subcategory }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedCity: (city) => set({ selectedCity: city }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setSelectedStateCity: (stateCity) => set({ selectedStateCity: stateCity }),
  setShowFilters: (show) => set({ showFilters: show }),
  resetFilters: () => set({
    selectedCategory: null,
    selectedState: null,
    selectedSubcategory: null,
    selectedCountry: null,
    selectedCity: null,
    selectedRegion: null,
    selectedStateCity: null,
  }),
})); 