import React, { useState, useEffect } from "react";

const DataTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [statusFilter, setStatusFilter] = useState(""); // For filter functionality

  const totalTransactions = 50; // Simulated total transactions

  // Dummy transaction data (now 50 items for pagination demo)
  const dummyTransactions = Array.from({ length: totalTransactions }, (_, index) => ({
    id: index + 1,
    network: index % 4 === 0 ? "MTN" : index % 4 === 1 ? "Airtel" : index % 4 === 2 ? "Glo" : "9mobile",
    phoneNumber: `080${(Math.random() * 1000000000).toFixed(0)}`,
    dataPlan: index % 2 === 0 ? "1GB - $5" : "2GB - $3",
    amount: (Math.random() * 15).toFixed(2),
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
    status: index % 3 === 0 ? "Success" : index % 3 === 1 ? "Failed" : "Pending",
  }));

  useEffect(() => {
    setLoading(true);

    // Simulate fetching data with pagination
    setTimeout(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setTransactions(dummyTransactions.slice(startIndex, endIndex));
      setFilteredTransactions(dummyTransactions.slice(startIndex, endIndex)); // Initially set filtered to all
      setLoading(false);
    }, 1000); // Simulate network delay
  }, [currentPage]);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterTransactions(e.target.value, statusFilter);
  };

  // Handle status filter
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    filterTransactions(searchQuery, e.target.value);
  };

  // Filter transactions based on search and status
  const filterTransactions = (search, status) => {
    let filtered = dummyTransactions;

    if (search) {
      filtered = filtered.filter((transaction) =>
        Object.values(transaction).some((val) =>
          val.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    if (status) {
      filtered = filtered.filter((transaction) => transaction.status === status);
    }

    setFilteredTransactions(filtered);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Data Transaction History</h2>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            placeholder="Search transactions"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Filter by Status:</label>
          <select
            className="w-full px-4 py-2 rounded-md border border-gray-300"
            value={statusFilter}
            onChange={handleStatusFilter}
          >
            <option value="">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-blue-500 rounded-full"></div>
            <span className="text-gray-500">Loading...</span>
          </div>
        )}

        {/* Transaction Table */}
        {!loading && filteredTransactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full mt-6 table-auto text-sm text-left">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="py-3 px-4 text-gray-600 font-medium">Network</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Phone Number</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Data Plan</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Amount</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Date</th>
                  <th className="py-3 px-4 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50 transition duration-200">
                      <td className="py-3 px-4">{transaction.network}</td>
                      <td className="py-3 px-4">{transaction.phoneNumber}</td>
                      <td className="py-3 px-4">{transaction.dataPlan}</td>
                      <td className="py-3 px-4">${transaction.amount}</td>
                      <td className="py-3 px-4">{transaction.date}</td>
                      <td
                        className={`py-3 px-4 ${
                          transaction.status === "Success"
                            ? "text-green-600"
                            : transaction.status === "Failed"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {transaction.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Data */}
        {!loading && filteredTransactions.length === 0 && (
          <div className="mt-6 text-center text-gray-500">No transactions found.</div>
        )}

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-600 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <div>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-600 py-1 px-3 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTransactionHistory;
