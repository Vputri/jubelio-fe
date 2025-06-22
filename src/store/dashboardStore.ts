import { create } from 'zustand';
import type { Product, ChartData } from '../types/dashboard';

interface DashboardState {
  products: Product[];
  chartData: ChartData | null;
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setChartData: (data: ChartData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Mock data for demonstration
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

export const useDashboardStore = create<DashboardState>((set, get) => ({
  products: mockProducts,
  chartData: null,
  isLoading: false,
  error: null,
  
  setProducts: (products) => set({ products }),
  setChartData: (chartData) => set({ chartData }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
})); 