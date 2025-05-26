import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateSuccess } from "../../../store/userReducers";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

const UserProfile = () => {
  const { existingUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/get-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${existingUser?.token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok || data.error) {
          console.error("Failed to fetch user profile:", data.error || response.statusText);
          return;
        }

        const { firstName, lastName, email, phone, image } = data.data;
        setFormData({ firstName, lastName, email, phone, image: image || "" });
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (existingUser?.token) {
      fetchUserProfile();
    }
  }, [existingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${existingUser?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        setError(data.message || "Failed to update profile");
        return;
      }

      setMessage("Profile updated successfully!");
      dispatch(updateSuccess(data));
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const renderInput = (label, name, value) => (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      {loadingProfile ? (
        <div className="mt-2 h-10 w-full bg-gray-300 animate-pulse rounded-md" />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          disabled={!isEditing}
          className={`mt-2 block w-full p-3 bg-gray-50 border ${
            isEditing ? "border-gray-300" : "border-transparent"
          } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
        />
      )}
    </div>
  );

  return (
    <div className="py-20 bg-gray-50 flex items-center justify-center lg:px-3">
      <div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Profile</h2>

        <form onSubmit={handleSubmit} className="py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {renderInput("First Name", "firstName", formData.firstName)}
            {renderInput("Last Name", "lastName", formData.lastName)}
            {renderInput("Email", "email", formData.email)}
            {renderInput("Phone", "phone", formData.phone)}
            <button className="bg-blue-500 p-3 rounded-md text-start text-gray-50 font-semibold">
              <Link to={'/profile/transaction-history'}>My Transaction History</Link>
            </button>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link to="change-password" className="text-blue-600 hover:underline">
              Change Password
            </Link>
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2 px-6 bg-red-600 text-gray-50 rounded-lg shadow-md hover:bg-gray-400 transition"
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

        {error && (
          <div className="mt-6 p-3 bg-red-100 text-red-700 text-center rounded-lg shadow-sm">{error}</div>
        )}
        {message && (
          <div className="mt-6 p-3 bg-green-100 text-green-700 text-center rounded-lg shadow-sm">{message}</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
