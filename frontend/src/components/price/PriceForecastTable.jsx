import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFileCsv, FaArrowUp, FaArrowDown, FaMinus, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Papa from "papaparse";

function PriceForecastTable({ forecast }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'dateValue', direction: 'asc' });

  // Compute enriched data with previous price for trends
  const enrichedData = useMemo(() => {
    if (!forecast) return [];
    
    return forecast.map((item, index) => {
      const prevPrice = index > 0 ? forecast[index - 1].Predicted_Price : item.Predicted_Price;
      const change = item.Predicted_Price - prevPrice;
      const changePercent = prevPrice > 0 ? (change / prevPrice) * 100 : 0;
      
      const date = new Date(item.Year, item.Month - 1);
      
      return {
        ...item,
        changePercent,
        trend: change > 0 ? 'up' : change < 0 ? 'down' : 'flat',
        dateValue: date.getTime(),
        monthName: date.toLocaleString('default', { month: 'long' })
      };
    });
  }, [forecast]);

  // Handle Search and Sort
  const processedData = useMemo(() => {
    let sortableItems = [...enrichedData];

    if (searchTerm) {
      sortableItems = sortableItems.filter(item => 
        item.Year.toString().includes(searchTerm) ||
        item.monthName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Predicted_Price.toString().includes(searchTerm)
      );
    }

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
  }, [enrichedData, searchTerm, sortConfig]);

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
      Year: r.Year,
      Month: r.Month,
      'Month Name': r.monthName,
      'Predicted Price (₹)': r.Predicted_Price.toFixed(2),
      'Change (%)': r.changePercent.toFixed(2)
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'price_forecast.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!forecast || forecast.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-w-0 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Forecast Details</h2>
          <p className="text-sm text-gray-500 mt-1">Month-by-month prediction breakdown.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search month or year..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 text-sm transition"
            />
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition shrink-0"
          >
            <FaFileCsv className="text-gray-500" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('Year')}>
                <div className="flex items-center">Year {getSortIcon('Year')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('Month')}>
                <div className="flex items-center">Month {getSortIcon('Month')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('Predicted_Price')}>
                <div className="flex items-center">Predicted Price {getSortIcon('Predicted_Price')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition" onClick={() => requestSort('changePercent')}>
                <div className="flex items-center">Change % {getSortIcon('changePercent')}</div>
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          
          <motion.tbody 
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white divide-y divide-gray-200"
          >
            {processedData.length > 0 ? (
              processedData.map((row, idx) => (
                <motion.tr
                  variants={itemAnim}
                  key={`${row.Year}-${row.Month}-${idx}`}
                  className="hover:bg-gray-50/50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.Year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.monthName}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                    ₹{row.Predicted_Price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center font-medium ${row.changePercent > 0 ? 'text-emerald-600' : row.changePercent < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                      {row.changePercent > 0 ? '+' : ''}{row.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.trend === 'up' && <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-full inline-flex"><FaArrowUp className="text-xs"/></div>}
                    {row.trend === 'down' && <div className="p-1.5 bg-red-100 text-red-600 rounded-full inline-flex"><FaArrowDown className="text-xs"/></div>}
                    {row.trend === 'flat' && <div className="p-1.5 bg-gray-100 text-gray-500 rounded-full inline-flex"><FaMinus className="text-xs"/></div>}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No predictions found.
                </td>
              </tr>
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
}

export default PriceForecastTable;
