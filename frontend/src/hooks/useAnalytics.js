import { useState, useEffect, useCallback } from "react";
import { getAnalyticsData } from "../api/analyticsApi";

function useAnalytics() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAnalyticsData(filters);
      setData(response);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
      setError("Failed to load analytics dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    data,
    fetchData,
    error,
  };
}

export default useAnalytics;
