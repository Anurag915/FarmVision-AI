import api from "./axios";

export const getProductionForecast = async (payload) => {
  const response = await api.post("/production/predict", payload);
  return response.data;
};