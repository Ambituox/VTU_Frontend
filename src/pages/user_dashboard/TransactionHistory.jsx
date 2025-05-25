import React, { useState } from 'react';

const transactions = [
  // Add as many items as you want for testing
  {
    id: 1,
    date: '2025-05-11',
    type: 'Airtime Purchase',
    amount: 1000,
    status: 'Success',
    phone: '08012345678',
    provider: 'MTN',
  },
  {
    id: 2,
    date: '2025-05-10',
    type: 'Data Purchase',
    amount: 2000,
    status: 'Failed',
    phone: '08098765432',
    provider: 'Glo',
  },
  {
    id: 3,
    date: '2025-05-09',
    type: 'Cable TV',
    amount: 3500,
    status: 'Success',
    phone: '08033334444',
    provider: 'DSTV',
  },
  {
    id: 1,
    date: '2025-05-11',
    type: 'Airtime Purchase',
    amount: 1000,
    status: 'Success',
    phone: '08012345678',
    provider: 'MTN',
  },
  {
    id: 2,
    date: '2025-05-10',
    type: 'Data Purchase',
    amount: 2000,
    status: 'Failed',
    phone: '08098765432',
    provider: 'Glo',
  },
  {
    id: 3,
    date: '2025-05-09',
    type: 'Cable TV',
    amount: 3500,
    status: 'Success',
    phone: '08033334444',
    provider: 'DSTV',
  },
  {
    id: 1,
    date: '2025-05-11',
    type: 'Airtime Purchase',
    amount: 1000,
    status: 'Success',
    phone: '08012345678',
    provider: 'MTN',
  },
  {
    id: 2,
    date: '2025-05-10',
    type: 'Data Purchase',
    amount: 2000,
    status: 'Failed',
    phone: '08098765432',
    provider: 'Glo',
  },
  {
    id: 3,
    date: '2025-05-09',
    type: 'Cable TV',
    amount: 3500,
    status: 'Success',
    phone: '08033334444',
    provider: 'DSTV',
  },
  // ... add more mock transactions for pagination
];

const itemsPerPage = 5;

const TransactionHistory = () => {
  const [filters, setFilters] = useState({ status: '', type: '', phone: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    setCurrentPage(1); // reset to page 1 when filtering
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus =
      filters.status === '' || tx.status.toLowerCase() === filters.status.toLowerCase();
    const matchesType =
      filters.type === '' || tx.type.toLowerCase() === filters.type.toLowerCase();
    const matchesPhone =
      filters.phone === '' || tx.phone.toLowerCase().includes(filters.phone.trim().toLowerCase());
  
    return matchesStatus && matchesType && matchesPhone;
  });  

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Transaction History</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by phone"
          value={filters.phone}
          onChange={(e) => handleFilterChange('phone', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-[200px]"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-[150px]"
        >
          <option value="">All Status</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-[180px]"
        >
          <option value="">All Types</option>
          <option value="Airtime Purchase">Airtime Purchase</option>
          <option value="Data Purchase">Data Purchase</option>
          <option value="Cable TV">Cable TV</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs text-gray-500 uppercase">
            <tr>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Type</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Provider</th>
              <th className="px-4 py-4">Amount (₦)</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{tx.date}</td>
                  <td className="px-4 py-3">{tx.type}</td>
                  <td className="px-4 py-3">{tx.phone}</td>
                  <td className="px-4 py-3">{tx.provider}</td>
                  <td className="px-4 py-3">₦{tx.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'Success'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center text-sm">
          <p className="text-gray-500">
            Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-2 py-1">{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
