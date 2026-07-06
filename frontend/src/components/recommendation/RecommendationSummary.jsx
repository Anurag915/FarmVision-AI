import {
    FaLeaf,
    FaRupeeSign,
    FaChartLine
} from "react-icons/fa";

import RiskBadge from "./RiskBadge";
import ConfidenceBadge from "./ConfidenceBadge";

function RecommendationSummary({ recommendation }) {

    if (!recommendation) {

        return (

            <div className="h-full flex items-center justify-center text-gray-400">

                Make a prediction to see the best crop.

            </div>

        );

    }

    return (

        <div>

            <p className="text-green-600 font-semibold uppercase">
                Best Recommendation
            </p>

            <h2 className="text-4xl font-bold mt-2">
                🌾 {recommendation.Crop}
            </h2>

            <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-gray-50 rounded-xl p-5">

                    <FaChartLine className="text-green-600 text-2xl mb-3"/>

                    <p className="text-gray-500">
                        Recommendation Score
                    </p>

                    <h3 className="text-2xl font-bold">

                        {recommendation.Recommendation_Score.toFixed(2)}

                    </h3>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                    <FaRupeeSign className="text-green-600 text-2xl mb-3"/>

                    <p className="text-gray-500">
                        Expected Revenue
                    </p>

                    <h3 className="text-2xl font-bold">

                        ₹{Math.round(
                            recommendation.Average_Revenue
                        ).toLocaleString()}

                    </h3>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                    <FaLeaf className="text-green-600 text-2xl mb-3"/>

                    <p className="text-gray-500">

                        Predicted Yield

                    </p>

                    <h3 className="text-2xl font-bold">

                        {recommendation.Predicted_Yield.toFixed(2)}

                    </h3>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                    <div className="flex gap-3">

                        <RiskBadge
                            risk={recommendation.Risk}
                        />

                        <ConfidenceBadge
                            confidence={recommendation.Confidence}
                        />

                    </div>

                </div>

            </div>

            <div className="mt-8 rounded-xl bg-green-50 border border-green-200 p-5">

                <h3 className="font-semibold mb-2">

                    AI Explanation

                </h3>

                <p className="text-gray-700">

                    {recommendation.Explanation}

                </p>

            </div>

        </div>

    );

}

export default RecommendationSummary;