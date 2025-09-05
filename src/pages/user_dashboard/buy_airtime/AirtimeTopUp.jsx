// Import React and necessary hooks
import React, { useState } from 'react';
import { useServiceType } from '../../../components/SwitchServiceType/ServiceTypeContext';
import { useSelector } from 'react-redux';

const token = localStorage.getItem("authToken");
const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

const AirtimeTopUpForm = () => {
  const [formData, setFormData] = useState({
    network: '',
    phone: '',
    amount: ''
  });

  const { serviceType } = useServiceType();
  const { existingUser } = useSelector((state) => state.user);

  console.log(serviceType)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{11}$/; // Validates a 11-digit phone number
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { network, phone, amount } = formData;

    if (!network || !phone || !amount) {
      setModal({
        show: true,
        type: 'error',
        message: 'All fields are required!'
      });
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setModal({
        show: true,
        type: 'error',
        message: 'Invalid phone number! Please enter a 11-digit number.'
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/buy-airtime`, {
        method: "POST",
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Service-Type' : serviceType
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log(result)
      if (!response.ok || result.error) {
        setModal({
          show: true,
          type: 'error',
          message: result.error || "Payment failed"
        });
        setLoading(false);
        return;
      }
// 07087013965
      console.log(result);
      setModal({
        show: true,
        type: 'success',
        message: result.message || 'Airtime top-up successful!'
      });
      setLoading(false);
      
      // setTimeout(() => navigate("verify-payment"), 2000); // Redirect after 2 sec
    } catch (err) {
      console.log(err)
      setModal({
        show: true,
        type: 'error',
        message: err.message
      });
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal({ show: false, type: '', message: '' });
  };

  console.log(formData)

  return (
    <div className="py-10 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Airtime TopUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="network" className="block text-sm font-medium mb-1">Network*</label>
            <select
              id="network"
              name="network"
              value={formData.network}
              onChange={handleChange}
              className="w-full p-2 border uppercase border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              <option value="MTN">MTN</option>
              <option value="Airtel">AIRTEL</option>
              <option value="Glo">GLO</option>
              <option value="9mobile">9MOBILE</option>
            </select>
          </div>
          {/* <div className="mb-4">
            <label htmlFor="airtimeType" className="block text-sm font-medium mb-1">Airtime Type*</label>
            <select
              id="airtimeType"
              name="airtimeType"
              value={formData.airtimeType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              <option value="VTU">VTU</option>
              <option value="Share and Sell">Share and Sell</option>
            </select>
          </div> */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Mobile Number*</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount*</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </form>
      </div>

      {modal.show && (
        <div className="fixed inset-0 px-2 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h3 className={`text-lg font-bold mb-2 ${modal.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {modal.type === 'error' ? 'Error' : 'Success'}
            </h3>
            <p className="mb-4">{modal.message}</p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirtimeTopUpForm;
