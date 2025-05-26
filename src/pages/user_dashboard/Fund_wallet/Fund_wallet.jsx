import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../../../store/userReducers";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

export default function Fund_wallet() {
  const navigate = useNavigate();
  const { existingUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    amount: 0,
    paymentCategory:"Fund Wallet",
    servicePaidFor: "Fund Wallet",
    paymentDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  
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

  // STEP 1: Open the new window early before any async operation
  const newWindow = window.open('', '_blank');

  // STEP 2: Show temporary message to avoid blank window
  if (newWindow) {
    newWindow.document.title = "Redirecting to Checkout...";
    newWindow.document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; background-color: #f9fafb;">
        <div style="text-align: center; padding: 2rem 1.5rem; background-color: white; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 90%; max-width: 400px;">
          <div style="margin-bottom: 1rem;">
            <svg style="display: block; height: 64px; width: 64px; margin: 0 auto; color: #3b82f6; animation: spin 1s linear infinite;" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
          <h2 style="font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
            Redirecting to Checkout...
          </h2>
          <p style="color: #4b5563;">
            Please wait while we take you to the secure payment page.
          </p>
        </div>

        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          svg {
            animation: spin 1s linear infinite;
          }
        </style>
      </div>
    `;
  }

  setLoading(true);
  setError("");

  if (existingUser?.token) {
    const decoded = jwtDecode(existingUser.token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      dispatch(signOutUserSuccess());
      return;
    }

    if (!newWindow) {
      alert("Popup blocked!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/make-payment`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${existingUser?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setError(result.error || "Payment failed");
        setIsDialogOpen(true);
        newWindow.close();
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      const checkoutUrl = result?.data?.responseBody?.checkoutUrl;

      if (checkoutUrl) {
        newWindow.location.href = checkoutUrl; // Redirect user here
        setSuccess(false);
      } else {
        newWindow.close(); // Fallback: close if no URL
      }

    } catch (err) {
      setError(err.message);
      console.error(err.message);
      setIsDialogOpen(true);
      setLoading(false);
    }
  }
};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative max-w-md md:mx-auto md:my-20 my-10 p-6 mx-2 bg-white shadow-lg rounded-lg">
      <div className="absolute top-2 left-2">
        <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
      </div>
      <h2 className="text-2xl font-bold text-center">Fund Wallet</h2>

      <div className="mt-4 p-4 border rounded space-y-3">
        <label className="block">
          <span className="text-gray-500">Amount</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </label>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <label className="block">
            <span className="text-gray-500">Payment Category</span>
            <input
              type="text"
              name="paymentDescription"
              value={formData.paymentCategory}
              onChange={handleChange}
              className="mt-1 block w-full text-gray-400 cursor-not-allowed p-2 border rounded"
              placeholder="Enter payment description..."
              disabled
            />
          </label>
          <label className="block">
            <span className="text-gray-500">Service Paid For</span>
            <input
              type="text"
              name="paymentDescription"
              value={formData.servicePaidFor}
              onChange={handleChange}
              className="mt-1 block w-full text-gray-400 cursor-not-allowed p-2 border rounded"
              placeholder="Enter payment description..."
              disabled
            />
          </label>
        </div>
        <label className="block">
          <span className="text-gray-500">Payment Description</span>
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
