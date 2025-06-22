import { useUIStore } from '../store/uiStore';
import { useDiscountQuantityCorrelation, useQuantityByCountry } from '../hooks/useProducts';

export const FilterPanel: React.FC = () => {
  const { data: scatterData } = useDiscountQuantityCorrelation();
  const { data: heatmapData } = useQuantityByCountry();
  
  const { 
    selectedCategory, 
    selectedState, 
    showFilters,
    setSelectedCategory, 
    setSelectedState, 
    setShowFilters,
    resetFilters 
  } = useUIStore();

  // Get available states from scatter plot data
  const states = scatterData?.states || [];
  
  // Get available categories from heatmap data
  const categories = heatmapData?.categories || [];

  // Check if we're using mock data
  const isUsingMockData = states.length <= 4; // Mock data has only 4 states

  return (
    <div className="filter-panel">
      <button 
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide' : 'Show'} Filters
      </button>
      
      {showFilters && (
        <div className="filter-content">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory || ''} 
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>State:</label>
            <select 
              value={selectedState || ''} 
              onChange={(e) => setSelectedState(e.target.value || null)}
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="reset-filters"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      )}
      
      {scatterData && (
        <div className="api-info">
          <small>
            {isUsingMockData ? (
              <>
                Demo Mode - {states.length} states, {scatterData.correlations.length} records
                <br />
                <span style={{ color: '#ffd700' }}>⚠️ Using mock data - API not connected</span>
              </>
            ) : (
              `Real API Data - ${states.length} states with ${scatterData.correlations.length} correlation records`
            )}
          </small>
        </div>
      )}
    </div>
  );
}; 