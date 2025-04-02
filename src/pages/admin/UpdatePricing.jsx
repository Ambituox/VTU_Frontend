import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

const Dialog = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <p className="text-gray-800">{message}</p>
      <button className="mt-4 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>Close</button>
    </div>
  </div>
);

const UpdateData = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    networkProvider: '',
    plan: '',
    duration: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // 🔹 Fetch existing data by ID when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/v1/admin/get-data/${id}`, {
          headers: { 'Authorization': `Bearer ${currentUser.token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch data');

        // ✅ Set fetched data as default form values
        setFormData({
          networkProvider: data.plan_network || '',
          plan: data.plan || '',
          duration: data.month_validate || '',
          amount: data.plan_amount || '',
        });

      } catch (err) {
        setError(err.message);
        setDialogOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser.token]);

  // 🔹 Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔹 Handle form submission
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/admin/update-data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to update data');

      setDialogOpen(true);
      setError('Data updated successfully!');
    } catch (err) {
      setError(err.message);
      setDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-6 px-3 rounded-lg">
      <div className="max-w-4xl mx-auto p-3 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Update Data Plan</h2>
        <div className="p-4 bg-white rounded-lg">
          <label className="block my-5">
            <span className="text-gray-700">Network Provider</span>
            <select name="networkProvider" value={formData.networkProvider} onChange={handleChange} className="mt-1 block w-full p-3 border rounded">
              {['MTN', 'AIRTEL', 'GLO', '9MOBILE'].map((network, index) => (
                <option key={index} value={network}>{network}</option>
              ))}
            </select>
          </label>

          <label className="block my-5">
            <span className="text-gray-700">Plan</span>
            <input type="text" name="plan" value={formData.plan} onChange={handleChange} className="mt-1 block w-full p-3 border rounded" />
          </label>

          <label className="block my-5">
            <span className="text-gray-700">Duration</span>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 block w-full p-3 border rounded" />
          </label>

          <label className="block my-5">
            <span className="text-gray-700">Amount</span>
            <input type="text" name="amount" value={formData.amount} onChange={handleChange} className="mt-1 block w-full p-3 border rounded" />
          </label>

          <button onClick={handleUpdate} className='bg-blue-500 w-full font-semibold p-3 text-white rounded-md'>
            {loading ? 'Updating...' : 'Update Data'}
          </button>
        </div>
        {dialogOpen && <Dialog message={error} onClose={() => setDialogOpen(false)} />}
      </div>
    </div>
  );
};

export default UpdateData;
