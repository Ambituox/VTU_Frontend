import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+2347012345678",
    email: "johndoe@example.com",
    bankName: "First Bank",
    accountNumber: "1234567890",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const banks = [
    "Access Bank",
    "Citibank",
    "Ecobank",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank (FCMB)",
    "Globus Bank",
    "Guaranty Trust Bank (GTBank)",
    "Heritage Bank",
    "Keystone Bank",
    "Polaris Bank",
    "Providus Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "SunTrust Bank",
    "Union Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
    "Kuda Bank",
    "Rubies Bank",
    "ALAT by Wema",
    "VBank",
    "Sparkle Bank",
    "Eyowo",
    "Opay",
    "PalmPay",
    "Paga",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update profile");

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center lg:p-3">
      <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              key !== "bankName" ? (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`mt-2 block w-full p-3 bg-gray-50 border ${
                      isEditing ? "border-gray-300" : "border-transparent"
                    } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
                  />
                </div>
              ) : (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600">Bank Name</label>
                  <select
                    name="bankName"
                    value={value}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    {banks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                </div>
              )
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Link to="change-password" className="text-blue-600 hover:underline">
              Change Password
            </Link>
            {isEditing ? (
              <>
                <button
                 type="button"
                 onClick={() => setIsEditing(false)}
                 className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="py-2 px-6 bg-gray-800 text-white rounded-md shadow-md hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>

        {/* Error and Success Messages */}
        {error && <div className="mt-6 p-3 bg-red-100 text-red-700 text-center rounded-lg shadow-sm">{error}</div>}
        {message && <div className="mt-6 p-3 bg-green-100 text-green-700 text-center rounded-lg shadow-sm">{message}</div>}
      </div>
    </div>
  );
};

export default UserProfile;
