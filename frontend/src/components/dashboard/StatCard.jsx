import { motion } from "framer-motion";

function StatCard({
  title,
  value,
  icon,
  color,
  trend,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

          <p className="mt-3 text-green-600 font-medium">
            {trend}
          </p>

        </div>

        <div className={`text-5xl ${color}`}>
          {icon}
        </div>

      </div>
    </motion.div>
  );
}

export default StatCard;