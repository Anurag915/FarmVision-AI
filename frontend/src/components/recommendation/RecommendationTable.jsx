import RiskBadge from "./RiskBadge";
import ConfidenceBadge from "./ConfidenceBadge";

function RecommendationTable({ recommendations }) {
  if (!recommendations.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        No recommendations yet.
      </div>
    );
  }

  const getRank = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";

    return rank;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Crop Recommendations</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 text-left">Rank</th>

              <th className="py-4 text-left">Crop</th>

              <th className="py-4 text-left">Revenue</th>

              <th className="py-4 text-left">Score</th>

              <th className="py-4 text-left">Risk</th>

              <th className="py-4 text-left">Confidence</th>

              <th className="py-4 text-left">Yield</th>
            </tr>
          </thead>

          <tbody>
            {recommendations.map((crop) => (
              <tr
                key={crop.Rank}
                className="border-b hover:bg-green-50 transition"
              >
                <td className="py-4">{getRank(crop.Rank)}</td>

                <td className="font-semibold">{crop.Crop}</td>

                <td>₹{Math.round(crop.Average_Revenue).toLocaleString()}</td>

                <td>{crop.Recommendation_Score.toFixed(2)}</td>

                <td>
                  <RiskBadge risk={crop.Risk} />
                </td>

                <td>
                  <ConfidenceBadge confidence={crop.Confidence} />
                </td>

                <td>{crop.Predicted_Yield.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecommendationTable;
