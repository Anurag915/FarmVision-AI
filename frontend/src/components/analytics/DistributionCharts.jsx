import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const RISK_COLORS = {
  'Low': '#10B981', // Green
  'Medium': '#F59E0B', // Yellow/Orange
  'High': '#EF4444' // Red
};

const CONFIDENCE_COLORS = {
  'High': '#3B82F6', // Blue
  'Medium': '#8B5CF6', // Purple
  'Low': '#6B7280' // Gray
};

function DistributionCharts({ riskData, confidenceData }) {
  if (!riskData || !confidenceData) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-gray-600 font-medium">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Risk Distribution */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Risk Distribution</h2>
          <p className="text-sm text-gray-500 mt-1">Breakdown of crop recommendations by risk level.</p>
        </div>
        <div className="flex-1 w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.name] || '#CBD5E1'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confidence Distribution */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col min-h-[350px]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Model Confidence</h2>
          <p className="text-sm text-gray-500 mt-1">AI confidence levels across all predictions.</p>
        </div>
        <div className="flex-1 w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={confidenceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                animationDuration={1000}
              >
                {confidenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CONFIDENCE_COLORS[entry.name] || '#CBD5E1'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DistributionCharts;
