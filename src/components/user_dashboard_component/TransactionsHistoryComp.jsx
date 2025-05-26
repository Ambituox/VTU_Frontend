import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { FiRefreshCw } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";

const API_BASE_URL = import.meta.env.API_BASE_URL || "https://vtu-xpwk.onrender.com";

export default function DataPlansMixedFiltered() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Fetch all data plans from API
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/get-all-data`, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });
      if (!res.ok) throw new Error(`Error fetching plans: ${res.statusText}`);
      const data = await res.json();

      // data is assumed to be array of plans
      setPlans(data);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Failed to load data plans");
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.data?.role) {
      setIsAdmin(true);
    }
  }, [currentUser]);

  // Filter plans priced between 1000 and 5000 inclusive
  const filteredPlans = plans.filter(
    (plan) => plan.price >= 1000 && plan.price <= 5000
  );

  // Define "best plan" as the one with highest price in the filtered range
  // If none found, bestPlan is null
  const bestPlan = filteredPlans.reduce((best, plan) => {
    if (!best || plan.price > best.price) return plan;
    return best;
  }, null);

  // Background color based on network
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

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Our Best Plan</h1>
          <button
            onClick={fetchPlans}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Show Best Plan */}
        {loading ? (
          <div className="p-6 bg-gray-200 rounded animate-pulse h-40" />
        ) : bestPlan ? (
          <div
            className={`${getBgColor(bestPlan.networkProvider)} p-6 rounded-lg shadow-lg text-center relative`}
          >
            {isAdmin && (
              <Link
                to="/admin/update-data"
                state={{ plan: bestPlan }}
                className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1"
              >
                <BiEditAlt size={20} />
              </Link>
            )}
            <h2 className="text-xl font-semibold mb-2 text-black">{bestPlan.plan} Plan</h2>
            <p className="text-black mb-1">
              <TbCurrencyNaira className="inline-block" /> {bestPlan.price.toLocaleString()}
            </p>
            <p className="text-black mb-3">{bestPlan.duration}</p>
            <button
              onClick={() => navigate("/profile/data-top-up/buy-now", { state: bestPlan })}
              className="bg-white px-4 py-2 rounded font-semibold hover:bg-gray-800 hover:text-white transition"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No best plan available in the price range.</p>
        )}

        {/* Render filtered plans list */}
        <h2 className="mt-12 mb-4 text-2xl font-semibold text-gray-700">Filtered Data Plans ₦1000 - ₦5000</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 animate-pulse rounded-lg h-40"
                />
              ))}
          </div>
        ) : filteredPlans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlans.map((plan) => (
                <div
                  key={plan._id}
                  className={`${getBgColor(plan.networkProvider)} relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md`}
                >
                  {isAdmin && (
                    <Link
                      to="/admin/update-data"
                      state={{ plan }}
                      className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1"
                    >
                      <BiEditAlt size={20} />
                    </Link>
                  )}
                  <p className="mt-2 text-sm font-semibold text-black">{plan.plan} Plan</p>
                  <p className="mt-1 text-lg font-bold text-black flex items-center">
                    <TbCurrencyNaira /> {plan.price.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-black">{plan.duration}</p>
                  <button
                    onClick={() => navigate("/profile/data-top-up/buy-now", { state: plan })}
                    className="mt-3 bg-white text-black px-3 py-1 rounded font-semibold hover:bg-gray-800 hover:text-white transition"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>

            {filteredPlans.length > 8 && (
              <div className="mt-8 flex justify-center">
                <Link
                  to="/data"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  See More Data Plans
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 mt-8">No data plans available in the selected price range.</p>
        )}
      </div>

      {/* Error modal */}
      <Transition.Root show={errorModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setErrorModalOpen}
        >
          <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-5 pb-4 shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Error
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{errorMessage}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setErrorModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
