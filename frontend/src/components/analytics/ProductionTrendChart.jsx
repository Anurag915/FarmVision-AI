import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ProductionTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].payload.year}</p>
          <p className="text-emerald-600 font-medium">
            {payload[0].value.toFixed(2)} tonnes
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col min-h-[400px]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Production Trend</h2>
        <p className="text-sm text-gray-500 mt-1">Predicted crop production volumes.</p>
      </div>
      
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorProdAnalytics" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="production"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorProdAnalytics)"
              animationDuration={1500}
              activeDot={{ r: 6, fill: '#059669', stroke: '#D1FAE5', strokeWidth: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProductionTrendChart;
