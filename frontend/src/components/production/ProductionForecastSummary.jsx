import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaTractor, FaSeedling, FaChartPie, FaCalendarDays } from "react-icons/fa6";

function ProductionForecastSummary({ forecast, area = 1 }) {
  const stats = useMemo(() => {
    if (!forecast || forecast.length === 0) return null;

    const productions = forecast.map((f) => f.Predicted_Production);
    const maxProd = Math.max(...productions);
    const minProd = Math.min(...productions);
    const averageProd = productions.reduce((a, b) => a + b, 0) / productions.length;
    
    // Average yield across the forecast (Production / Area)
    const averageYield = averageProd / (area || 1);

    const startYear = forecast[0].Year;
    const endYear = forecast[forecast.length - 1].Year;
    const period = `${startYear} - ${endYear}`;
    const predictionCount = forecast.length;

    return { maxProd, minProd, averageProd, averageYield, period, predictionCount };
  }, [forecast, area]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Average Production */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all min-w-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
            <FaChartPie className="text-emerald-600 text-lg"/>
          </div>
          <p className="text-sm font-medium text-emerald-800 truncate">Avg Production</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 truncate relative z-10">
          {stats.averageProd.toFixed(2)} <span className="text-sm font-medium text-gray-500">tonnes</span>
        </h3>
        <div className="absolute -bottom-4 -right-4 text-green-500 opacity-10 text-7xl rotate-12">
          <FaChartPie />
        </div>
      </motion.div>

      {/* Max Production */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all min-w-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
            <FaTractor className="text-cyan-600 text-lg"/>
          </div>
          <p className="text-sm font-medium text-cyan-800 truncate">Max Production</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 truncate relative z-10">
          {stats.maxProd.toFixed(2)} <span className="text-sm font-medium text-gray-500">tonnes</span>
        </h3>
        <div className="absolute -bottom-4 -right-4 text-cyan-500 opacity-10 text-7xl -rotate-12">
          <FaTractor />
        </div>
      </motion.div>

      {/* Average Yield */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all min-w-0 overflow-hidden relative">
        <div className="flex items-center gap-3 mb-3 relative z-10">
          <div className="p-2 bg-white rounded-lg shrink-0 shadow-sm">
            <FaSeedling className="text-orange-600 text-lg"/>
          </div>
          <p className="text-sm font-medium text-orange-800 truncate">Average Yield</p>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 truncate relative z-10">
          {stats.averageYield.toFixed(2)} <span className="text-sm font-medium text-gray-500">t/ha</span>
        </h3>
        <div className="absolute -bottom-4 -right-4 text-orange-500 opacity-10 text-7xl -rotate-12">
          <FaSeedling />
        </div>
      </motion.div>

      {/* Forecast Period */}
      <motion.div whileHover={{ y: -2 }} className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100 shadow-sm rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-center min-w-0 overflow-hidden relative">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-sm font-medium text-purple-800">
              <FaCalendarDays />
              <span className="truncate">{stats.period}</span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-white rounded-md shadow-sm text-purple-700">
              {stats.predictionCount} yrs
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-800 truncate mt-4 mb-1">Min Production</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900 truncate">
                {stats.minProd.toFixed(2)} <span className="text-sm font-medium text-gray-500">tonnes</span>
              </h3>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductionForecastSummary;
