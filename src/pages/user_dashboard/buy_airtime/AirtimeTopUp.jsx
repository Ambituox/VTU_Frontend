// Import React and necessary hooks
import React, { useState } from 'react';

const AirtimeTopUpForm = () => {
  const [formData, setFormData] = useState({
    network: '',
    airtimeType: '',
    mobileNumber: '',
    amount: ''
  });

  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{11}$/; // Validates a 11-digit phone number
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { network, airtimeType, mobileNumber, amount } = formData;

    if (!network || !airtimeType || !mobileNumber || !amount) {
      setModal({
        show: true,
        type: 'error',
        message: 'All fields are required!'
      });
      return;
    }

    if (!validatePhoneNumber(mobileNumber)) {
      setModal({
        show: true,
        type: 'error',
        message: 'Invalid phone number! Please enter a 11-digit number.'
      });
      return;
    }

    setModal({
      show: true,
      type: 'success',
      message: 'Airtime top-up successful!'
    });
  };

  const closeModal = () => {
    setModal({ show: false, type: '', message: '' });
  };

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
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              <option value="MTN">MTN</option>
              <option value="Airtel">Airtel</option>
              <option value="Glo">Glo</option>
              <option value="9mobile">9mobile</option>
            </select>
          </div>
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-sm font-medium mb-1">Mobile Number*</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Buy Now
          </button>
        </form>
      </div>

      {modal.show && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
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
