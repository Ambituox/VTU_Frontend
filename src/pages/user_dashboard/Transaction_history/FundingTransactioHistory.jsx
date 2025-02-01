import React, { useState } from "react";

const FundingTransactionHistory = () => {
  // Mock data for transaction history
  const allTransactions = [
    { id: "TXN001", amount: 1000, method: "Bank Transfer", date: "2024-12-01 12:30 PM", status: "Successful" },
    { id: "TXN002", amount: 500, method: "Card Payment", date: "2024-11-28 3:15 PM", status: "Pending" },
    { id: "TXN003", amount: 2000, method: "USSD", date: "2024-11-25 6:45 PM", status: "Failed" },
    { id: "TXN004", amount: 1500, method: "Wallet Transfer", date: "2024-11-20 9:00 AM", status: "Successful" },
    { id: "TXN005", amount: 800, method: "Card Payment", date: "2024-11-18 11:20 AM", status: "Pending" },
    { id: "TXN006", amount: 1200, method: "Bank Transfer", date: "2024-11-15 2:45 PM", status: "Successful" },
    { id: "TXN007", amount: 3000, method: "USSD", date: "2024-11-10 5:30 PM", status: "Failed" },
    { id: "TXN008", amount: 2500, method: "Wallet Transfer", date: "2024-11-05 8:00 AM", status: "Successful" },
  ];

  const [transactions, setTransactions] = useState(allTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Handle Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  // Handle Filter
  const handleFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Filter and Search Logic
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (statusFilter ? transaction.status === statusFilter : true) &&
      (searchQuery
        ? transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.method.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const displayedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Page Change
  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Funding Transaction History
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by ID or Method..."
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={handleFilter}
          >
            <option value="">All Statuses</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">
                  Transaction ID
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">
                  Amount (₦)
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">
                  Method
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">
                  Date
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-2 border border-gray-300 text-gray-700">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-700">
                    ₦{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-700">
                    {transaction.method}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-700">
                    {transaction.date}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-300 font-medium ${
                      transaction.status === "Successful"
                        ? "text-green-600"
                        : transaction.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-600"
            }`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange("prev")}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 text-white rounded-md ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-600"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundingTransactionHistory;
