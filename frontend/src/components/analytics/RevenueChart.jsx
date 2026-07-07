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

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

function RevenueChart({ data }) {
  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.crop}</p>
          <p className="text-gray-600 font-medium">
            Revenue: <span className="text-indigo-600 font-bold">₹{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col min-h-[400px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Revenue Comparison</h2>
        <p className="text-sm text-gray-500 mt-1">Expected revenue distribution across recommended crops.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="crop" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
