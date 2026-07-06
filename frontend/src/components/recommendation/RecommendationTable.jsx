import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import RiskBadge from "./RiskBadge";
import ConfidenceBadge from "./ConfidenceBadge";
import SearchToolbar from "./SearchToolbar";

function RecommendationTable({ recommendations }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecommendations = useMemo(() => {
    if (!recommendations) return [];
    return recommendations.filter(crop => 
      crop.Crop.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recommendations, searchTerm]);

  if (!recommendations || recommendations.length === 0) return null;

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 font-bold text-lg">🥇</span>;
    if (rank === 2) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold text-lg">🥈</span>;
    if (rank === 3) return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-lg">🥉</span>;
    return <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500 font-medium">{rank}</span>;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-w-0 w-full overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">All Recommendations</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed breakdown of predicted crops.</p>
        </div>
      </div>

      <SearchToolbar 
        recommendations={recommendations} 
        onSearch={setSearchTerm} 
      />

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Rank</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Crop</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Revenue (₹)</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Score</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Yield</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Risk</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">Confidence</th>
            </tr>
          </thead>
          
          <motion.tbody 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white divide-y divide-gray-200"
          >
            {filteredRecommendations.length > 0 ? (
              filteredRecommendations.slice(0, 10).map((crop) => (
                <motion.tr
                  variants={item}
                  key={crop.Rank}
                  className="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRankBadge(crop.Rank)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{crop.Crop}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                    ₹{Math.round(crop.Average_Revenue).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {crop.Recommendation_Score.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {crop.Predicted_Yield.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge risk={crop.Risk} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ConfidenceBadge confidence={crop.Confidence} />
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  No crops found matching your search.
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

export default RecommendationTable;
