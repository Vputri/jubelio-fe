import Plot from 'react-plotly.js';
import type { Data, Layout } from 'plotly.js';

interface ScatterPlotProps {
  x: number[];
  y: number[];
  text: string[];
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({ x, y, text }) => {
  const data: Data[] = [
    {
      type: 'scatter',
      mode: 'markers',
      x,
      y,
      text,
      hovertemplate: '<b>%{text}</b><br>Discount: %{x}%<br>Quantity Sold: %{y}<extra></extra>',
      marker: {
        size: 12,
        color: y,
        colorscale: 'Viridis',
        showscale: true,
        colorbar: {
          title: 'Quantity Sold',
          titleside: 'right'
        }
      },
      name: 'Products'
    } as Data
  ];

  const layout: Partial<Layout> = {
    title: {
      text: 'Discount vs Quantity Sold Correlation',
      font: { size: 20, color: '#2C3E50' }
    },
    xaxis: {
      title: { text: 'Discount (%)' },
      gridcolor: '#E8E8E8',
      zeroline: false
    },
    yaxis: {
      title: { text: 'Quantity Sold' },
      gridcolor: '#E8E8E8',
      zeroline: false
    },
    height: 400,
    margin: { t: 50, b: 60, l: 60, r: 50 },
    plot_bgcolor: 'white',
    paper_bgcolor: 'white',
    hovermode: 'closest'
  };

  const config = {
    displayModeBar: false,
    responsive: true
  };

  return (
    <div className="chart-container">
      <Plot
        data={data}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}; 