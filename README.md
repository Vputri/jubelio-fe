# Sales Analytics Dashboard

A modern, responsive dashboard built with React that displays comprehensive sales analytics using interactive charts, integrated with a Django backend API.

## Features

### 📊 Charts
1. **Pie Chart** - Shows the most sold products with percentage distribution
2. **Scatter Plot** - Displays correlation between discount percentages and quantity sold
3. **Heatmap** - Visualizes product sales by state and category

### 🛠️ Technology Stack
- **Frontend Framework**: React 19
- **Data Handling**: Tanstack Query (React Query)
- **State Management**: Zustand
- **Chart Framework**: Plotly.js
- **Build Tool**: Vite
- **Language**: TypeScript
- **Backend API**: Django (Python)

### 🎨 Features
- **Real-time API Integration** - Live data from Django backend
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Interactive Charts** - Hover effects, zoom, and pan capabilities
- **Filter Panel** - Filter data by category and state
- **Modern UI** - Beautiful gradient background with glassmorphism effects
- **Loading States** - Smooth loading animations
- **Error Handling** - Graceful error states with helpful messages

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Python 3.8+ (for Django backend)
- Django server running on port 8000

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd jubelio-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

### Backend Setup

1. Make sure your Django server is running:
```bash
# In your Django project directory
python manage.py runserver
```

2. Configure CORS in your Django settings (see `cors-config.md` for details)

3. Ensure these API endpoints are available:
   - `GET http://localhost:8000/supermarket/api/most-sold-products/`
   - `GET http://localhost:8000/supermarket/api/discount-quantity-correlation/`
   - `GET http://localhost:8000/supermarket/api/quantity-by-country/`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── PieChart.tsx    # Pie chart component
│   ├── ScatterPlot.tsx # Scatter plot component
│   ├── Heatmap.tsx     # Heatmap component
│   ├── FilterPanel.tsx # Filter panel component
│   └── Dashboard.css   # Dashboard styles
├── hooks/              # Custom React hooks
│   ├── useChartData.ts # Chart data processing hook (legacy)
│   └── useProducts.ts  # Tanstack Query hooks for API
├── services/           # API services
│   └── api.ts         # API service with real endpoints
├── store/              # Zustand stores
│   ├── dashboardStore.ts # Dashboard state (legacy)
│   └── uiStore.ts     # UI state management
├── types/              # TypeScript type definitions
│   └── dashboard.ts   # Dashboard data types
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## API Integration

### API Endpoints

The dashboard integrates with three main Django API endpoints:

1. **Most Sold Products** (`/most-sold-products/`)
   - Returns product labels and sales values for pie chart
   - Includes total sales count

2. **Discount vs Quantity Correlation** (`/discount-quantity-correlation/`)
   - Returns correlation data for scatter plot
   - Includes data points for each state

3. **Quantity by Country** (`/quantity-by-country/`)
   - Returns heatmap data matrix
   - Shows sales by country and category

### Data Flow

1. **Tanstack Query** fetches data from Django API
2. **API Service** handles HTTP requests and error handling
3. **Dashboard Component** transforms API data for charts
4. **Chart Components** render the visualizations

### Error Handling

- Network errors are caught and displayed to users
- Loading states show while data is being fetched
- Fallback messages guide users to check Django server

## Chart Details

### Pie Chart
- Displays product sales distribution from API
- Shows percentage and labels
- Interactive hover effects
- Custom color palette

### Scatter Plot
- X-axis: Discount percentage from API
- Y-axis: Quantity sold from API
- Color-coded by quantity
- Hover tooltips with state and data details

### Heatmap
- X-axis: Countries from API
- Y-axis: Product categories from API
- Color intensity: Sales volume
- Interactive hover information

## State Management

### Tanstack Query
- Handles data fetching and caching from Django API
- Automatic background refetching
- Loading and error states
- Optimistic updates

### Zustand
- Manages UI state (filters, selections)
- Lightweight and simple API
- No provider wrapping required

## Customization

### Adding New Charts
1. Create a new component in `src/components/`
2. Use Plotly.js for chart rendering
3. Add the component to the dashboard grid
4. Update types if needed

### Modifying API Integration
1. Update API endpoints in `src/services/api.ts`
2. Modify data transformation in `src/components/Dashboard.tsx`
3. Update TypeScript types in `src/services/api.ts`

### Styling
- Main styles: `src/components/Dashboard.css`
- Responsive design with CSS Grid
- Glassmorphism effects
- Smooth animations and transitions

## Performance

- React Query for efficient data caching from API
- Memoized chart data processing
- Lazy loading of chart components
- Optimized re-renders with React.memo

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
