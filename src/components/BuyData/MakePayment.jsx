import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

export default function MakePayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state; // Retrieve data

  // Initialize form data state
  const [formData, setFormData] = useState({
    sku: paymentData?.sku,
    amount: paymentData?.price,
    paymentDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Get current user from Redux store
  const { currentUser } = useSelector((state) => state.user);
  // Handle payment request
  const handlePayment = async () => {
    if (!formData.paymentDescription) {
      setError("Payment description is required.");
      setIsDialogOpen(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/make-payment`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${currentUser.token}` },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setError(result.error || "Payment failed");
        setIsDialogOpen(true); // Show error dialog
        // console.log(result);
        setLoading(false);
        return;
      }

      setSuccess(true);
      console.log(result);
      setLoading(false);
      
      setTimeout(() => navigate("verify-payment"), 2000); // Redirect after 2 sec
    } catch (err) {
      setError(err.message);
      setIsDialogOpen(true); // Show error dialog
      setLoading(false);
    }
  };

  // Redirect if no payment data
  if (!paymentData) {
    navigate("verify-payment");
    return null;
  }

  const handleBack = () => {
    navigate(-1) // Go back to the previous page
  }

  return (
    <div className="relative max-w-md mx-auto my-20 p-6 bg-white shadow-lg rounded-lg">
      <div className="absolute top-2 left-2">
        <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
      </div>
      <h2 className="text-2xl font-bold text-center">Make Payment</h2>

      <div className="mt-4 p-4 border rounded space-y-3">
        <label className="block">
          <span className="text-gray-700">SKU</span>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            disabled
            className="mt-1 block w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Amount</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            disabled
            className="mt-1 block w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
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

      {/* Error Dialog Modal */}
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
