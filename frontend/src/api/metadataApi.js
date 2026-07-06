// Simulated API for Metadata since backend endpoints don't exist yet.
// Replace these with actual axios calls when backend is ready.

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
  }
};

export const getStates = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DATA.states), 300);
  });
};

export const getDistricts = async (state) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DATA.districts[state] || []), 300);
  });
};

export const getSeasons = async (state, district) => {
  return new Promise((resolve) => {
    // For now, returning all seasons regardless of state/district for simplicity in mock
    setTimeout(() => resolve(["Kharif", "Rabi", "Whole Year"]), 300);
  });
};
