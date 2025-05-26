import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabsComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataPlans, setDataPlans] = useState({ MTN: [], AIRTEL: [], GLO: [], "9MOBILE": [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  // Pagination state per network tab
  const [currentPage, setCurrentPage] = useState({
    MTN: 1,
    AIRTEL: 1,
    GLO: 1,
    "9MOBILE": 1,
  });

  const itemsPerPage = 8;

  const fetchData = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/v1/admin/get-all-data`, {
      headers: { 'Authorization': `Bearer ${currentUser.token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const groupedData = { MTN: [], AIRTEL: [], GLO: [], "9MOBILE": [] };
        data.forEach((plan) => {
          if (groupedData[plan.networkProvider]) {
            groupedData[plan.networkProvider].push(plan);
          }
        });
        setDataPlans(groupedData);

        // Reset all pagination pages to 1 after data fetch
        setCurrentPage({
          MTN: 1,
          AIRTEL: 1,
          GLO: 1,
          "9MOBILE": 1,
        });
      })
      .catch((error) => console.error("Error fetching data plans:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.data?.role) {
      setIsAdmin(true);
    }
  }, [currentUser]);

  const getBgColor = (network) => {
    switch (network) {
      case "MTN":
        return "bg-yellow-400";
      case "AIRTEL":
        return "bg-red-500";
      case "GLO":
        return "bg-green-600";
      case "9MOBILE":
        return "bg-green-600";
      default:
        return "bg-gray-900";
    }
  };

  // Handler for page changes
  const handlePageChange = (network, newPage) => {
    setCurrentPage(prev => ({ ...prev, [network]: newPage }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white px-2 md:p-4 rounded-lg my-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Data Plans</h2>
        <button onClick={fetchData} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="relative flex space-x-3 rounded-xl bg-slate-800 p-3">
          {Object.keys(dataPlans).map((network) => (
            <Tab
              key={network}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-3.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-white text-blue-700 shadow"
                    : "text-blue-100 bg-blue-400 hover:bg-blue-400 hover:text-white"
                )
              }
            >
              {network}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4 max-w-full">
          {Object.keys(dataPlans).map((network, idx) => {
            // Calculate pagination data
            const plans = dataPlans[network];
            const totalPages = Math.ceil(plans.length / itemsPerPage);
            const startIndex = (currentPage[network] - 1) * itemsPerPage;
            const currentPlans = plans.slice(startIndex, startIndex + itemsPerPage);

            return (
              <Tab.Panel key={idx} className="rounded-xl grid lg:grid-cols-4 grid-cols-3 md:gap-4 md:p-3 shadow-md">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 animate-pulse h-40 rounded-lg flex flex-col justify-center items-center p-4"
                    >
                      <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-12 h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    </div>
                  ))
                ) : plans.length > 0 ? (
                  <>
                    {currentPlans.map((plan) => (
                      <div
                        key={plan._id}
                        className={`${getBgColor(network)} relative flex justify-center items-center flex-col p-4 border rounded-lg shadow-sm`}
                      >
                        {isAdmin && (
                          <Link
                            to={`/admin/update-data/`}
                            state={{ plan }}
                            className="absolute bg-blue-500 p-1 rounded-full bottom-1 right-1 text-white"
                          >
                            <BiEditAlt />
                          </Link>
                        )}
                        <p className="mt-2 text-sm text-gray-800 text-center">{plan.plan} Plan Size</p>
                        <p className="mt-2 flex items-center text-black font-semibold text-lg">
                          <TbCurrencyNaira />
                          {plan.price}
                        </p>
                        <p className="mt-2 text-sm text-gray-800">{plan.duration}</p>
                        <button
                          onClick={() => navigate("/profile/data-top-up/buy-now", { state: plan })}
                          className="mt-3 bg-white border-none text-black font-semibold px-3 py-2 rounded hover:bg-gray-800 hover:text-white text-sm transition"
                        >
                          Buy Now
                        </button>
                      </div>
                    ))}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="col-span-full flex justify-center mt-4 space-x-2">
                        <button
                          onClick={() => handlePageChange(network, currentPage[network] - 1)}
                          disabled={currentPage[network] === 1}
                          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(network, i + 1)}
                            className={classNames(
                              "px-3 py-1 rounded",
                              currentPage[network] === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(network, currentPage[network] + 1)}
                          disabled={currentPage[network] === totalPages}
                          className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-gray-500">No plans available.</p>
                )}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
