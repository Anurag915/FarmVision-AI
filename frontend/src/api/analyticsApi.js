import api from "./axios";

const MOCK_ANALYTICS_DATA = {
  summary: {
    recommendedCrops: 15,
    highestRevenue: 125000,
    highestPrice: 4200,
    highestProduction: 450,
    averageScore: 82.5,
    averageYield: 4.2
  },
  revenueComparison: [
    { crop: "Wheat", revenue: 85000 },
    { crop: "Rice", revenue: 95000 },
    { crop: "Maize", revenue: 72000 },
    { crop: "Cotton", revenue: 115000 },
    { crop: "Sugarcane", revenue: 125000 },
    { crop: "Groundnut", revenue: 68000 }
  ],
  priceTrend: [
    { month: "Jan", price: 2100 },
    { month: "Feb", price: 2150 },
    { month: "Mar", price: 2300 },
    { month: "Apr", price: 2450 },
    { month: "May", price: 2600 },
    { month: "Jun", price: 2800 },
    { month: "Jul", price: 2900 },
    { month: "Aug", price: 3100 },
    { month: "Sep", price: 3400 },
    { month: "Oct", price: 3200 },
    { month: "Nov", price: 3000 },
    { month: "Dec", price: 2850 }
  ],
  productionTrend: [
    { year: 2020, production: 310 },
    { year: 2021, production: 340 },
    { year: 2022, production: 360 },
    { year: 2023, production: 390 },
    { year: 2024, production: 420 },
    { year: 2025, production: 450 }
  ],
  scoreDistribution: [
    { crop: "Sugarcane", score: 92 },
    { crop: "Cotton", score: 89 },
    { crop: "Rice", score: 85 },
    { crop: "Wheat", score: 82 },
    { crop: "Maize", score: 78 },
    { crop: "Groundnut", score: 75 }
  ],
  riskDistribution: [
    { name: 'Low', value: 45 },
    { name: 'Medium', value: 35 },
    { name: 'High', value: 20 }
  ],
  confidenceDistribution: [
    { name: 'High', value: 60 },
    { name: 'Medium', value: 30 },
    { name: 'Low', value: 10 }
  ],
  topCrops: [
    { rank: 1, crop: "Sugarcane", revenue: 125000, score: 92, risk: "Low", confidence: "High", yield: 8.5 },
    { rank: 2, crop: "Cotton", revenue: 115000, score: 89, risk: "Medium", confidence: "High", yield: 5.2 },
    { rank: 3, crop: "Rice", revenue: 95000, score: 85, risk: "Low", confidence: "Medium", yield: 4.8 },
    { rank: 4, crop: "Wheat", revenue: 85000, score: 82, risk: "Medium", confidence: "High", yield: 4.5 },
    { rank: 5, crop: "Maize", revenue: 72000, score: 78, risk: "Low", confidence: "Medium", yield: 3.8 }
  ]
};

export const getAnalyticsData = async (filters) => {
  try {
    const response = await api.post("/analytics/overview", filters);
    // Return real data if available, otherwise assume response.data is the payload
    return response.data.summary ? response.data : MOCK_ANALYTICS_DATA;
  } catch (error) {
    console.warn("Analytics API failed, using mock data for dashboard visualization", error);
    // Simulate network delay
    return new Promise(resolve => setTimeout(() => resolve(MOCK_ANALYTICS_DATA), 800));
  }
};
