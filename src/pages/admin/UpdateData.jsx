import { useState, useEffect } from 'react'; 
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

const UpdateData = () => {
  const { networkProvider } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const { plan } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    networkProvider: plan?.networkProvider || '',
    plan: plan?.plan || '',
    duration: plan?.duration || '',
    amount: plan?.price || '',
  });

  useEffect(() => {
    if (!plan) {
      setShowModal(true);
    }
  }, [plan]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/v1/admin/update-data`,
        {
          networkProvider: formData.networkProvider,
          plan: formData.plan,
          duration: formData.duration,
          price: formData.amount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`,
          },
        }
      );
    
      if (data.error) {
        setError(data.error || 'Failed to update data plan');
        setAlertType("error");
      } else {
        setError(data.message || 'Data plan updated successfully!');
        setAlertType("success");
      }

      setTimeout(() => {
        setError('');
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to update data plan');
      setAlertType("error");

      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className=" py-6 px-3 rounded-lg">
      <div className="max-w-md mx-auto bg-white p-3 rounded-lg shadow-md relative">
        <div className="absolute top-2 left-2">
          <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
        </div>
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

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-2 right-2 px-4 py-2 rounded-lg shadow-lg text-white ${alertType === "success" ? "bg-green-500" : "bg-red-500"}`}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal for missing plan */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Plan Not Found</h2>
            <p className="mb-6 text-gray-700">
              The data plan you're trying to update wasn't found. Please go to the pricing page to select a valid plan.
            </p>
            <div className="flex justify-end space-x-3">
              {/* <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button> */}
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Link to={'/profile/pricing'}>Go to Pricing</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateData;
