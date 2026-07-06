import { motion } from "framer-motion";
import {
    FaLeaf,
    FaRupeeSign,
    FaChartLine,
    FaTrophy
} from "react-icons/fa";

import RiskBadge from "./RiskBadge";
import ConfidenceBadge from "./ConfidenceBadge";

function RecommendationSummary({ recommendation }) {
    if (!recommendation) return null;

    // Normalize score for progress bar (assuming score is out of 10 or 100, let's assume 10 for now based on typical ML scores or we can just use a percentage if we know the max)
    // Actually, looking at typical outputs, let's just make a progress bar based on confidence for visual flair, or score / max_score. 
    // If score is e.g. 8.5, (8.5/10)*100
    const scorePercent = Math.min(100, (recommendation.Recommendation_Score / 10) * 100);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col justify-center min-w-0"
        >
            <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center p-2 bg-green-100 rounded-lg">
                    <FaTrophy className="text-green-600 text-xl" />
                </span>
                <p className="text-green-600 font-semibold tracking-wide uppercase text-sm">
                    Top Recommendation
                </p>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mt-1 mb-6 tracking-tight break-words whitespace-normal">
                {recommendation.Crop}
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <motion.div whileHover={{ y: -2 }} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-all min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                            <FaChartLine className="text-gray-500 text-sm"/>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Score</p>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                        {recommendation.Recommendation_Score.toFixed(2)}
                    </h3>
                    <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
                        <div className="bg-green-500 h-1 rounded-full" style={{ width: `${scorePercent}%` }}></div>
                    </div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-all min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                            <FaRupeeSign className="text-gray-500 text-sm"/>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Revenue</p>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                        ₹{Math.round(recommendation.Average_Revenue).toLocaleString()}
                    </h3>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-all min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gray-50 rounded-md shrink-0">
                            <FaLeaf className="text-gray-500 text-sm"/>
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Yield</p>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 truncate">
                        {recommendation.Predicted_Yield.toFixed(2)}
                    </h3>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="bg-white border border-gray-100 shadow-sm rounded-xl p-4 hover:shadow-md transition-all flex flex-col justify-center min-w-0 overflow-hidden">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center gap-2">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Risk</span>
                            <div className="shrink-0"><RiskBadge risk={recommendation.Risk} /></div>
                        </div>
                        <div className="flex justify-between items-center gap-2">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Confidence</span>
                            <div className="shrink-0"><ConfidenceBadge confidence={recommendation.Confidence} /></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default RecommendationSummary;