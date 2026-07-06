import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import PriceForecastForm from "../components/price/PriceForecastForm";
import PriceForecastSummary from "../components/price/PriceForecastSummary";
import PriceForecastChart from "../components/price/PriceForecastChart";
import PriceForecastTable from "../components/price/PriceForecastTable";
import PriceForecastInsights from "../components/price/PriceForecastInsights";
import LoadingSkeleton from "../components/price/LoadingSkeleton";
import usePriceForecast from "../hooks/usePriceForecast";
import { FaChartArea } from "react-icons/fa";

function PriceForecast() {
  const { loading, forecast, predict, error } = usePriceForecast();
  
  // Track the most recent payload for use in Insights
  const [currentRequest, setCurrentRequest] = useState(null);

  const handlePredict = async (payload) => {
    setCurrentRequest(payload);
    await predict(payload);
  };

  const hasForecast = forecast && forecast.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <PageHeader
          title="Price Forecast"
          description="Predict future agricultural market prices using AI."
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Form */}
        <motion.div variants={itemVariants}>
          <PriceForecastForm onSubmit={handlePredict} loading={loading} />
        </motion.div>
        
        {/* Error message */}
        {error && (
          <motion.div variants={itemVariants} className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
            {error}
          </motion.div>
        )}

        {loading ? (
          <motion.div variants={itemVariants}>
            <LoadingSkeleton />
          </motion.div>
        ) : !hasForecast ? (
          /* Empty State */
          <motion.div variants={itemVariants}>
            <div className="w-full bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center min-h-[500px]">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <FaChartArea className="text-5xl text-green-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Market Prediction Model</h3>
              <p className="text-gray-500 max-w-md text-lg">
                Select crop details in the form above to generate an AI-powered forecast of future market prices.
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Summary Cards */}
            <motion.div variants={itemVariants}>
              <PriceForecastSummary forecast={forecast} />
            </motion.div>

            {/* Chart and Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <motion.div variants={itemVariants} className="xl:col-span-8 min-w-0">
                <PriceForecastChart forecast={forecast} />
              </motion.div>
              <motion.div variants={itemVariants} className="xl:col-span-4 min-w-0">
                <PriceForecastInsights 
                  forecast={forecast} 
                  state={currentRequest?.state} 
                  crop={currentRequest?.crop} 
                />
              </motion.div>
            </div>

            {/* Table */}
            <motion.div variants={itemVariants} className="min-w-0">
              <PriceForecastTable forecast={forecast} />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default PriceForecast;