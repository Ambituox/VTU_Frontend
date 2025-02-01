import React, { useState } from "react";

const CableTvSubscription = () => {
  const [formData, setFormData] = useState({
    provider: "",
    phoneNumber: "",
    plan: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(5000); // Mock user balance
  const [transactions, setTransactions] = useState([]); // Transaction history

  // Dummy data for cable TV plans
  const cableTvPlans = {
    Dstv: [
      { id: 1, plan: "DSTV Compact", price: 3500 },
      { id: 2, plan: "DSTV Premium", price: 7500 },
      { id: 3, plan: "DSTV Family", price: 5000 },
    ],
    Gotv: [
      { id: 1, plan: "GOtv Max", price: 2000 },
      { id: 2, plan: "GOtv Jolli", price: 1500 },
      { id: 3, plan: "GOtv Smallie", price: 800 },
    ],
    StarTimes: [
      { id: 1, plan: "StarTimes Classic", price: 1500 },
      { id: 2, plan: "StarTimes Smart", price: 3000 },
      { id: 3, plan: "StarTimes Super", price: 5000 },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Validate phone number (Nigerian format)
    const nigerianPhoneRegex = /^(?:\+234|0)(70|80|81|90|91|89)\d{8}$/;
    if (!nigerianPhoneRegex.test(formData.phoneNumber)) {
      setLoading(false);
      setError("Please enter a valid Nigerian phone number.");
      return;
    }

    // Validate plan selection
    if (!formData.plan) {
      setLoading(false);
      setError("Please select a subscription plan.");
      return;
    }

    const selectedPlan = cableTvPlans[formData.provider]?.find(
      (plan) => plan.plan === formData.plan
    );

    if (!selectedPlan) {
      setLoading(false);
      setError("Invalid plan selection.");
      return;
    }

    // Validate balance
    if (selectedPlan.price > balance) {
      setLoading(false);
      setError("Insufficient balance. Please recharge your wallet.");
      return;
    }

    try {
      // Simulate API request for cable TV subscription
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update balance and transactions
      const newBalance = balance - selectedPlan.price;
      setBalance(newBalance);
      setTransactions([
        ...transactions,
        {
          id: transactions.length + 1,
          provider: formData.provider,
          plan: formData.plan,
          phoneNumber: formData.phoneNumber,
          amount: selectedPlan.price,
          date: new Date().toLocaleString(),
        },
      ]);

      setMessage(
        `Subscription to ${formData.provider} ${formData.plan} successful.`
      );
      setFormData({ provider: "", phoneNumber: "", plan: "" });
    } catch (err) {
      setError("Failed to process your subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Cable TV Subscription
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Available Balance: <span className="font-bold">₦{balance.toFixed(2)}</span>
        </p>
        <form onSubmit={handleSubmit}>
          {/* Provider Selector */}
          <div className="mb-4">
            <label htmlFor="provider" className="block text-sm font-medium text-gray-600">
              Select Provider
            </label>
            <select
              id="provider"
              name="provider"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.provider}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose a provider
              </option>
              <option value="Dstv">DSTV</option>
              <option value="Gotv">GOtv</option>
              <option value="StarTimes">StarTimes</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Enter phone number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subscription Plan */}
          {formData.provider && (
            <div className="mb-4">
              <label htmlFor="plan" className="block text-sm font-medium text-gray-600">
                Select Subscription Plan
              </label>
              <select
                id="plan"
                name="plan"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.plan}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose a plan
                </option>
                {cableTvPlans[formData.provider]?.map((plan) => (
                  <option key={plan.id} value={plan.plan}>
                    {plan.plan} - ₦{plan.price}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 text-white rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full mr-2"></span>
                Processing...
              </span>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>

        {/* Success and Error Messages */}
        {message && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 text-center rounded-md">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 text-center rounded-md">
            {error}
          </div>
        )}

        {/* Transaction History */}
        {transactions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Transaction History</h3>
            <ul className="space-y-2">
              {transactions.map((transaction) => (
                <li
                  key={transaction.id}
                  className="p-3 border rounded-md text-gray-700 bg-gray-50"
                >
                  <p>
                    <strong>Provider:</strong> {transaction.provider}
                  </p>
                  <p>
                    <strong>Plan:</strong> {transaction.plan}
                  </p>
                  <p>
                    <strong>Phone:</strong> {transaction.phoneNumber}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₦{transaction.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {transaction.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CableTvSubscription;
