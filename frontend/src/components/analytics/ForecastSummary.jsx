import { motion } from "framer-motion";
import { FaChartBar, FaPercent } from "react-icons/fa";

function ForecastSummary({ summary }) {
  if (!summary) return null;

  const data = [
    { label: "Average Revenue", value: "₹1,25,000", growth: "+12.5%", positive: true },
    { label: "Average Production", value: "345 tonnes", growth: "+5.2%", positive: true },
    { label: "Average Price", value: "₹2,850", growth: "-1.5%", positive: false },
    { label: "Rec Score Avg", value: "82.5/100", growth: "+4.1%", positive: true },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <FaChartBar className="text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Forecast Aggregate Summary</h2>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100"
      >
        {data.map((item, idx) => (
          <motion.div key={idx} variants={itemAnim} className="pt-4 md:pt-0 md:px-6 first:pl-0 last:pr-0">
            <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
              <div className={`flex items-center text-sm font-semibold mb-1 ${item.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {item.growth}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ForecastSummary;
