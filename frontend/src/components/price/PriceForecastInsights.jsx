import { useMemo } from "react";
import { FaBrain, FaRegLightbulb } from "react-icons/fa6";

function PriceForecastInsights({ forecast, state, crop }) {
  const insights = useMemo(() => {
    if (!forecast || forecast.length === 0) return null;

    const prices = forecast.map((f) => f.Predicted_Price);
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);
    
    const highestItem = forecast.find(f => f.Predicted_Price === highest);
    const lowestItem = forecast.find(f => f.Predicted_Price === lowest);

    const highestMonth = new Date(highestItem.Year, highestItem.Month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    const lowestMonth = new Date(lowestItem.Year, lowestItem.Month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });

    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    
    let trend = "stable";
    if (endPrice > startPrice * 1.05) trend = "increasing";
    if (endPrice < startPrice * 0.95) trend = "decreasing";

    // Calculate basic volatility (std deviation approx)
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    const volatilityPercent = (stdDev / avg) * 100;
    
    let volatilityText = "low";
    if (volatilityPercent > 15) volatilityText = "high";
    else if (volatilityPercent > 5) volatilityText = "moderate";

    const explanation = `Based on our AI models, the price of ${crop} in ${state} is expected to exhibit a ${volatilityText} volatility with an overall ${trend} trend over the forecasted period. The highest predicted price is ₹${highest.toFixed(2)} occurring in ${highestMonth}, while prices may dip to ₹${lowest.toFixed(2)} around ${lowestMonth}. Farmers should consider these seasonal variations when planning their market sales.`;

    return { explanation, trend, volatilityText };
  }, [forecast, state, crop]);

  if (!insights) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <FaBrain className="text-9xl text-indigo-900" />
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-indigo-100 rounded-xl">
            <FaRegLightbulb className="text-indigo-600 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900">AI Market Insights</h3>
        </div>
        
        <p className="text-indigo-800 leading-relaxed text-lg flex-1">
          {insights.explanation}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="px-3 py-1.5 bg-white text-indigo-700 rounded-lg text-sm font-semibold shadow-sm border border-indigo-50 capitalize">
            {insights.trend} Trend
          </span>
          <span className="px-3 py-1.5 bg-white text-indigo-700 rounded-lg text-sm font-semibold shadow-sm border border-indigo-50 capitalize">
            {insights.volatilityText} Volatility
          </span>
        </div>
      </div>
    </div>
  );
}

export default PriceForecastInsights;
