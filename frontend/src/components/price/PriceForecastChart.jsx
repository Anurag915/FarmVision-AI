import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PriceForecastChart({ forecast }) {
  const chartData = useMemo(() => {
    if (!forecast) return [];
    
    return forecast.map((item) => {
      const date = new Date(item.Year, item.Month - 1);
      return {
        name: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
        Price: item.Predicted_Price,
        fullDate: date.toLocaleString('default', { month: 'long', year: 'numeric' })
      };
    });
  }, [forecast]);

  if (!forecast || forecast.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.fullDate}</p>
          <p className="text-green-600 font-medium">
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
        <h2 className="text-xl font-semibold text-gray-900">Price Trend Forecast</h2>
        <p className="text-sm text-gray-500 mt-1">Projected price trajectory over the requested period.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
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
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Line
              type="monotone"
              dataKey="Price"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#059669', stroke: '#D1FAE5', strokeWidth: 4 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PriceForecastChart;
