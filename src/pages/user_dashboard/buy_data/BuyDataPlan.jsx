import { useState, useEffect } from 'react';

const dataPlans = {
  MTN: [
    "200MB CORPORATE GIFTING = ₦85.0 14 days(corporate gifting)",
    "500MB CORPORATE GIFTING = ₦212.5 30 days(corporate gifting)",
    "1.0GB CORPORATE GIFTING = ₦425.0 30 days(corporate gifting)",
    "2.0GB CORPORATE GIFTING = ₦850.0 30 days(corporate gifting)",
    "3.0GB CORPORATE GIFTING = ₦1275.0 30 days(corporate gifting)",
    "5.0GB CORPORATE GIFTING = ₦2125.0 30 days(corporate gifting)",
    "10.0GB CORPORATE GIFTING = ₦4250.0 30 days",
    "1.0TB CORPORATE GIFTING = ₦221000.0 30 days"
  ],
  GLO: [
    "1.0GB GIFTING = ₦500 30 days",
    "2.0GB CORPORATE GIFTING = ₦1000 30 days",
    "5.0GB SME = ₦2500 30 days"
  ],
  AIRTEL: [
    "1.5GB GIFTING = ₦1000 30 days",
    "3.0GB CORPORATE GIFTING = ₦2500 30 days",
    "10.0GB SME = ₦4500 30 days"
  ],
  "9MOBILE": [
    "500MB GIFTING = ₦200 7 days",
    "1GB GIFTING = ₦500 30 days",
    "2GB GIFTING = ₦1000 30 days"
  ]
};

const BuyDataPlan = () => {
  const [formData, setFormData] = useState({
    network: 'AIRTEL',
    dataType: '----------',
    mobileNumber: '',
    paymentMedium: 'MAIN WALLET',
    plan: '',
    amount: '',
    bypassValidator: false,
  });

  const getDataTypes = (network) => {
    switch (network) {
      case 'MTN':
      case 'AIRTEL':
        return ['----------', 'GIFTING', 'CORPORATE GIFTING'];
      case 'GLO':
        return ['----------', 'GIFTING', 'CORPORATE GIFTING', 'SME'];
      case '9MOBILE':
        return ['----------', 'GIFTING'];
      default:
        return ['----------'];
    }
  };

  useEffect(() => {
    const newDataType = getDataTypes(formData.network);
    setFormData((prev) => ({ ...prev, dataType: newDataType[0], plan: '', amount: '' }));
  }, [formData.network]);

  useEffect(() => {
    if (formData.network === '9MOBILE' && formData.plan) {
      const selectedPlan = dataPlans['9MOBILE'].find((plan) => plan === formData.plan);
      const price = selectedPlan?.match(/₦(\d+(\.\d+)?)/)?.[1] || '';
      setFormData((prev) => ({ ...prev, amount: price }));
    }
  }, [formData.plan]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message || 'Data plan purchased successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to purchase data plan');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Buy Data Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Network*</span>
          <select
            name="network"
            value={formData.network}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            {Object.keys(dataPlans).map((net) => (
              <option key={net} value={net}>{net}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Data type</span>
          <select
            name="dataType"
            value={formData.dataType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            {getDataTypes(formData.network).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Mobile number*</span>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Plan</span>
          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a Plan</option>
            {dataPlans[formData.network]?.map((plan) => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Amount</span>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            disabled={formData.network === '9MOBILE'}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default BuyDataPlan;