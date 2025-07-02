import type { Product } from '../types/dashboard';
import { buildQueryString } from '../utils/buildQueryString';

// Mock API delay to simulate real API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock products data
const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Pro', category: 'Electronics', price: 1200, discount: 10, quantitySold: 150, state: 'California' },
  { id: '2', name: 'Smartphone X', category: 'Electronics', price: 800, discount: 15, quantitySold: 200, state: 'Texas' },
  { id: '3', name: 'Wireless Headphones', category: 'Electronics', price: 150, discount: 20, quantitySold: 300, state: 'New York' },
  { id: '4', name: 'Gaming Console', category: 'Electronics', price: 500, discount: 5, quantitySold: 80, state: 'Florida' },
  { id: '5', name: 'Coffee Maker', category: 'Home & Kitchen', price: 120, discount: 25, quantitySold: 250, state: 'California' },
  { id: '6', name: 'Blender', category: 'Home & Kitchen', price: 80, discount: 30, quantitySold: 180, state: 'Texas' },
  { id: '7', name: 'Running Shoes', category: 'Sports', price: 100, discount: 12, quantitySold: 220, state: 'New York' },
  { id: '8', name: 'Yoga Mat', category: 'Sports', price: 30, discount: 8, quantitySold: 400, state: 'Florida' },
  { id: '9', name: 'Desk Chair', category: 'Furniture', price: 200, discount: 18, quantitySold: 90, state: 'California' },
  { id: '10', name: 'Bookshelf', category: 'Furniture', price: 150, discount: 22, quantitySold: 120, state: 'Texas' },
];

// API base URL
const API_BASE_URL = 'http://localhost:8000/supermarket/api';

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface MostSoldProductsData {
  labels: string[];
  data: number[];
  total_sales: number;
}

export interface CorrelationPoint {
  x: number;
  y: number;
}

export interface StateCorrelation {
  state: string;
  avg_discount: number;
  avg_quantity: number;
  total_records: number;
  points: CorrelationPoint[];
}

export interface DiscountQuantityCorrelationData {
  states: string[];
  correlations: StateCorrelation[];
}

export interface QuantityByCountryData {
  countries: string[];
  categories: string[];
  data: Array<{
    country: string;
    category: string;
    quantity: number;
  }>;
  matrix: Record<string, Record<string, number>>;
}

export interface FilterOptions {
  categories: string[];
  subcategories: string[];
  countries: string[];
  cities: string[];
  states: string[];
  regions: string[];
}

export interface ApiFilters {
  [key: string]: string | null | undefined;
  category?: string | null;
  subcategory?: string | null;
  country?: string | null;
  city?: string | null;
  state?: string | null;
  region?: string | null;
}

// Helper function to handle API errors
const handleApiError = (response: Response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// Helper function to create mock chart data from products
const createMockChartData = () => {
  // Create mock pie chart data
  const productSales = mockProducts.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + product.quantitySold;
    return acc;
  }, {} as Record<string, number>);

  const pieData: MostSoldProductsData & { isMock?: boolean } = {
    labels: Object.keys(productSales),
    data: Object.values(productSales),
    total_sales: Object.values(productSales).reduce((sum, val) => sum + val, 0),
    isMock: true
  };

  // Create mock scatter plot data
  const scatterData: DiscountQuantityCorrelationData = {
    states: ['California', 'Texas', 'New York', 'Florida'],
    correlations: mockProducts.map(product => ({
      state: product.state,
      avg_discount: product.discount,
      avg_quantity: product.quantitySold,
      total_records: 1,
      points: [{ x: product.discount, y: product.quantitySold }]
    }))
  };

  // Create mock heatmap data
  const categories = [...new Set(mockProducts.map(p => p.category))];
  
  const heatmapData: QuantityByCountryData = {
    countries: ['United States'],
    categories,
    data: categories.map(category => ({
      country: 'United States',
      category,
      quantity: mockProducts
        .filter(p => p.category === category)
        .reduce((sum, p) => sum + p.quantitySold, 0)
    })),
    matrix: {
      'United States': categories.reduce((acc, category) => {
        acc[category] = mockProducts
          .filter(p => p.category === category)
          .reduce((sum, p) => sum + p.quantitySold, 0);
        return acc;
      }, {} as Record<string, number>)
    }
  };

  return { pieData, scatterData, heatmapData };
};

// Legacy mock API functions
export const getProducts = async (): Promise<Product[]> => {
  await delay(500);
  return mockProducts;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await delay(300);
  return mockProducts.filter(product => product.category === category);
};

export const getProductsByState = async (state: string): Promise<Product[]> => {
  await delay(300);
  return mockProducts.filter(product => product.state === state);
};

export const getTopSellingProducts = async (limit: number = 5): Promise<Product[]> => {
  await delay(400);
  return mockProducts
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, limit);
};

// Real API functions with fallback to mock data
export const getMostSoldProducts = async (filters: ApiFilters = {}): Promise<MostSoldProductsData> => {
  try {
    const query = buildQueryString(filters);
    const response = await fetch(`${API_BASE_URL}/most-sold-products/${query}`);
    const result: ApiResponse<MostSoldProductsData> = await handleApiError(response);
    return result.data;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    const mockData = createMockChartData();
    return mockData.pieData;
  }
};

export const getDiscountQuantityCorrelation = async (filters: ApiFilters = {}): Promise<DiscountQuantityCorrelationData> => {
  try {
    const query = buildQueryString(filters);
    const response = await fetch(`${API_BASE_URL}/discount-quantity-correlation/${query}`);
    const result: ApiResponse<DiscountQuantityCorrelationData> = await handleApiError(response);
    return result.data;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    const mockData = createMockChartData();
    return mockData.scatterData;
  }
};

export const getQuantityByCountry = async (filters: ApiFilters = {}): Promise<QuantityByCountryData> => {
  try {
    const query = buildQueryString(filters);
    const response = await fetch(`${API_BASE_URL}/quantity-by-country/${query}`);
    const result: ApiResponse<QuantityByCountryData> = await handleApiError(response);
    return result.data;
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    const mockData = createMockChartData();
    return mockData.heatmapData;
  }
};

export const getAllChartData = async () => {
  try {
    const [pieData, scatterData, heatmapData] = await Promise.all([
      getMostSoldProducts(),
      getDiscountQuantityCorrelation(),
      getQuantityByCountry()
    ]);

    return {
      pieData,
      scatterData,
      heatmapData
    };
  } catch (error) {
    console.warn('API not available, using mock data:', error);
    return createMockChartData();
  }
};

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter-options/`);
    const result: ApiResponse<FilterOptions> = await handleApiError(response);
    return result.data;
  } catch (error) {
    console.warn('API not available, using mock filter options:', error);
    // Fallback mock data
    return {
      categories: ['Furniture', 'Office Supplies', 'Technology'],
      subcategories: ['Accessories', 'Appliances', 'Art', 'Binders'],
      countries: ['United States'],
      cities: ['New York', 'Los Angeles', 'Chicago'],
      states: ['California', 'Texas', 'New York', 'Florida'],
      regions: ['Central', 'East', 'South', 'West'],
    };
  }
};

// Export api object for backward compatibility
export const api = {
  getProducts,
  getProductsByCategory,
  getProductsByState,
  getTopSellingProducts,
  getMostSoldProducts,
  getDiscountQuantityCorrelation,
  getQuantityByCountry,
  getAllChartData,
  fetchFilterOptions
}; 