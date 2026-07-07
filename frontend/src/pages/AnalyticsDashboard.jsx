import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import StatsCards from "../components/analytics/StatsCards";
import RevenueChart from "../components/analytics/RevenueChart";
import PriceTrendChart from "../components/analytics/PriceTrendChart";
import ProductionTrendChart from "../components/analytics/ProductionTrendChart";
import DistributionCharts from "../components/analytics/DistributionCharts";
import ScoreDistribution from "../components/analytics/ScoreDistribution";
import TopCropTable from "../components/analytics/TopCropTable";
import InsightsPanel from "../components/analytics/InsightsPanel";
import ForecastSummary from "../components/analytics/ForecastSummary";
import LoadingSkeleton from "../components/analytics/LoadingSkeleton";
import useAnalytics from "../hooks/useAnalytics";
import { FaChartPie } from "react-icons/fa";

function AnalyticsDashboard() {
  const { loading, data, fetchData, error } = useAnalytics();
  const [hasSearched, setHasSearched] = useState(false);

  const handleApplyFilters = async (filters) => {
    setHasSearched(true);
    await fetchData(filters);
  };

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

  // If no data and not loading, show empty state (if initial load has no data)
  const isDataEmpty = !data || Object.keys(data).length === 0;

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <PageHeader
          title="Analytics Dashboard"
          description="Visualize AI-powered agricultural insights and forecast analytics."
        />
      </motion.div>

      <AnalyticsFilters onApply={handleApplyFilters} loading={loading} />

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSkeleton />
      ) : isDataEmpty ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="w-full bg-white rounded-2xl border border-dashed border-gray-300 p-16 flex flex-col items-center justify-center text-center min-h-[500px]"
        >
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <FaChartPie className="text-5xl text-indigo-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Analytics Available</h3>
          <p className="text-gray-500 max-w-md text-lg">
            Apply filters or generate new predictions to visualize agricultural insights and trends.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <StatsCards summary={data.summary} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ForecastSummary summary={data.summary} />
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <RevenueChart data={data.revenueComparison} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ScoreDistribution data={data.scoreDistribution} />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <PriceTrendChart data={data.priceTrend} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProductionTrendChart data={data.productionTrend} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <DistributionCharts 
              riskData={data.riskDistribution} 
              confidenceData={data.confidenceDistribution} 
            />
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <motion.div variants={itemVariants} className="xl:col-span-8 min-w-0">
              <TopCropTable data={data.topCrops} />
            </motion.div>
            <motion.div variants={itemVariants} className="xl:col-span-4 min-w-0">
              <InsightsPanel data={data} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
