import { useMemo } from "react";
import { FaBrain, FaRegLightbulb } from "react-icons/fa6";

function ProductionInsights({ forecast, state, crop, area = 1 }) {
  const insights = useMemo(() => {
    if (!forecast || forecast.length === 0) return null;

    const productions = forecast.map((f) => f.Predicted_Production);
    const highest = Math.max(...productions);
    const lowest = Math.min(...productions);
    
    const highestItem = forecast.find(f => f.Predicted_Production === highest);
    const lowestItem = forecast.find(f => f.Predicted_Production === lowest);

    const highestYear = highestItem.Year;
    const lowestYear = lowestItem.Year;

    const startProd = productions[0];
    const endProd = productions[productions.length - 1];
    
    let trend = "stable";
    if (endProd > startProd * 1.05) trend = "increasing";
    if (endProd < startProd * 0.95) trend = "decreasing";

    // Calculate Yield Trend
    const startYield = startProd / area;
    const endYield = endProd / area;
    let yieldTrend = "stable";
    if (endYield > startYield * 1.05) yieldTrend = "improving";
    if (endYield < startYield * 0.95) yieldTrend = "declining";

    const totalYears = forecast.length;

    let explanation = `Based on AI forecasting models, the production of ${crop} in ${state} is expected to show a ${trend} trend over the next ${totalYears} years. `;
    explanation += `The highest production is anticipated in ${highestYear} reaching ${highest.toFixed(2)} tonnes. `;
    if (yieldTrend !== "stable") {
      explanation += `Additionally, the crop yield is projected to be ${yieldTrend} over this period. `;
    }
    explanation += `Farmers and stakeholders should utilize these predictions to optimize supply chain and storage planning.`;

    return { explanation, trend, yieldTrend };
  }, [forecast, state, crop, area]);

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
          <h3 className="text-xl font-bold text-indigo-900">AI Production Insights</h3>
        </div>
        
        <p className="text-indigo-800 leading-relaxed text-lg flex-1">
          {insights.explanation}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="px-3 py-1.5 bg-white text-indigo-700 rounded-lg text-sm font-semibold shadow-sm border border-indigo-50 capitalize">
            {insights.trend} Production
          </span>
          <span className="px-3 py-1.5 bg-white text-indigo-700 rounded-lg text-sm font-semibold shadow-sm border border-indigo-50 capitalize">
            {insights.yieldTrend} Yield
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductionInsights;
