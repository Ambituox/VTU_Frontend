import React from "react";
import { useLocation, Link } from "react-router-dom";

// Network logos mapping
const networkLogos = {
  MTN: "/mtn.jpg",
  Airtel: "/airtel.jpg",
  Glo: "/glo.jpg",
  "9Mobile": "/9mobile.jpg",
};

export default function BuyDataNow() {
  const location = useLocation();
  const data = location.state; // Retrieve data from navigation

  // Log the data to ensure it's available
  // console.log("Data in BuyDataNow:", data);

  if (!data) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center my-14">
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

          {/* Buy Now Button (Navigate with Data) */}
          <Link to="make-payment"  state={data} className="mt-6 block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition duration-300">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
