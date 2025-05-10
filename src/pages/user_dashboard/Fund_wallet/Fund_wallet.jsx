import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

export default function Fund_wallet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    paymentDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = async () => {
    if (!formData.paymentDescription || !formData.amount) {
      setError("Both amount and payment description are required.");
      setIsDialogOpen(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/make-payment`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount), // 👈 ensure amount is a number
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setError(result.error || "Payment failed");
        setIsDialogOpen(true);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setTimeout(() => navigate("verify-payment"), 2000);
    } catch (err) {
      setError(err.message);
      setIsDialogOpen(true);
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative max-w-md mx-auto my-20 p-6 bg-white shadow-lg rounded-lg">
      <div className="absolute top-2 left-2">
        <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
      </div>
      <h2 className="text-2xl font-bold text-center">Fund Wallet</h2>

      <div className="mt-4 p-4 border rounded space-y-3">
        <label className="block">
          <span className="text-gray-700">Amount</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Payment Description</span>
          <input
            type="text"
            name="paymentDescription"
            value={formData.paymentDescription}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter payment description..."
          />
        </label>
      </div>

      {success && <p className="text-green-500 mt-2">Payment Successful! Redirecting...</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-red-600">Payment Error</h3>
            <p className="text-gray-700 mt-2">{error}</p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
