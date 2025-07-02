import React from 'react';
import { useAllChartData } from '../hooks/useProducts';
import { PieChart } from './PieChart';
import { ScatterPlot } from './ScatterPlot';
import { Heatmap } from './Heatmap';
import { FilterPanel } from './FilterPanel';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { data: chartData, isLoading, error } = useAllChartData();

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          Error loading dashboard: {error.message}
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="dashboard-container">
        <div className="error-message">No data available</div>
      </div>
    );
  }

  // Check if using mock data
  const isUsingMockData = !chartData.pieData.total_sales;

  // 1. Pie Chart: Find top selling product
  const pieData = (() => {
    const { labels, data: values } = chartData.pieData;
    if (!labels || !values || labels.length === 0) return { labels: [], values: [] };
    
    const maxIndex = values.indexOf(Math.max(...values));
    return {
      labels,
      values,
      topProduct: labels[maxIndex],
      topSales: values[maxIndex]
    };
  })();

  const pieConclusion = (() => {
    if (!pieData.topProduct) return "Insight: No product data available.";
    return `Top Seller: ${pieData.topProduct} with ${pieData.topSales?.toLocaleString()} units sold`;
  })();

  // 2. Scatter Plot: Find correlation insights
  const scatterData = (() => {
    const correlations = chartData.scatterData.correlations;
    if (!correlations || correlations.length === 0) return { x: [], y: [], text: [] };
    
    const x = correlations.map(c => c.avg_discount);
    const y = correlations.map(c => c.avg_quantity);
    const text = correlations.map(c => `${c.state}<br>Discount: ${c.avg_discount}%<br>Quantity: ${c.avg_quantity}`);
    
    return { x, y, text };
  })();

  const scatterConclusion = (() => {
    const correlations = chartData.scatterData.correlations;
    if (!correlations || correlations.length === 0) return "Insight: No correlation data available.";
    
    const maxQuantity = Math.max(...correlations.map(c => c.avg_quantity));
    const bestState = correlations.find(c => c.avg_quantity === maxQuantity);
    return `Best Performance: ${bestState?.state} with ${maxQuantity} avg quantity`;
  })();

  // 3. Heatmap: Find top sales region
  const heatmapData = (() => {
    const countries = chartData.heatmapData.countries;
    const categories = chartData.heatmapData.categories;
    const matrix = chartData.heatmapData.matrix;
    
    if (!countries || !categories || !matrix) return { z: [], x: [], y: [] };
    
    const z = countries.map(country => 
      categories.map(category => matrix[country]?.[category] || 0)
    );
    
    return { z, x: countries, y: categories };
  })();

  const heatmapConclusion = (() => {
    const { z, x: countries, y: categories } = heatmapData;
    if (!z || z.length === 0 || !z.some(row => row.length > 0)) return "Insight: No data for the current selection.";

    const maxValue = Math.max(...z.flat());
    const maxRowIndex = z.findIndex(row => row.includes(maxValue));
    const maxColIndex = z[maxRowIndex].indexOf(maxValue);
    
    const topCountry = countries[maxRowIndex];
    const topCategory = categories[maxColIndex];
    
    return `Top Region: ${topCountry} - ${topCategory} with ${maxValue} sales`;
  })();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-main">
            <h1>📊 Sales Analytics Dashboard</h1>
            <p>Real-time sales data visualization with interactive charts</p>
            {isUsingMockData ? (
              <div className="status warning">⚠️ Using demo data (API unavailable)</div>
            ) : (
              <div className="status success">✅ Connected to API</div>
            )}
          </div>
          <div className="header-actions">
            <a href="/presentasi.html" className="presentation-link" target="_blank">
              📋 Lihat Presentasi
            </a>
          </div>
        </div>
      </header>
      
      <FilterPanel />
      
      <div className="dashboard-grid">
        <div className="chart-card">
          <PieChart 
            labels={pieData.labels} 
            data={pieData.values} 
          />
          <div className="chart-description">
            <h3>Most Sold Products</h3>
            <p>{pieConclusion}</p>
          </div>
        </div>

        <div className="chart-card">
          <ScatterPlot 
            x={scatterData.x} 
            y={scatterData.y} 
            text={scatterData.text} 
          />
          <div className="chart-description">
            <h3>Discount vs Quantity Correlation</h3>
            <p>{scatterConclusion}</p>
          </div>
        </div>

        <div className="chart-card full-width">
          <Heatmap 
            z={heatmapData.z} 
            x={heatmapData.x} 
            y={heatmapData.y} 
          />
          <div className="chart-description">
            <h3>Sales by State & Category</h3>
            <p>{heatmapConclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 