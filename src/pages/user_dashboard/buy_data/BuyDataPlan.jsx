import { createContext, useEffect, useState } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import BuyDataNow from '../../../components/BuyData/BuyDataNow';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vtu-xpwk.onrender.com';

const Dialog = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <p className="text-gray-800">{message}</p>
      <button className="mt-4 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>Close</button>
    </div>
  </div>
);

const ConfirmDialog = ({ onProceed, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <p className="text-gray-800">Data plan available. Proceed to payment</p>
      <button className="mt-4 w-full bg-green-500 text-white py-2 rounded" onClick={onProceed}>Proceed</button>
      <button className="mt-2 w-full bg-gray-300 text-gray-800 py-2 rounded" onClick={onClose}>Cancel</button>
    </div>
  </div>
);

export const dataContext = createContext();

const BuyDataPlan = () => {
  const [formData, setFormData] = useState({
    network: 'MTN', // Fixed: 'MTN' -> 'MTN_PLAN'
    plan: '',
    duration: '',
    mobileNumber: '',
    price: '',
    sku: '',
  });

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [datas, setDatas] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/admin/get-all-data`, {
          headers: { 'Authorization': `Bearer ${currentUser.token}` }
        });

        const data = await response.json();
        if (response.ok) {
          setPlans(data);
        } else {
          throw new Error('Failed to load data plans');
        }
      } catch (err) {
        setError(err.message);
        setDialogOpen(true);
      }
    };

    fetchData();
  }, [currentUser.token]);

  useEffect(() => {
    if (plans.length > 0 && formData.plan) {
      const selectedPlan = plans.find((plan) => plan.plan === formData.plan);
      if (selectedPlan) {
        setFormData((prev) => ({
          ...prev,
          sku: selectedPlan.sku,
          price: selectedPlan.price,
        }));
      }
    }
  }, [plans, formData.plan]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'plan' ? { duration: '' } : {}),
    }));
  };

  let updatedDuration = formData.duration.includes('day') && !formData.duration.includes('days')
    ? formData.duration.replace('day', 'days')
    : formData.duration;

  const payload = {
    network: `${formData.network}_PLAN`,
    plan: formData.plan,
    duration: updatedDuration
  };

  const handleSearch = async () => {
    if (!formData.plan || !formData.duration) {
      setError('Please select a plan and duration.');
      setDialogOpen(true);
      return;
    }

    const databaseData = {
      network: `${formData.network}`,
      plan: formData.plan,
      duration: updatedDuration,
      price: formData.price,
      sku: formData.sku
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v1/find-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setLoading(false);
        console.log(data);
        
        
        navigate("buy-now", { state: databaseData });
        setConfirmDialog(true);
        return;
      }

      setError(data.error);
      setDialogOpen(true);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setDialogOpen(true);
      setLoading(false);
    }
  };

  const selectedPlan = plans.find((plan) =>
    plan.plan === formData.plan && plan.networkProvider === formData.network
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-whie py-6 px-3 rounded-lg">
      <div className="relative bg-white max-w-md mx-auto p-3 rounded-lg shadow-md">
        <div className="absolute top-2 left-2">
          <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white" onClick={handleBack}>Back</button>
        </div>
        <h2 className="text-2xl font-semibold text-center">Buy Data Plan</h2>
        {!showPurchaseForm ? (
          <div className="p-4 bg-white rounded-lg">
            <label className="block my-5">
              <span className="text-gray-700">Network</span>
              <select name="network" value={formData.network} onChange={handleChange} className="mt-1 block w-full p-3 border rounded">
                {['MTN', 'AIRTEL', 'GLO', '9MOBILE'].map((network, index) => (
                  <option key={index} value={network}>{network}</option>
                ))}
              </select>
            </label>

            <label className="block my-5">
              <span className="text-gray-500">Plan</span>
              <select name="plan" value={formData.plan} onChange={handleChange} className="mt-1 block w-full p-3 border rounded">
                <option value="" className='text-gray-400'>Select Plan</option>
                {plans.map((p, index) =>
                  p.networkProvider === formData.network && (
                    <option key={index} value={p.plan}>{p.plan}</option>
                  )
                )}
              </select>
            </label>

            <label className="block my-5">
              <span className="text-gray-500">Duration</span>
              <select
                name="duration"
                disabled={!formData.plan}
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded"
              >
                <option value="" className='text-gray-400'>Select Duration</option>
                {plans
                  .filter((p) =>
                    p.networkProvider === formData.network &&
                    p.plan === formData.plan
                  )
                  .map((p, index) => (
                    <option key={index} value={p.duration}>{p.duration}</option>
                  ))}
              </select>
            </label>

            <label className='block my-5'>
              <span className="text-gray-700">Price</span><br />
              <input
                type="text"
                name="price"
                value={selectedPlan ? selectedPlan.price : ''}
                readOnly
                className="text-gray-500 font-semibold mt-1 block w-full p-3 border border-gray-300 rounded"
              />
            </label>

            <button onClick={handleSearch} className='bg-blue-500 w-full font-semibold p-3 text-white rounded-md'>
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <FaArrowsRotate className='animate-spin' />Searching Data...
                </span>
              ) : 'Search Data'}
            </button>
          </div>
        ) : (
          <BuyDataNow datas={datas} />
        )}

        {dialogOpen && <Dialog message={error} onClose={() => setDialogOpen(false)} />}
        {confirmDialog && (
          <ConfirmDialog
            onProceed={() => {
              setShowPurchaseForm(true);
              setConfirmDialog(false);
            }}
            onClose={() => setConfirmDialog(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BuyDataPlan;
