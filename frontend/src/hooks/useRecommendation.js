import { useState } from "react";
import { getRecommendations } from "../api/recommendationApi";

function useRecommendation() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const predict = async (payload) => {
    try {
      setLoading(true);

      const response = await getRecommendations(payload);

      setRecommendations(response.recommendations);
    } catch (error) {
      console.error("Prediction failed:", error);
      // Optional: you could add an setError state here to display in the UI
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    recommendations,
    predict,
  };
}

export default useRecommendation;