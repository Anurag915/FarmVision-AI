import { motion } from "framer-motion";
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-green-600 font-semibold">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function RevenueChart({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  // Take top 5 crops for better visibility
  const data = recommendations.slice(0, 5).map(item => ({
    name: item.Crop,
    revenue: Math.round(item.Average_Revenue)
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full h-96"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expected Revenue Comparison</h3>
        <p className="text-sm text-gray-500">Top 5 recommended crops (₹)</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `₹${value > 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? '#22c55e' : '#93c5fd'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default RevenueChart;
