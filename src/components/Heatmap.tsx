import Plot from 'react-plotly.js';
import type { Data, Layout } from 'plotly.js';

interface HeatmapProps {
  z: number[][];
  x: string[];
  y: string[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ z, x, y }) => {
  const data: Data[] = [
    {
      type: 'heatmap',
      z,
      x,
      y,
      colorscale: 'Blues',
      hovertemplate: '<b>%{y}</b><br>State: %{x}<br>Quantity Sold: %{z}<extra></extra>',
      showscale: true,
      colorbar: {
        title: 'Quantity Sold',
        titleside: 'right'
      }
    } as Data
  ];

  const layout: Partial<Layout> = {
    title: {
      text: 'Product Sales by State',
      font: { size: 20, color: '#2C3E50' }
    },
    xaxis: {
      title: { text: 'States' },
      gridcolor: '#E8E8E8'
    },
    yaxis: {
      title: { text: 'Product Categories' },
      gridcolor: '#E8E8E8',
      automargin: true
    },
    height: 400,
    margin: { t: 50, b: 60, l: 120, r: 50 },
    plot_bgcolor: 'white',
    paper_bgcolor: 'white'
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