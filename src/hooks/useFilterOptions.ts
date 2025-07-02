import { useEffect, useState } from 'react';
import { fetchFilterOptions } from '../services/api';
import type { FilterOptions } from '../services/api';

export function useFilterOptions() {
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFilterOptions()
      .then(data => {
        setOptions(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { options, loading, error };
} 