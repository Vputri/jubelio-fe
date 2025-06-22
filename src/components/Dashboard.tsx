import { useAllChartData } from '../hooks/useProducts';
import { useUIStore } from '../store/uiStore';
import { PieChart } from './PieChart';
import { ScatterPlot } from './ScatterPlot';
import { Heatmap } from './Heatmap';
import { FilterPanel } from './FilterPanel';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { data: chartData, isLoading, error } = useAllChartData();
  const { selectedState, selectedCategory } = useUIStore();

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

  // For scatter plot, we'll use the first state's data or combine all states
  const scatterPlotData = (() => {
    if (chartData.scatterData.correlations.length > 0) {
      // Use the first state's points for simplicity, or combine all
      let allPoints = chartData.scatterData.correlations.flatMap(corr => 
        corr.points.map(point => ({
          x: point.x,
          y: point.y,
          state: corr.state
        }))
      );

      if (selectedState) {
        allPoints = allPoints.filter(p => p.state === selectedState);
      }
      
      return {
        x: allPoints.map(p => p.x),
        y: allPoints.map(p => p.y),
        text: allPoints.map(p => `${p.state} (${p.x}% discount, ${p.y} qty)`)
      };
    }
    return { x: [], y: [], text: [] };
  })();

  // --- Data Processing and Conclusion Generation ---

  // 1. Pie Chart: Aggregate data and find top product
  const { aggregatedLabels, aggregatedData, pieConclusion } = (() => {
    const rawData = chartData.pieData;
    if (!rawData || rawData.data.length === 0) {
      return { 
        aggregatedLabels: [], 
        aggregatedData: [], 
        pieConclusion: "No sales data available." 
      };
    }

    const combined = rawData.labels.map((label, i) => ({ label, value: rawData.data[i] }));
    combined.sort((a, b) => b.value - a.value);

    const topN = 9;
    const topItems = combined.slice(0, topN);
    const otherItems = combined.slice(topN);

    const aggregatedLabels = topItems.map(item => item.label);
    const aggregatedData = topItems.map(item => item.value);

    if (otherItems.length > 0) {
      const othersValue = otherItems.reduce((sum, item) => sum + item.value, 0);
      aggregatedLabels.push('Others');
      aggregatedData.push(othersValue);
    }
    
    const topProduct = combined[0];
    const conclusion = `Insight: The top-selling product is "${topProduct.label}", which consistently outperforms other items.`;

    return { aggregatedLabels, aggregatedData, pieConclusion: conclusion };
  })();

  // 2. Scatter Plot: Analyze correlation
  const scatterConclusion = (() => {
    const x = scatterPlotData.x;
    const y = scatterPlotData.y;

    if (x.length < 5) return "Insight: Not enough data for a meaningful conclusion on discount effectiveness.";

    const calculatePearsonCorrelation = (x: number[], y: number[]): number => {
      const n = x.length;
      if (n === 0 || n !== y.length) return 0;

      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
      for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
      }

      const numerator = n * sumXY - sumX * sumY;
      const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

      if (denominator === 0) return 0;
      return numerator / denominator;
    };

    const correlation = calculatePearsonCorrelation(x, y);

    if (correlation > 0.7) {
      return `Insight: Strong positive correlation (r=${correlation.toFixed(2)}). Higher discounts are strongly associated with more sales.`;
    } else if (correlation > 0.4) {
      return `Insight: Moderate positive correlation (r=${correlation.toFixed(2)}). Higher discounts tend to correspond with more sales.`;
    } else if (correlation > 0.1) {
      return `Insight: Weak positive correlation (r=${correlation.toFixed(2)}). There's a slight tendency for sales to increase with discounts.`;
    } else if (correlation < -0.7) {
      return `Insight: Strong negative correlation (r=${correlation.toFixed(2)}). Higher discounts are strongly associated with fewer sales.`;
    } else if (correlation < -0.4) {
      return `Insight: Moderate negative correlation (r=${correlation.toFixed(2)}). Higher discounts tend to correspond with fewer sales.`;
    } else if (correlation < -0.1) {
      return `Insight: Weak negative correlation (r=${correlation.toFixed(2)}). There's a slight tendency for sales to decrease with discounts.`;
    } else {
      return `Insight: No clear correlation (r=${correlation.toFixed(2)}). There is no significant linear relationship between discount and sales quantity.`;
    }
  })();

  // 3. Heatmap: Find top sales region
  const heatmapData = (() => {
    const countries = chartData.heatmapData.countries;
    const categories = chartData.heatmapData.categories;
    
    if (countries.length === 0 || categories.length === 0) {
      return { z: [], x: [], y: [] };
    }

    let filteredCountries = countries;
    if (selectedState) {
      filteredCountries = countries.filter(c => c === selectedState);
    }

    let filteredCategories = categories;
    if (selectedCategory) {
      filteredCategories = categories.filter(c => c === selectedCategory);
    }
    
    const z = filteredCategories.map(category =>
      filteredCountries.map(country => 
        chartData.heatmapData.matrix[country]?.[category] || 0
      )
    );

    return {
      z,
      x: filteredCountries,
      y: filteredCategories
    };
  })();

  const heatmapConclusion = (() => {
    const { z, x: countries, y: categories } = heatmapData;
    if (!z || z.length === 0 || !z.some(row => row.length > 0)) return "Insight: No data for the current selection.";

    let maxValue = -1, maxCatIdx = -1, maxCountryIdx = -1;
    z.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val > maxValue) {
          maxValue = val;
          maxCatIdx = i;
          maxCountryIdx = j;
        }
      });
    });
    
    if (maxValue <= 0) return "Insight: No significant sales activity found for this selection.";

    return `Insight: The strongest market is "${countries[maxCountryIdx]}", with the "${categories[maxCatIdx]}" category leading sales.`;
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
            labels={aggregatedLabels} 
            data={aggregatedData}
          />
          <div className="chart-description">
            <p>This pie chart shows the proportion of sales for the top-selling products. Products with smaller sales figures are grouped into the "Others" category.</p>
          </div>
          <div className="chart-conclusion">
            <p>{pieConclusion}</p>
          </div>
        </div>
        
        <div className="chart-card">
          <ScatterPlot 
            x={scatterPlotData.x} 
            y={scatterPlotData.y} 
            text={scatterPlotData.text} 
          />
          <div className="chart-description">
            <p>This scatter plot illustrates the relationship between the discount offered on a product and the quantity sold. Each point represents a product transaction.</p>
          </div>
          <div className="chart-conclusion">
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
            <p>This heatmap displays the quantity of products sold across different states and categories. Darker shades indicate higher sales volumes.</p>
          </div>
          <div className="chart-conclusion">
            <p>{heatmapConclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 