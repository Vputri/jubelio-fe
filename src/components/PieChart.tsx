import Plot from 'react-plotly.js';
import type { Data, Layout } from 'plotly.js';

interface PieChartProps {
  labels: string[];
  data: number[];
}

export const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
  const chartData: Data[] = [
    {
      type: 'pie',
      labels,
      values: data,
      hole: 0.4,
      marker: {
        colors: [
          '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
          '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#FAD7A0'
        ]
      },
      textinfo: 'percent',
      textposition: 'inside',
      automargin: true,
    } as Data
  ];

  const layout: Partial<Layout> = {
    title: {
      text: 'Most Sold Products',
      font: { size: 20, color: '#2C3E50' }
    },
    height: 400,
    margin: { t: 50, b: 50, l: 50, r: 50 },
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      font: {
        size: 9
      }
    }
  };

  const config = {
    displayModeBar: false,
    responsive: true
  };

  return (
    <div className="chart-container">
      <Plot
        data={chartData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}; 