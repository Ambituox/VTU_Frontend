import React, { useState } from "react";

const AirtimeTransactionHistory = () => {
  // Sample transaction data
  const [transactions] = useState([
    {
      id: "TXN12345",
      network: "MTN",
      amount: 1000,
      status: "Success",
      date: "2024-12-10 10:00:00",
    },
    {
      id: "TXN12346",
      network: "Airtel",
      amount: 1500,
      status: "Failed",
      date: "2024-12-09 15:30:00",
    },
    {
      id: "TXN12347",
      network: "Glo",
      amount: 2000,
      status: "Success",
      date: "2024-12-08 12:45:00",
    },
    {
      id: "TXN12348",
      network: "9mobile",
      amount: 500,
      status: "Pending",
      date: "2024-12-07 11:00:00",
    },
  ]);

  // Filter state for transaction status
  const [statusFilter, setStatusFilter] = useState("");

  // Filter transactions based on status
  const filteredTransactions = transactions.filter((transaction) => {
    if (statusFilter === "") return true;
    return transaction.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Airtime Transaction History
        </h2>

        {/* Filter by Status */}
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Filter by Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Transaction List */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Transaction ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Network</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Amount (₦)</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm">{transaction.network}</td>
                    <td className="px-6 py-4 text-sm">{transaction.amount}</td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        transaction.status === "Success"
                          ? "text-green-600"
                          : transaction.status === "Failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="px-6 py-4 text-sm">{transaction.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AirtimeTransactionHistory;
