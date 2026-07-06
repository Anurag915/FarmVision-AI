import api from "./axios";

export const getProductionForecast = async (data)=>{
    const response = await api.post("/production/predict",data);
    return response.data;       
};