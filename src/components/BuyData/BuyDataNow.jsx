import React, { useContext } from "react";
import { dataContext } from "../../pages/user_dashboard/buy_data/BuyDataPlan";
import { Link } from "react-router-dom";

// Network logos mapping
const networkLogos = {
  MTN: "/mtn.jpg",
  Airtel: "/airtel.jpg",
  Glo: "/glo.jpg",
  "9Mobile": "/9mobile.jpg",
};

export default function BuyDataNow() {
  const data = useContext(dataContext);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center my-10">
      <div className="w-96 border border-gray-200 shadow-xl rounded-xl bg-white transition transform hover:scale-105 duration-300">
        {/* Network Banner */}
        <div className="relative p-4">
          <img
            src={networkLogos[data.network] || ""}
            alt={data.network}
            className="w-full h-[200px] object-cover rounded-xl"
          />
          <span className="absolute top-3 right-3 bg-white text-gray-700 px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
            {data.network}
          </span>
        </div>

        {/* Plan Details */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">{data.plan}</h2>
          <div className="border-t my-4"></div>

          <div className="flex justify-between gap-3 text-gray-600">
            <p><strong>Duration:</strong> {data.duration}</p>
            <p><strong>Price:</strong> ₦{data.price}</p>
          </div>

          {/* Buy Now Button */}
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition duration-300">
            <Link to={'make payment'}>Buy Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
