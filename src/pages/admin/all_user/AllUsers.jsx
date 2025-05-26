import React, { useState, useEffect, useMemo } from "react";
import { BiEditAlt } from "react-icons/bi";

const MOCK_USERS = Array.from({ length: 43 }).map((_, i) => ({
  id: i + 1,
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+234-800-000-${(1000 + i).toString().slice(-4)}`,
  role: ["user", "admin"][Math.floor(Math.random() * 2)],
}));

const ITEMS_PER_PAGE = 8;

export default function AllUsersTable({ isAdmin = true }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = users;
    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(lower) ||
          u.lastName.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower) ||
          u.phone.toLowerCase().includes(lower)
      );
    }
    return filtered;
  }, [users, roleFilter, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleUserRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "admin" ? "user" : "admin" }
          : user
      )
    );
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Users</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by firstname, lastname, email or phone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Filter by role: All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table or Skeleton */}
      {loading ? (
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 ">
              {["#", "First Name", "Last Name", "Email", "Phone", "Role", "Edit"].map(
                (head) => (
                  <th
                    key={head}
                    className="border border-gray-300 p-3 text-left text-gray-600"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
              <tr key={idx} className="animate-pulse bg-gray-50">
                {[...Array(7)].map((__, i) => (
                  <td key={i} className="border border-gray-300 p-3">
                    <div className="h-5 bg-gray-300 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No users found.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-50">
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tl-md text-startt">#</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">First Name</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Last Name</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Email</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Phone</th>
              <th className="px-4 py-2 border border-blue-400 bg-blue-500 text-start">Role</th>
              {isAdmin && (
                <th className="px-4 py-2 border border-blue-400 bg-blue-500 rounded-tr-md text-start">Edit Role</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(({ id, firstName, lastName, email, phone, role }, idx) => (
              <tr
                key={id}
                className="hover:bg-gray-50 transition cursor-default text-start text-sm text-gray-500"
              >
                <td className="border px-4 py-2">{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                <td className="border px-4 py-2">{firstName}</td>
                <td className="border px-4 py-2">{lastName}</td>
                <td className="border px-4 py-2">{email}</td>
                <td className="border px-4 py-2">{phone}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      role === "admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {role.toUpperCase()}
                  </span>
                </td>
                {isAdmin && (
                  <td className="border border-gray-300">
                    <button
                      onClick={() => toggleUserRole(id)}
                      title="Toggle Role"
                      className="p-1 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition"
                    >
                      <BiEditAlt size={20} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-4 py-2 rounded ${
                  currentPage === pageNum
                    ? "bg-blue-700 text-white"
                    : "bg-blue-300 text-blue-900 hover:bg-blue-400"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
