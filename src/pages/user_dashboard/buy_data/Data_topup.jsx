// Import React and necessary hooks
import React, { useState } from 'react';

const DataPlanForm = () => {
  const [formData, setFormData] = useState({
    network: '',
    dataType: '',
    mobileNumber: '',
    amount: '',
    plan: '' // Added for MTN AWOOF
  });

  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { network, dataType, mobileNumber, amount, plan } = formData;

    if (!network || !dataType || !mobileNumber || (!amount && dataType !== 'MTN AWOOF')) {
      setModal({
        show: true,
        type: 'error',
        message: 'All fields are required!'
      });
      return;
    }

    setModal({
      show: true,
      type: 'success',
      message: 'Data plan purchase successful!'
    });
  };

  const closeModal = () => {
    setModal({ show: false, type: '', message: '' });
  };

  return (
    <div className=" py-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Buy Data Plan</h2>
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
            <label htmlFor="dataType" className="block text-sm font-medium mb-1">Data Type*</label>
            <select
              id="dataType"
              name="dataType"
              value={formData.dataType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              <option value="SME">SME</option>
              <option value="Gifting">Gifting</option>
              <option value="Corporate Gifting">Corporate Gifting</option>
              <option value="MTN AWOOF">MTN AWOOF</option>
            </select>
          </div>
          {formData.dataType === 'MTN AWOOF' && formData.network === 'MTN' && (
            <div className="mb-4">
              <label htmlFor="plan" className="block text-sm font-medium mb-1">Plan*</label>
              <select
                id="plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-------</option>
                <option value="1.0GB MTN AWOOF = #200.0 1 day">1.0GB MTN AWOOF = #200.0 1 day</option>
                <option value="3.5GB MTN AWOOF = #500.0 2 days">3.5GB MTN AWOOF = #500.0 2 days</option>
                <option value="15.0GB MTN AWOOF = #2000.0 7 days">15.0GB MTN AWOOF = #2000.0 7 days</option>
              </select>
            </div>
          )}
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
              disabled={formData.dataType === 'MTN AWOOF'}
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

export default DataPlanForm;
