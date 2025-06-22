import { useQuery } from '@tanstack/react-query';
import { 
  getMostSoldProducts,
  getDiscountQuantityCorrelation,
  getQuantityByCountry,
  getAllChartData,
  getProducts,
  getProductsByCategory,
  getProductsByState,
  getTopSellingProducts
} from '../services/api';

// Hook for pie chart data (most sold products)
export const useMostSoldProducts = () => {
  return useQuery({
    queryKey: ['most-sold-products'],
    queryFn: getMostSoldProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for scatter plot data (discount vs quantity correlation)
export const useDiscountQuantityCorrelation = () => {
  return useQuery({
    queryKey: ['discount-quantity-correlation'],
    queryFn: getDiscountQuantityCorrelation,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for heatmap data (quantity by country)
export const useQuantityByCountry = () => {
  return useQuery({
    queryKey: ['quantity-by-country'],
    queryFn: getQuantityByCountry,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for all chart data combined
export const useAllChartData = () => {
  return useQuery({
    queryKey: ['all-chart-data'],
    queryFn: getAllChartData,
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