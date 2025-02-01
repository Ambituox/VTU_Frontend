import React, { useState } from "react";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    profilePicture: "/default-avatar.png", // Default profile picture
    username: "john_doe",
    phoneNumber: "+2347012345678",
    email: "johndoe@example.com",
    bankName: "First Bank",
    accountNumber: "1234567890",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
    setIsEditing(false);

    // Simulate saving changes to a backend
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Header */}
          <div className="flex items-center justify-center mb-6 relative">
            <div className="relative">
              <img src={formData.profilePicture} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"/>
              {isEditing && (
                <label htmlFor="profilePicture" className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md" title="Change Picture">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  <input id="profilePicture" type="file" accept="image/*" className="hidden" onChange={handleFileChange}/>
                </label>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600"> 
                Username
              </label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} disabled={!isEditing}
                className={`mt-2 block w-full p-3 bg-gray-50 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} disabled={!isEditing}
                className={`mt-2 block w-full p-3 bg-gray-50 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email"  className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing}
                className={`mt-2 block w-full p-3 bg-gray-50 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
              />
            </div>

            {/* Bank Name */}
            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-600"
              >
                Bank Name
              </label>
              <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} disabled={!isEditing} className={`mt-2 block w-full p-3 bg-gray-50 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
              />
            </div>

            {/* Account Number */}
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-600">
                Account Number
              </label>
              <input type="text" id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} disabled={!isEditing}
                className={`mt-2 block w-full p-3 bg-gray-50 border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } rounded-lg focus:ring-blue-500 focus:border-blue-500 transition`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            {isEditing ? (
              <>
                <button type="button" onClick={() => setIsEditing(false)} className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition">
                  Cancel
                </button>
                <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                  Save Changes
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="py-2 px-6 bg-gray-800 text-white rounded-md shadow-md hover:bg-blue-600 transition">
                Edit Profile
              </button>
            )}
          </div>
        </form>

        {/* Success Message */}
        {message && (
          <div className="mt-6 p-3 bg-green-100 text-green-700 text-center rounded-lg shadow-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
