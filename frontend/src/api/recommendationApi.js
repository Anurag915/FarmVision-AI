import api from "./axios";

export const getRecommendations = async (data) => {
  const response = await api.post("/recommendation/predict", data);
  return response.data;
};