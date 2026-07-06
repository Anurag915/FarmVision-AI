import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function ExplanationCard({ explanation }) {
  if (!explanation) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FaCheckCircle className="text-green-500" />
        AI Reasoning
      </h3>
      
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 min-w-0">
        <p className="text-gray-700 leading-relaxed break-words whitespace-normal">
          {explanation}
        </p>
      </div>
    </motion.div>
  );
}

export default ExplanationCard;
