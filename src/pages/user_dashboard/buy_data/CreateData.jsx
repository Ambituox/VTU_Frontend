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
    setDataPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/post-price`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${currentUser.token}` },
        body: JSON.stringify(dataPlan),
      });

      const result = await response.json();
      if (!response.ok || result.status === 'error') {
        setMessage(result.message || "Failed to create data plan");
        console.log(result.message);
        setLoading(false);
        return;
      }

      setMessage("Data plan created successfully!");
      setAlertType("success");
      console.log(result);
      setLoading(false);
    //   setDataPlan({ networkProvider: "MTN", plan: "", duration: "", price: "" });
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white my-20 shadow-md rounded-lg relative">
      <h2 className="text-2xl font-bold mb-4">Create Data Plan</h2>
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
          <span className="text-gray-700">Plan</span>
          <input
            type="text"
            name="plan"
            value={dataPlan.plan}
            onChange={handleChange}
            placeholder="1.0GB, 2.0GB, etc."
            required
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Duration</span>
          <input
            type="text"
            name="duration"
            value={dataPlan.duration}
            onChange={handleChange}
            placeholder="2.g 1, days, 2 days, 7 daya, 14 days, 30 days,"
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