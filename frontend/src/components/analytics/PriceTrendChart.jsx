import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PriceTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.month}</p>
          <p className="text-purple-600 font-medium">
            ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col min-h-[400px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Price Trend</h2>
        <p className="text-sm text-gray-500 mt-1">Monthly predicted price variations.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8B5CF6', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#6D28D9', stroke: '#EDE9FE', strokeWidth: 4 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PriceTrendChart;
