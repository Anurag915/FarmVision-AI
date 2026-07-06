import PageHeader from "../components/layout/PageHeader";
import RecommendationForm from "../components/recommendation/RecommendationForm";
import useRecommendation from "../hooks/useRecommendation";
import RecommendationSummary from "../components/recommendation/RecommendationSummary";
import RecommendationTable from "../components/recommendation/RecommendationTable";

function Recommendation() {
  const { loading, recommendations, predict } = useRecommendation();
  return (
    <>
      <PageHeader
        title="Crop Recommendation"
        description="Recommend the most profitable crop using AI forecasting."
      />

      <div className="grid grid-cols-12 gap-6">
        <RecommendationForm onSubmit={predict} loading={loading} />
        <div className="col-span-8 bg-white rounded-2xl p-6 shadow">
          <RecommendationSummary recommendation={recommendations[0]} />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow">
        <RecommendationTable recommendations={recommendations} />
      </div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow">Revenue Chart</div>

      <div className="mt-8 bg-white rounded-2xl p-6 shadow">AI Explanation</div>
    </>
  );
}

export default Recommendation;
