import { useMemo } from "react";
import { FaBrain, FaRegLightbulb, FaCheckCircle, FaChartLine, FaShieldAlt } from "react-icons/fa";

function InsightsPanel({ data }) {
  const insights = useMemo(() => {
    if (!data) return [];
    
    const results = [];
    
    // Highest Revenue Crop
    if (data.revenueComparison && data.revenueComparison.length > 0) {
      const highestRevenue = [...data.revenueComparison].sort((a, b) => b.revenue - a.revenue)[0];
      results.push({
        title: "Highest Revenue Potential",
        desc: `${highestRevenue.crop} is projected to generate the maximum revenue of ₹${highestRevenue.revenue.toLocaleString()}, making it the most lucrative short-term choice.`,
        icon: FaChartLine,
        color: "text-emerald-600",
        bg: "bg-emerald-100"
      });
    }

    // Best Investment / Highest Score
    if (data.topCrops && data.topCrops.length > 0) {
      const bestCrop = data.topCrops[0]; // Already ranked
      results.push({
        title: "Optimal AI Recommendation",
        desc: `${bestCrop.crop} ranks #1 overall with a score of ${bestCrop.score}/100, balancing high yield (${bestCrop.yield} t/ha) with ${bestCrop.risk.toLowerCase()} risk.`,
        icon: FaBrain,
        color: "text-indigo-600",
        bg: "bg-indigo-100"
      });
    }

    // Lowest Risk
    if (data.topCrops && data.topCrops.length > 0) {
      const lowRiskCrops = data.topCrops.filter(c => c.risk === "Low");
      if (lowRiskCrops.length > 0) {
        const safest = lowRiskCrops.sort((a, b) => b.score - a.score)[0];
        results.push({
          title: "Safest Investment",
          desc: `${safest.crop} offers the most stable return profile with low associated risks and high model confidence.`,
          icon: FaShieldAlt,
          color: "text-blue-600",
          bg: "bg-blue-100"
        });
      }
    }

    // Production Growth
    if (data.productionTrend && data.productionTrend.length > 1) {
      const start = data.productionTrend[0].production;
      const end = data.productionTrend[data.productionTrend.length - 1].production;
      const trendStr = end > start ? "an upward" : "a downward";
      results.push({
        title: "Production Outlook",
        desc: `Macro production volumes are showing ${trendStr} trajectory over the forecasted period, ending at ${end.toFixed(0)} tonnes.`,
        icon: FaCheckCircle,
        color: "text-purple-600",
        bg: "bg-purple-100"
      });
    }

    return results;
  }, [data]);

  if (!insights || insights.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-100 rounded-xl">
          <FaRegLightbulb className="text-indigo-600 text-xl" />
        </div>
        <h3 className="text-xl font-bold text-indigo-900">AI Synthesized Insights</h3>
      </div>
      
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-indigo-50 shadow-sm flex gap-4 items-start">
            <div className={`p-2 rounded-lg ${insight.bg} shrink-0 mt-0.5`}>
              <insight.icon className={`${insight.color}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{insight.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsightsPanel;
