import { useUIStore } from '../store/uiStore';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { useState } from 'react';

export const FilterPanel: React.FC = () => {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedCountry,
    selectedRegion,
    selectedStateCity,
    showFilters,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedCountry,
    setSelectedRegion,
    setSelectedStateCity,
    setShowFilters,
    resetFilters,
  } = useUIStore();

  const { options, loading, error } = useFilterOptions();

  const [localStateCity, setLocalStateCity] = useState<string | null>(null);

  const stateCity = typeof selectedStateCity !== 'undefined' ? selectedStateCity : localStateCity;
  const setStateCity = typeof setSelectedStateCity !== 'undefined' ? setSelectedStateCity : setLocalStateCity;

  const stateCityOptions = options ? Array.from(new Set([...(options.states || []), ...(options.cities || [])])) : [];

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
                <label>State/City:</label>
                <select
                  value={stateCity || ''}
                  onChange={(e) => setStateCity(e.target.value || null)}
                >
                  <option value="">All State/Cities</option>
                  {stateCityOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
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
                onClick={() => {
                  resetFilters();
                  setStateCity(null);
                }}
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