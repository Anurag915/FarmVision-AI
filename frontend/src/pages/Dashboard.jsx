import {
  FaSeedling,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaRobot,
  FaChartLine,
  FaLeaf,
  FaChartBar,
} from "react-icons/fa";

import PageHeader from "../components/layout/PageHeader";
import StatCard from "../components/dashboard/StatCard";
import FeatureCard from "../components/dashboard/FeatureCard";
import QuickAction from "../components/dashboard/QuickAction";
import HeroBanner from "../components/dashboard/HeroBanner";

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboards"
        description="Overview of AI Agriculture Decision Support System."
      />

      <div className="mb-6">
        <HeroBanner />
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Supported Crops"
          value="40+"
          trend="Growing Dataset"
          icon={<FaSeedling />}
          color="text-green-600"
        />

        <StatCard
          title="States"
          value="30+"
          trend="Across India"
          icon={<FaMapMarkedAlt />}
          color="text-blue-600"
        />

        <StatCard
          title="Districts"
          value="240+"
          trend="Agricultural Coverage"
          icon={<FaMapMarkerAlt />}
          color="text-orange-500"
        />

        <StatCard
          title="AI Models"
          value="2"
          trend="CatBoost Models"
          icon={<FaRobot />}
          color="text-purple-600"
        />
      </div>

      {/* Quick Actions */}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-3 gap-6">
          <QuickAction title="Crop Recommendation" to="/recommendation" />

          <QuickAction title="Price Forecast" to="/price" />

          <QuickAction title="Production Forecast" to="/production" />
        </div>
      </div>

      {/* Features */}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Platform Features</h2>

        <div className="grid grid-cols-2 gap-6">
          <FeatureCard
            icon={<FaSeedling />}
            title="Crop Recommendation"
            description="Recommend the most profitable crop using AI-powered forecasting."
          />

          <FeatureCard
            icon={<FaChartLine />}
            title="Price Forecast"
            description="Predict future market prices using CatBoost machine learning."
          />

          <FeatureCard
            icon={<FaLeaf />}
            title="Production Forecast"
            description="Estimate future crop production based on weather and cultivated area."
          />

          <FeatureCard
            icon={<FaChartBar />}
            title="Analytics"
            description="Visualize revenue, production, price trends and risk analysis."
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
