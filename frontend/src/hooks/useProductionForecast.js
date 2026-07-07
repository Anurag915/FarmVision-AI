import { useState } from "react";
import { getProductionForecast } from "../api/productionApi";

function useProductionForecast() {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const predict = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductionForecast(payload);
      if (response.status === "success" && response.forecast) {
        setForecast(response.forecast);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      console.error("Production prediction failed:", err);
      setError("Failed to fetch production forecast. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    forecast,
    predict,
    error,
  };
}

export default useProductionForecast;
