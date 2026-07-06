import { FaSearch, FaFileCsv } from "react-icons/fa";
import Papa from "papaparse";

function SearchToolbar({ recommendations, onSearch }) {
  
  const handleExport = () => {
    if (!recommendations || recommendations.length === 0) return;
    
    const csvData = recommendations.map(r => ({
      Rank: r.Rank,
      Crop: r.Crop,
      'Recommendation Score': r.Recommendation_Score.toFixed(2),
      'Average Revenue (₹)': Math.round(r.Average_Revenue),
      'Predicted Yield': r.Predicted_Yield.toFixed(2),
      Risk: r.Risk,
      Confidence: r.Confidence
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'crop_recommendations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <div className="relative w-full sm:w-72">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search crops..."
          onChange={(e) => onSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>
      
      <button
        onClick={handleExport}
        disabled={!recommendations || recommendations.length === 0}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <FaFileCsv className="text-gray-500" />
        Export CSV
      </button>
    </div>
  );
}

export default SearchToolbar;
