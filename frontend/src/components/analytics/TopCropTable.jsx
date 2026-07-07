import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFileCsv, FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Papa from "papaparse";

function TopCropTable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const processedData = useMemo(() => {
    if (!data) return [];
    
    let sortableItems = [...data];

    // Search
    if (searchTerm) {
      sortableItems = sortableItems.filter(item => 
        item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.risk.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
    }
    return <FaSort className="ml-1 opacity-40 hover:opacity-100" />;
  };

  const handleExport = () => {
    if (!processedData || processedData.length === 0) return;
    
    const csvData = processedData.map(r => ({
      Rank: r.rank,
      Crop: r.crop,
      'Revenue (₹)': r.revenue,
      'Rec Score': r.score,
      Risk: r.risk,
      Confidence: r.confidence,
      'Yield (t/ha)': r.yield
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'top_crops_analytics.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-w-0 w-full overflow-hidden flex flex-col h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Top Performing Crops</h2>
          <p className="text-sm text-gray-500 mt-1">Detailed comparison of AI-recommended crops.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search crops..."
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 text-sm transition"
            />
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shrink-0"
          >
            <FaFileCsv className="text-gray-500" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 flex-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('rank')}>
                <div className="flex items-center">Rank {getSortIcon('rank')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('crop')}>
                <div className="flex items-center">Crop {getSortIcon('crop')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('revenue')}>
                <div className="flex items-center">Revenue {getSortIcon('revenue')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('score')}>
                <div className="flex items-center">Rec Score {getSortIcon('score')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('risk')}>
                <div className="flex items-center">Risk {getSortIcon('risk')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('confidence')}>
                <div className="flex items-center">Confidence {getSortIcon('confidence')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('yield')}>
                <div className="flex items-center">Yield {getSortIcon('yield')}</div>
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length > 0 ? (
              currentData.map((row) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={row.rank}
                  className="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-bold">#{row.rank}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.crop}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-600">
                    ₹{row.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {row.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      row.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      row.risk === 'High' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      row.confidence === 'High' ? 'bg-indigo-100 text-indigo-800' :
                      row.confidence === 'Low' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {row.confidence}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-medium">
                    {row.yield} t/ha
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  No crops found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, processedData.length)}</span> of <span className="font-medium">{processedData.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopCropTable;
