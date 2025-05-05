import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  const { currentUser } = useSelector((state) => state.user);

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

  return (
    <div className="w-full max-w-3xl mx-auto bg-white px-2 md:p-4 rounded-lg my-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Data Plans</h2>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FiRefreshCw className={`${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="relative flex space-x-1 rounded-xl bg-blue-300 p-2">
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
          {Object.keys(dataPlans).map((network, idx) => (
            <Tab.Panel key={idx} className="rounded-xl grid lg:grid-cols-4 grid-cols-3 gap-4 md:p-3 shadow-md">
              {dataPlans[network].length > 0 ? (
                dataPlans[network].map((plan) => (
                  <div key={plan._id} className="bg-gray-900 relative flex justify-center items-center flex-col p-4 border rounded-lg shadow-sm">
                    {isAdmin && (
                      <Link to={`/admin/update-data/`} state={{ plan }} className="absolute bottom-2 right-2 text-slate-300">
                        <BiEditAlt />
                      </Link>
                    )}
                    <p className="mt-2 text-sm text-gray-400 text-center">{plan.plan} Plan Size</p>
                    <p className="mt-2 flex items-center text-blue-500 font-semibold text-lg"><TbCurrencyNaira />{plan.price}</p>
                    <p className="mt-2 text-sm text-gray-400">{plan.duration}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No plans available.</p>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
