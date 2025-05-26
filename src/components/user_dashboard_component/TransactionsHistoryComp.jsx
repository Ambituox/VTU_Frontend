import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signOutUserSuccess } from "../../store/userReducers";
import { FiRefreshCw } from "react-icons/fi";

// Skeleton loading row
const SkeletonRow = () => (
  <tr className="animate-pulse text-gray-400">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="border px-4 py-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </td>
    ))}
  </tr>
);

function TransactionsHistoryComp() {
  const { existingUser } = useSelector((state) => state.user);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profile and extract transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://vtu-xpwk.onrender.com/api/v1/get-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${existingUser?.token}`,
        },
      });

      const result = await response.json();

      if (result?.data?.transactions) {
        setTransactions(result.data.transactions);
        setFilteredTransactions(result.data.transactions);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (existingUser?.token) {
      const decoded = jwtDecode(existingUser.token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        dispatch(signOutUserSuccess());
        fetchTransactions();
        return;
      }
    }
  }, [existingUser]);

  const handleFilterChange = (type) => {
    setFilter(type);
    applyFilters(type, searchQuery);
  };

  const applyFilters = (type, query) => {
    let filtered = [...transactions];

    if (type !== "all") {
      filtered = filtered.filter((tx) => tx.type === type);
    }

    if (query.trim() !== "") {
      filtered = filtered.filter((tx) =>
        tx.metadata?.paymentDescription?.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    applyFilters(filter, value);
  };

  // Only show the first 8 filtered transactions
  const currentTransactions = filteredTransactions.slice(0, 8);

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="mb-4 flex gap-2 items-center lg:flex-nowrap flex-1 min-w-0 flex-wrap">
          <button onClick={() => handleFilterChange("all")} className="px-4 py-2 bg-blue-500 text-gray-50 rounded">
            All
          </button>
          <button onClick={() => handleFilterChange("fund_wallet")} className="px-4 py-2 bg-green-200 rounded">
            Fund Wallet
          </button>
          <button onClick={() => handleFilterChange("data_plan")} className="px-4 py-2 bg-blue-200 rounded">
            Data Plan
          </button>
          <button onClick={() => handleFilterChange("airtime")} className="px-4 py-2 bg-blue-200 rounded">
            Airtime
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search description..."
            className="border px-4 py-2 rounded w-full max-w-xs focus:outline-blue-400"
          />
        </div>
        <button
          onClick={fetchTransactions}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg px-2 py-5">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="text-gray-50">
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tl-md text-start">#</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Description</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Amount</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Type</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Status</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tr-md text-start">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
            ) : currentTransactions.length > 0 ? (
              currentTransactions.map((tx, index) => (
                <tr key={index} className="text-start text-sm text-gray-500">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 truncate">{tx.metadata?.paymentDescription}</td>
                  <td className="border px-4 py-2">₦{tx.amount.toLocaleString()}</td>
                  <td className="border px-4 py-2 capitalize">{tx.type}</td>
                  <td className="border px-4 py-2 capitalize">{tx.status}</td>
                  <td className="border px-4 py-2">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-6">
        <a
          href="/transaction-history"
          className="text-blue-600 hover:underline font-medium"
        >
          See full transaction history →
        </a>
      </div>
    </div>
  );
}

export default TransactionsHistoryComp;