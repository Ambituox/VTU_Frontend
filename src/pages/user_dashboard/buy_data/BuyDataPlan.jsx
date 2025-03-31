import { useState } from 'react';

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com'
const BuyDataPlan = () => {
  const [formData, setFormData] = useState({
    network: 'MTN',
    plan: '',
    duration: '',
    mobileNumber: '',
    amount: '',
  });

  // const [formData, setFormData] = useState({
  //   network: 'MTN',
  //   plan: '',
  //   duration: '',
  //   mobileNumber: '',
  //   amount: '',
  // });

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  // Available plans and durations
  const planOptions = {
    '500MB': ['1 days', '2 days'],
    '1.0GB': ['1 days', '2 days',],
    '1.5GB': ['2 days', '7 days'],
    '2.0GB': ['7 days', '14 days',],
    '5.0GB': ['14 days', '30 days'],
    '10.0GB': ['7 days','14 days','30 days'],
  };

  const handleSearch = async () => {
    if (!formData.plan || !formData.duration) {
      setError('Please select a plan and duration before searching.');
      setDialogOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/find-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          network: `${formData.network}_PLAN`,
          plan: formData.plan,
          duration: formData.duration,
        }),
      });

      const data = await response.json();
      console.log(data);
      

      if (data.plans && data.plans.length > 0) {
        setSearchResults(data.plans);
        setConfirmDialog(true); // Open confirmation modal after search
      } else {
        setError('No data plans found for your selection.');
        setDialogOpen(true);
      }
    } catch (error) {
      setError('Failed to fetch data plans.');
      setDialogOpen(true);
    }
    setLoading(false);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setError(data.message || 'Data plan purchased successfully!');
      setDialogOpen(true);
    } catch (error) {
      setError('Failed to purchase data plan.');
      setDialogOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'plan' ? { duration: '' } : {}), // Reset duration when changing plan
    }));
  };

  return (
    <div className="bg-green-100 lg:py-20 py-6 lg:px6 p-3 rounded-lg">
      <div className="max-w-4xl mx-auto bg-green-200 p-3 rounded-lg shadow-md">
        <h2 className="text-2xl text-slate-800 font-semibold mb-4 text-center">Buy Data Plan</h2>

        {/* Search Section */}
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold py-2 px-3 max-w-56 rounded-md bg-green-50 text-slate-800">Search for a Data Plan</h3>

          <label className="block my-5">
            <span className="text-gray-700">Network</span>
            <select name="network" value={formData.network} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded">
              {['MTN', 'AIRTEL', 'GLO', '9MOBILE'].map((net) => (
                <option key={net} value={net}>{net}</option>
              ))}
            </select>
          </label>

          <label className="block mb-2">
            <span className="text-gray-700">Plan</span>
            <select name="plan" value={formData.plan} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded">
              <option value="">Select Plan</option>
              {Object.keys(planOptions).map((plan) => (
                <option key={plan} value={plan}>{plan}</option>
              ))}
            </select>
          </label>

          <label className="block mb-2">
            <span className="text-gray-700">Duration</span>
            <select name="duration" value={formData.duration} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded" disabled={!formData.plan}>
              <option value="">Select Duration</option>
              {formData.plan && planOptions[formData.plan].map((duration) => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </label>

          <button type="button" onClick={handleSearch} className="w-full bg-blue-600 text-white py-3 mt-5 rounded font-semibold hover:bg-blue-700">
            {loading ? 'Searching...' : 'Search Data Plan'}
          </button>
        </div>

        {/* Purchase Section (Shown only after confirmation) */}
        {searchResults.length > 0 && (
          <form onSubmit={handlePurchase} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Mobile number*</span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Amount</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </form>
        )}

        {/* Error Dialog */}
        {dialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-red-600">Error</h3>
              <p className="mt-2 text-gray-800">{error}</p>
              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={() => setDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {confirmDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-green-600">Proceed to Purchase</h3>
              <p className="mt-2 text-gray-800">Data found! Do you want to proceed?</p>
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                onClick={() => setConfirmDialog(false)}
              >
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyDataPlan;
