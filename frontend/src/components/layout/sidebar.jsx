import {
  FaHome,
  FaSeedling,
  FaChartLine,
  FaLeaf,
  FaChartBar,
  FaRobot,
  FaInfoCircle,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/",
  },
  {
    title: "Crop Recommendation",
    icon: <FaSeedling />,
    path: "/recommendation",
  },
  {
    title: "Price Forecast",
    icon: <FaChartLine />,
    path: "/price",
  },
  {
    title: "Production Forecast",
    icon: <FaLeaf />,
    path: "/production",
  },
  {
    title: "Analytics",
    icon: <FaChartBar />,
    path: "/analytics",
  },
  {
    title: "AI Models",
    icon: <FaRobot />,
    path: "/models",
  },
  {
    title: "About",
    icon: <FaInfoCircle />,
    path: "/about",
  },
];

function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">

      {/* Logo */}

      <div className="px-6 py-8 border-b border-gray-200">

        <h1 className="text-2xl font-bold text-green-700">
          🌱 AI Agriculture
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Decision Support System
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
              
              ${
                isActive
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-700"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>

            <span className="font-medium">
              {item.title}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-gray-200 p-5">

        <p className="text-xs text-gray-500">
          AI Agriculture DSS
        </p>

        <p className="text-xs text-gray-400 mt-1">
          Version 1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;