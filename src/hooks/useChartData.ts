import { useMemo } from 'react';
import type { Product, ChartData } from '../types/dashboard';

export const useChartData = (products: Product[]): ChartData => {
  return useMemo(() => {
    // Pie Chart: Most sold products
    const productSales = products.reduce((acc, product) => {
      acc[product.name] = (acc[product.name] || 0) + product.quantitySold;
      return acc;
    }, {} as Record<string, number>);

    const pieChartData = {
      labels: Object.keys(productSales),
      values: Object.values(productSales),
    };

    // Scatter Plot: Correlation between discount and quantity sold
    const scatterPlotData = {
      x: products.map(p => p.discount),
      y: products.map(p => p.quantitySold),
      text: products.map(p => p.name),
    };

    // Heatmap: Most sold products by state
    const states = [...new Set(products.map(p => p.state))];
    const categories = [...new Set(products.map(p => p.category))];
    
    const heatmapData = {
      z: categories.map(category =>
        states.map(state => {
          const stateCategoryProducts = products.filter(
            p => p.state === state && p.category === category
          );
          return stateCategoryProducts.reduce((sum, p) => sum + p.quantitySold, 0);
        })
      ),
      x: states,
      y: categories,
    };

    return {
      pieChart: pieChartData,
      scatterPlot: scatterPlotData,
      heatmap: heatmapData,
    };
  }, [products]);
}; 