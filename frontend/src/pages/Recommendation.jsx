import { motion } from "framer-motion";
import PageHeader from "../components/layout/PageHeader";
import RecommendationForm from "../components/recommendation/RecommendationForm";
import useRecommendation from "../hooks/useRecommendation";
import RecommendationTable from "../components/recommendation/RecommendationTable";
import RevenueChart from "../components/recommendation/RevenueChart";
import ExplanationCard from "../components/recommendation/ExplanationCard";
import LoadingSkeleton from "../components/recommendation/LoadingSkeleton";
import { FaSeedling } from "react-icons/fa";

function Recommendation() {
  const { loading, recommendations, predict } = useRecommendation();

  const hasRecommendations = recommendations && recommendations.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
          title="Crop Recommendation"
          description="Use AI-powered forecasting to recommend the most profitable crop for a given location."
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Form ALWAYS stays mounted at the top horizontally */}
        <motion.div variants={itemVariants}>
          <RecommendationForm onSubmit={predict} loading={loading} />
        </motion.div>

        {loading ? (
          <motion.div variants={itemVariants}>
            <LoadingSkeleton />
          </motion.div>
        ) : !hasRecommendations ? (
          <motion.div variants={itemVariants}>
            <div className="w-full bg-white rounded-2xl border border-dashed border-gray-300 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <FaSeedling className="text-4xl text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready for Prediction</h3>
              <p className="text-gray-500 max-w-sm">
                Enter crop details in the form above to receive AI-powered recommendations tailored for your location.
              </p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <motion.div variants={itemVariants} className="xl:col-span-8 min-w-0">
                <RevenueChart recommendations={recommendations} />
              </motion.div>
              <motion.div variants={itemVariants} className="xl:col-span-4 flex min-w-0">
                <div className="w-full h-full">
                  <ExplanationCard explanation={recommendations[0]?.Explanation} />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="min-w-0">
              <RecommendationTable recommendations={recommendations} />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Recommendation;
