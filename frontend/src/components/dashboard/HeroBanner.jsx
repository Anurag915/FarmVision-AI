import { motion } from "framer-motion";
import { FaSeedling } from "react-icons/fa";

function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl p-10 text-white overflow-hidden relative bg-gradient-to-r from-green-700 via-green-600 to-emerald-500"
    >
      <div className="absolute right-10 top-6 text-[170px] opacity-10">
        <FaSeedling />
      </div>

      <h1 className="text-5xl font-bold">
        AI Agriculture
      </h1>

      <p className="mt-4 text-xl max-w-3xl leading-8">
        Predict crop production, forecast market prices and
        recommend the most profitable crop using Artificial
        Intelligence.
      </p>

      <div className="mt-8 flex gap-4">

        <button className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Get Started
        </button>

        <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-green-700 transition">
          Learn More
        </button>

      </div>

    </motion.div>
  );
}

export default HeroBanner;