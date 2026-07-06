import { motion } from "framer-motion";

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
    >
      <div className="text-5xl text-green-600 mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-500 leading-7">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;