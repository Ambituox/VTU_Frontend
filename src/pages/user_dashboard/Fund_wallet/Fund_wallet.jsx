import React, { useState } from "react";

export default function Fund_wallet() {
  const [formData, setFormData] = useState({
    amount: "",
    paymentType: "",
    paymentChannel: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [serviceFee, setServiceFee] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Calculate service fee dynamically based on payment channel
    if (name === "paymentChannel") {
      const fees = {
        "Channel 1 - (1.65% Service Charge)": (formData.amount * 1.65) / 100,
        "Channel 2 - (1.4% Service Charge) + VAT":
          (formData.amount * 1.4) / 100 + 0.075 * formData.amount,
        "Channel 3 - (50# Service Charge)": 50,
      };
      setServiceFee(fees[value] || 0);
    }
  };

  const validateForm = () => {
    if (!formData.amount || formData.amount <= 0) {
      setError("Please enter a valid amount.");
      return false;
    }
    if (!formData.paymentType) {
      setError("Please select a payment type.");
      return false;
    }
    if (!formData.paymentChannel) {
      setError("Please select a payment channel.");
      return false;
    }
    setError(""); // Clear error if all validations pass
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setShowModal(true);
  };

  const processPayment = () => {
    setLoading(true);
    setShowModal(false);

    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true); // Show success modal after processing
    }, 2000); // Simulate payment processing time
  };

  return (
    <div className="p-3 relative min-h-screen">
      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="lg:max-w-[50%] max-w-[100%] mt-3 mx-auto bg-white rounded-md lg:p-4 p-2 shadow-lg"
        >
          <h2 className="font-medium text-xl text-center">Instant Account Funding</h2>
          <p className="text-gray-400 text-sm italic text-center">
            Payments are Processed Automatically
          </p>

          {/* Amount Input */}
          <div className="mt-8">
            <p className="pb-2 italic">Enter Amount</p>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              className="w-full rounded-md border py-2 px-3 outline-none"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Payment Type */}
          <div className="my-5">
            <p className="pb-2">Payment Type:</p>
            <select name="paymentType" className="w-full rounded-md border py-2 px-3 outline-none" value={formData.paymentType} onChange={handleChange} required>
              <option value="">- Select Payment Type -</option>
              <option value="Pay with Bank Transfer">Pay with Bank Transfer</option>
              <option value="Pay with ATM Card, USSD">Pay with ATM Card, USSD</option>
            </select>
          </div>

          {/* Payment Channel */}
          <div className="">
            <p className="pb-2">Payment Channel:</p>
            <select name="paymentChannel" className="w-full rounded-md border py-2 px-3 outline-none" value={formData.paymentChannel} onChange={handleChange} required>
              <option value="">- Select Payment Channel -</option>
              <option value="Channel 1 - (1.65% Service Charge)">
                Channel 1 - (1.65% Service Charge)
              </option>
              <option value="Channel 2 - (1.4% Service Charge) + VAT">
                Channel 2 - (1.4% Service Charge) + VAT
              </option>
              <option value="Channel 3 - (50# Service Charge)">
                Channel 3 - (50# Service Charge)
              </option>
            </select>
          </div>

          {/* Display Service Fee */}
          {serviceFee > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Service Fee:</strong> ₦{serviceFee.toFixed(2)}
              </p>
              <p>
                <strong>Total:</strong> ₦{(Number(formData.amount) + serviceFee).toFixed(2)}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-5">
            <button type="submit" className="py-2 rounded-md w-full bg-gray-900 text-white font-medium hover:bg-gray-600 transition" disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>

      {/* Error Tooltip */}
      {error && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm rounded-md px-4 py-2 shadow-lg">
          {error}
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Confirm Payment
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You are about to pay ₦
              {(Number(formData.amount) + serviceFee).toFixed(2)}. Please confirm
              to proceed.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                className="py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold text-green-600 mb-4 text-center">
              Transaction Successful!
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Your payment of ₦
              {(Number(formData.amount) + serviceFee).toFixed(2)} has been successfully processed.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
