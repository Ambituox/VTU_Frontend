import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Mock Data for Transactions
const mockData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  type: index % 2 === 0 ? "Airtime Top-Up" : "Data Top-Up",
  provider: index % 3 === 0 ? "MTN" : index % 3 === 1 ? "Airtel" : "Glo",
  plan: index % 2 === 0 ? "1GB - ₦500" : "3GB - ₦1500",
  amount: (Math.random() * 2000).toFixed(2),
  phoneNumber: `080${(Math.random() * 1000000000).toFixed(0)}`,
  date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
    .toISOString(),
}));

const UtilityTransactionHistory = () => {
  // States for loading, data, pagination, and search/filter functionality
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalTransactions, setTotalTransactions] = useState(mockData.length);

  // States for search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("type"); // Dropdown filter selection
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Simulate data fetching with a delay
    setLoading(true);
    setTimeout(() => {
      // Filter data based on search and date range
      const filteredData = mockData.filter((transaction) => {
        const matchesSearchQuery =
          transaction[filterType]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.phoneNumber.includes(searchQuery) ||
          transaction.amount.includes(searchQuery);

        const matchesDate =
          selectedDate ? new Date(transaction.date).toDateString() === selectedDate.toDateString() : true;

        return matchesSearchQuery && matchesDate;
      });

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      setTransactions(filteredData.slice(startIndex, endIndex));
      setTotalTransactions(filteredData.length);
      setLoading(false);
    }, 1000);
  }, [currentPage, searchQuery, filterType, selectedDate]);

  // Pagination logic
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Loading Spinner
  const renderLoader = () => (
    <div className="w-full flex justify-center py-6">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 h-10 w-10"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-[100%] shadow-lg rounded-lg p-4 w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Utility Transaction History</h2>

        {/* Search and Date Range Filter */}
        <div className="mb-6 flex flex-col sm:flex-row sm:gap-4 sm:items-center">
          {/* Search Input */}
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <p className="font-medium pb-2 text-gray-700">Search</p>
            <input type="text" placeholder="Search by Type, Provider, Phone Number, Amount" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>

          {/* Filter Type Selection */}
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <p className="font-medium pb-2 text-gray-700">Filter</p>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="type">Filter by Type</option>
              <option value="provider">Filter by Provider</option>
              <option value="plan">Filter by Plan</option>
              <option value="amount">Filter by Amount</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="w-full sm:w-1/3">
            <label className="block text-gray-700 font-medium pb-2">Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="Pp"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Select Date"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          renderLoader()
        ) : (
          <>
            {/* Transaction List */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Provider</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Phone Number</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Amount (₦)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">{transaction.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{transaction.provider}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{transaction.phoneNumber}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">₦{transaction.amount}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-900 text-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50">
                Prev
              </button>
              <div>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-900 text-gray-200 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50">
                Next
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {transactions.length === 0 && !loading && (
          <div className="mt-6 text-center text-gray-600">
            <p>No transactions available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtilityTransactionHistory;
