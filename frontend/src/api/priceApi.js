import api from "./axios";

export const getPriceForecast = async (payload) => {
  const response = await api.post("/price/predict", payload);
  return response.data;
};