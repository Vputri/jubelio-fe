import { useQuery } from '@tanstack/react-query';
import { 
  getMostSoldProducts,
  getDiscountQuantityCorrelation,
  getQuantityByCountry,
  getProducts,
  getProductsByCategory,
  getProductsByState,
  getTopSellingProducts
} from '../services/api';
import { useUIStore } from '../store/uiStore';

// Hook for pie chart data (most sold products)
export const useMostSoldProducts = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedStateCity,
    selectedRegion,
  } = useUIStore();

  const filters = {
    category: selectedCategory || undefined,
    subcategory: selectedSubcategory || undefined,
    country: selectedCountry || undefined,
    state: selectedStateCity || undefined,
    city: undefined,
    region: selectedRegion || undefined,
  };

  return useQuery({
    queryKey: ['most-sold-products', filters],
    queryFn: () => getMostSoldProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for scatter plot data (discount vs quantity correlation)
export const useDiscountQuantityCorrelation = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedStateCity,
    selectedRegion,
  } = useUIStore();

  const filters = {
    category: selectedCategory || undefined,
    subcategory: selectedSubcategory || undefined,
    country: selectedCountry || undefined,
    state: selectedStateCity || undefined,
    city: undefined,
    region: selectedRegion || undefined,
  };

  return useQuery({
    queryKey: ['discount-quantity-correlation', filters],
    queryFn: () => getDiscountQuantityCorrelation(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for heatmap data (quantity by country)
export const useQuantityByCountry = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedStateCity,
    selectedRegion,
  } = useUIStore();

  const filters = {
    category: selectedCategory || undefined,
    subcategory: selectedSubcategory || undefined,
    country: selectedCountry || undefined,
    state: selectedStateCity || undefined,
    city: undefined,
    region: selectedRegion || undefined,
  };

  return useQuery({
    queryKey: ['quantity-by-country', filters],
    queryFn: () => getQuantityByCountry(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for all chart data combined, with filters
export const useAllChartData = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedStateCity,
    selectedRegion,
  } = useUIStore();

  const filters = {
    category: selectedCategory || undefined,
    subcategory: selectedSubcategory || undefined,
    country: selectedCountry || undefined,
    state: selectedStateCity || undefined,
    city: undefined,
    region: selectedRegion || undefined,
  };

  return useQuery({
    queryKey: ['all-chart-data', filters],
    queryFn: async () => {
      const [pieData, scatterData, heatmapData] = await Promise.all([
        getMostSoldProducts(filters),
        getDiscountQuantityCorrelation(filters),
        getQuantityByCountry(filters),
      ]);
      return { pieData, scatterData, heatmapData };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Legacy hooks for backward compatibility (using mock data)
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByState = (state: string) => {
  return useQuery({
    queryKey: ['products', 'state', state],
    queryFn: () => getProductsByState(state),
    enabled: !!state,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTopSellingProducts = (limit: number = 5) => {
  return useQuery({
    queryKey: ['products', 'top-selling', limit],
    queryFn: () => getTopSellingProducts(limit),
    staleTime: 5 * 60 * 1000,
  });
}; 