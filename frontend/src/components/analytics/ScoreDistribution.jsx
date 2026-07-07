import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

function ScoreDistribution({ data }) {
  if (!data || data.length === 0) return null;

  // Ensure data is sorted by score for the top 10
  const sortedData = [...data].sort((a, b) => b.score - a.score).slice(0, 10);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.crop}</p>
          <p className="text-gray-600 font-medium">
            Score: <span className="text-emerald-600 font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col min-h-[400px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recommendation Scores</h2>
        <p className="text-sm text-gray-500 mt-1">Top crops ranked by AI recommendation score.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
            <XAxis 
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              dataKey="crop" 
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#374151', fontSize: 13, fontWeight: 500 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
            <Bar dataKey="score" radius={[0, 6, 6, 0]} animationDuration={1500}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ScoreDistribution;
