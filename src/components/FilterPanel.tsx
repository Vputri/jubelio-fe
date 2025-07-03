import { useUIStore } from '../store/uiStore';
import { useFilterOptions } from '../hooks/useFilterOptions';

export const FilterPanel: React.FC = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedRegion,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    setSelectedRegion,
    showFilters,
    setShowFilters,
    resetFilters,
  } = useUIStore();

  const { options, loading, error } = useFilterOptions();

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
          {loading && <div>Loading filters...</div>}
          {error && <div style={{ color: 'red' }}>Error loading filters: {error}</div>}
          {options && (
            <>
              <div className="filter-group">
                <label>Category:</label>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {options.categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Subcategory:</label>
                <select
                  value={selectedSubcategory || ''}
                  onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                >
                  <option value="">All Subcategories</option>
                  {options.subcategories.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Country:</label>
                <select
                  value={selectedCountry || ''}
                  onChange={(e) => setSelectedCountry(e.target.value || null)}
                >
                  <option value="">All Countries</option>
                  {options.countries.map(c => (
                    <option key={c} value={c}>{c}</option>
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
                  {options.states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>City:</label>
                <select
                  value={selectedCity || ''}
                  onChange={(e) => setSelectedCity(e.target.value || null)}
                >
                  <option value="">All Cities</option>
                  {options.cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Region:</label>
                <select
                  value={selectedRegion || ''}
                  onChange={(e) => setSelectedRegion(e.target.value || null)}
                >
                  <option value="">All Regions</option>
                  {options.regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <button
                className="reset-filters"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}; 