import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function QuickAction({
  title,
  to,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
      }}
    >
      <Link
        to={to}
        className="block text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white py-5 font-semibold shadow-md"
      >
        {title}
      </Link>
    </motion.div>
  );
}

export default QuickAction;