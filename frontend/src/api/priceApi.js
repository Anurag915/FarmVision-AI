import api from "./axios";

export const getPriceForecast = async (data) => {
  const response = await api.post("/price/predict", data);
  return response.data;
};