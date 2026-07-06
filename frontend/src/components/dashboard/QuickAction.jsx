import { Link } from "react-router-dom";

function QuickAction({
  title,
  to,
}) {
  return (
    <Link
      to={to}
      className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-4 text-center font-medium transition"
    >
      {title}
    </Link>
  );
}

export default QuickAction;