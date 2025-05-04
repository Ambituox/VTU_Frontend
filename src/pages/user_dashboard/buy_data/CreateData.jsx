import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

const networkProviders = ["MTN", "Glo", "Airtel", "9Mobile"];

export default function CreateDataComponent() {
  const { currentUser } = useSelector((state) => state.user);

  const [dataPlan, setDataPlan] = useState({
    networkProvider: "MTN",
    plan: "",
    duration: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "plan") {
      // Allow only float-like numbers (e.g., 1, 1., 1.0, 1.05)
      if (/^\d*\.?\d*$/.test(value)) {
        setDataPlan((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "duration") {
      if (/^\d*$/.test(value)) {
        setDataPlan((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setDataPlan((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  // Format plan value to float format if it's an integer when input loses focus
  const handleBlur = (e) => {
    const { name, value } = e.target;
  
    if (name === "plan" && /^\d+$/.test(value)) {
      setDataPlan((prev) => ({ ...prev, [name]: `${value}.0` }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const payload = {
      networkProvider: dataPlan.networkProvider,
      plan: `${dataPlan.plan}GB`,
      duration: `${parseInt(dataPlan.duration)} days`,
      price: dataPlan.price,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/create-data`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!response.ok || result.error) {
        setMessage(result.error || "Failed to create data plan");
        setAlertType("error");
        console.log(payload);
        return;
      }
  
      setMessage("Data plan created successfully!");
      setAlertType("success");
      // console.log(result);
      // Optional reset:
      setDataPlan({ networkProvider: "MTN", plan: "", duration: "", price: "" });
    } catch (error) {
      setMessage(error.message || "Something went wrong");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white my-20 shadow-md rounded-lg relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Data Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Network Provider</span>
          <select
            name="networkProvider"
            value={dataPlan.networkProvider}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
          >
            {networkProviders.map((provider) => (
              <option key={provider} value={provider}>{provider}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Plan <span className="text-sm text-gray-500">(Numbers / Decimal)</span></span>
          <input
            type="text"
            name="plan"
            value={dataPlan.plan}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 1.0"
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />

        </label>

        <label className="block">
          <span className="text-gray-700">Duration <span className="text-sm text-gray-500">(Numbers Only)</span></span>
          <input
            type="text"
            name="duration"
            value={dataPlan.duration}
            onChange={handleChange}
            placeholder="e.g. 7"
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Price (₦)</span>
          <input
            type="number"
            name="price"
            value={dataPlan.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md transition duration-300"
        >
          {loading ? "Creating..." : "Create Data Plan"}
        </button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-2 right-2 px-4 py-2 rounded-lg shadow-lg text-white ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
