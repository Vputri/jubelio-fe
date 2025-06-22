export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  quantitySold: number;
  state: string;
}

export interface SalesData {
  products: Product[];
}

export interface ChartData {
  pieChart: {
    labels: string[];
    values: number[];
  };
  scatterPlot: {
    x: number[]; // discount percentages
    y: number[]; // quantity sold
    text: string[]; // product names
  };
  heatmap: {
    z: number[][]; // sales data matrix
    x: string[]; // states
    y: string[]; // product categories
  };
} 