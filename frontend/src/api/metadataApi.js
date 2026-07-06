import api from "./axios";

const MOCK_DATA = {
  states: ["Andhra Pradesh", "Punjab", "Bihar", "Maharashtra", "Uttar Pradesh"],
  districts: {
    "Andhra Pradesh": ["Anantapur", "Kurnool", "Chittoor"],
    "Punjab": ["Amritsar", "Ludhiana", "Patiala"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
    "Maharashtra": ["Pune", "Nagpur", "Nashik"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra"]
  },
  seasons: {
    "Kharif": ["Kharif"],
    "Rabi": ["Rabi"],
    "Zaid": ["Zaid"]
  },
  crops: ["Wheat", "Rice", "Maize", "Cotton", "Sugarcane"]
};

export const getStates = async () => {
  try {
    const response = await api.get("/metadata/states");
    return response.data.states || response.data;
  } catch (error) {
    console.warn("Using mock states data due to API error", error);
    return MOCK_DATA.states;
  }
};

export const getDistricts = async (state) => {
  try {
    const response = await api.get(`/metadata/districts`, { params: { state } });
    return response.data.districts || response.data;
  } catch (error) {
    console.warn(`Using mock districts data for ${state} due to API error`, error);
    return MOCK_DATA.districts[state] || [];
  }
};

export const getSeasons = async (state, district) => {
  try {
    const response = await api.get(`/metadata/seasons`, { params: { state, district } });
    return response.data.seasons || response.data;
  } catch (error) {
    console.warn("Using mock seasons data due to API error", error);
    return ["Kharif", "Rabi", "Whole Year"];
  }
};

export const getCrops = async () => {
  try {
    const response = await api.get("/metadata/crops");
    return response.data.crops || response.data;
  } catch (error) {
    console.warn("Using mock crops data due to API error", error);
    return MOCK_DATA.crops;
  }
};
