import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaLeaf, FaMoneyBillWave, FaChartLine, FaTractor, FaStar, FaSeedling } from "react-icons/fa";

function CountUp({ to, value, decimals = 0, prefix = "", suffix = "" }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

function StatsCards({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      title: "Recommended Crops",
      value: summary.recommendedCrops,
      icon: FaLeaf,
      color: "from-emerald-50 to-green-50",
      iconColor: "text-emerald-600",
      bgIconColor: "bg-white",
      border: "border-emerald-100",
      decimals: 0
    },
    {
      title: "Highest Revenue",
      value: summary.highestRevenue,
      icon: FaMoneyBillWave,
      color: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
      bgIconColor: "bg-white",
      border: "border-blue-100",
      prefix: "₹",
      decimals: 0
    },
    {
      title: "Highest Price",
      value: summary.highestPrice,
      icon: FaChartLine,
      color: "from-purple-50 to-fuchsia-50",
      iconColor: "text-purple-600",
      bgIconColor: "bg-white",
      border: "border-purple-100",
      prefix: "₹",
      decimals: 0
    },
    {
      title: "Highest Production",
      value: summary.highestProduction,
      icon: FaTractor,
      color: "from-amber-50 to-orange-50",
      iconColor: "text-amber-600",
      bgIconColor: "bg-white",
      border: "border-amber-100",
      suffix: " t",
      decimals: 0
    },
    {
      title: "Avg Score",
      value: summary.averageScore,
      icon: FaStar,
      color: "from-rose-50 to-pink-50",
      iconColor: "text-rose-600",
      bgIconColor: "bg-white",
      border: "border-rose-100",
      suffix: "/100",
      decimals: 1
    },
    {
      title: "Avg Yield",
      value: summary.averageYield,
      icon: FaSeedling,
      color: "from-cyan-50 to-sky-50",
      iconColor: "text-cyan-600",
      bgIconColor: "bg-white",
      border: "border-cyan-100",
      suffix: " t/ha",
      decimals: 1
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          variants={itemAnim}
          whileHover={{ y: -4 }}
          className={`bg-gradient-to-br ${card.color} border ${card.border} shadow-sm rounded-2xl p-5 hover:shadow-md transition-all relative overflow-hidden flex flex-col`}
        >
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className={`p-2 ${card.bgIconColor} rounded-lg shadow-sm shrink-0`}>
              <card.icon className={`${card.iconColor} text-lg`} />
            </div>
            <h4 className="text-sm font-medium text-gray-700 truncate">{card.title}</h4>
          </div>
          
          <div className="relative z-10 flex-1 flex items-end">
            <h3 className="text-2xl font-bold text-gray-900 truncate">
              <CountUp 
                value={card.value} 
                decimals={card.decimals} 
                prefix={card.prefix} 
                suffix={card.suffix} 
              />
            </h3>
          </div>
          
          <div className={`absolute -bottom-4 -right-4 ${card.iconColor} opacity-5 text-7xl -rotate-12`}>
            <card.icon />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default StatsCards;
