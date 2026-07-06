import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaArrowTrendUp, FaArrowTrendDown, FaCoins, FaCalendarDays } from "react-icons/fa6";

function PriceForecastSummary({ forecast }) {
  const stats = useMemo(() => {
    if (!forecast || forecast.length === 0) return null;

    const prices = forecast.map((f) => f.Predicted_Price);
    const highest = Math.max(...prices);
    const lowest = Math.min(...prices);
    const average = prices.reduce((a, b) => a + b, 0) / prices.length;
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const growth = ((endPrice - startPrice) / startPrice) * 100;
    const totalMonths = forecast.length;

    const formatMonthYear = (item) => {
      const date = new Date(item.Year, item.Month - 1);
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    };
    const period = `${formatMonthYear(forecast[0])} - ${formatMonthYear(forecast[forecast.length - 1])}`;

    return { highest, lowest, average, growth, period, totalMonths };
  }, [forecast]);

  if (!stats) return null;

  const isPositiveGrowth = stats.growth >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Highest Price */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all min-w-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
            <FaArrowTrendUp className="text-emerald-600 text-lg"/>
          </div>
          <p className="text-sm font-medium text-emerald-800 truncate">Highest Price</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 truncate relative z-10">
          ₹{stats.highest.toFixed(2)}
        </h3>
        <div className="absolute -bottom-4 -right-4 text-green-500 opacity-10 text-7xl rotate-12">
          <FaArrowTrendUp />
        </div>
      </motion.div>

      {/* Lowest Price */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all min-w-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
            <FaArrowTrendDown className="text-amber-600 text-lg"/>
          </div>
          <p className="text-sm font-medium text-amber-800 truncate">Lowest Price</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 truncate relative z-10">
          ₹{stats.lowest.toFixed(2)}
        </h3>
        <div className="absolute -bottom-4 -right-4 text-orange-500 opacity-10 text-7xl -rotate-12">
          <FaArrowTrendDown />
        </div>
      </motion.div>

      {/* Average Price */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all min-w-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
            <FaCoins className="text-blue-600 text-lg"/>
          </div>
          <p className="text-sm font-medium text-blue-800 truncate">Average Price</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 truncate relative z-10">
          ₹{stats.average.toFixed(2)}
        </h3>
        <div className="absolute -bottom-4 -right-4 text-blue-500 opacity-10 text-7xl -rotate-12">
          <FaCoins />
        </div>
      </motion.div>

      {/* Growth & Period */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-center min-w-0 overflow-hidden relative">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-sm font-medium text-purple-800">
              <FaCalendarDays />
              <span className="truncate">{stats.period}</span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-white rounded-md shadow-sm text-purple-700">
              {stats.totalMonths} mos
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-800 truncate mt-4 mb-1">Forecasted Growth</p>
            <div className="flex items-baseline gap-2">
              <h3 className={`text-2xl font-bold truncate ${isPositiveGrowth ? 'text-emerald-600' : 'text-red-600'}`}>
                {isPositiveGrowth ? '+' : ''}{stats.growth.toFixed(2)}%
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PriceForecastSummary;
