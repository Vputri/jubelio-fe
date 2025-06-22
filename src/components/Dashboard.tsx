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
        <div className="loading">Loading dashboard from API...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          Error loading dashboard: {error.message}
          <br />
          <small>Make sure the Django server is running on http://localhost:8000</small>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="dashboard-container">
        <div className="loading">No data available from API</div>
      </div>
    );
  }

  // Transform API data for charts
  const pieChartData = {
    labels: chartData.pieData.labels,
    data: chartData.pieData.data
  };

  // For scatter plot, we'll use the first state's data or combine all states
  const scatterPlotData = (() => {
    if (chartData.scatterData.correlations.length > 0) {
      // Use the first state's points for simplicity, or combine all
      const allPoints = chartData.scatterData.correlations.flatMap(corr => 
        corr.points.map(point => ({
          x: point.x,
          y: point.y,
          state: corr.state
        }))
      );
      
      return {
        x: allPoints.map(p => p.x),
        y: allPoints.map(p => p.y),
        text: allPoints.map(p => `${p.state} (${p.x}% discount, ${p.y} qty)`)
      };
    }
    return { x: [], y: [], text: [] };
  })();

  // For heatmap, transform the matrix data
  const heatmapData = (() => {
    const countries = chartData.heatmapData.countries;
    const categories = chartData.heatmapData.categories;
    
    if (countries.length === 0 || categories.length === 0) {
      return { z: [], x: [], y: [] };
    }

    const z = categories.map(category =>
      countries.map(country => 
        chartData.heatmapData.matrix[country]?.[category] || 0
      )
    );

    return {
      z,
      x: countries,
      y: categories
    };
  })();

  // Check if we're using mock data (API not available)
  const isUsingMockData = chartData.pieData.total_sales < 10000; // Mock data has smaller numbers

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Sales Analytics Dashboard</h1>
        <p>
          {isUsingMockData ? (
            <>
              Demo Mode - Using Mock Data
              <br />
              <small>Connect to Django API for real data</small>
            </>
          ) : (
            `Real-time data from Django API - Total Sales: ${chartData.pieData.total_sales?.toLocaleString() || 'N/A'}`
          )}
        </p>
      </header>
      
      <FilterPanel />
      
      <div className="dashboard-grid">
        <div className="chart-card">
          <PieChart 
            labels={pieChartData.labels} 
            data={pieChartData.data}
          />
        </div>
        
        <div className="chart-card">
          <ScatterPlot 
            x={scatterPlotData.x} 
            y={scatterPlotData.y} 
            text={scatterPlotData.text} 
          />
        </div>
        
        <div className="chart-card full-width">
          <Heatmap 
            z={heatmapData.z} 
            x={heatmapData.x} 
            y={heatmapData.y} 
          />
        </div>
      </div>
    </div>
  );
}; 