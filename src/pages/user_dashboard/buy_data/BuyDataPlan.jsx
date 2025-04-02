import { duration } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import BuyDataNow from '../../../components/BuyData/BuyDataNow';

// Define the base API URL for the application
const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://vtu-xpwk.onrender.com';

// Dialog component to display error messages
const Dialog = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <p className="text-gray-800">{message}</p>
      <button className="mt-4 w-full bg-red-500 text-white py-2 rounded" onClick={onClose}>Close</button>
    </div>
  </div>
);

// ConfirmDialog component that asks for user confirmation
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

// Main BuyDataPlan component
const BuyDataPlan = () => {
  // State to store form data (network, plan, duration, etc.)
  const [formData, setFormData] = useState({
    network: 'MTN',
    plan: '',
    duration: '',
    mobileNumber: '',
    price: '',
  });

  // State for storing data plans
  const [plans, setPlans] = useState([]);
  // State for loading state during API calls
  const [loading, setLoading] = useState(false);
  // State for storing error messages
  const [error, setError] = useState('');
  // State for controlling dialog visibility
  const [dialogOpen, setDialogOpen] = useState(false);
  // State for controlling confirm dialog visibility
  const [confirmDialog, setConfirmDialog] = useState(false);
  // State for controlling whether to show the purchase form
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);

  const [datas, setDatas] = useState([]);

  // Get current user from Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Fetch data plans from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/admin/get-all-data`, {
          headers: { 'Authorization': `Bearer ${currentUser.token}` }
        });
        const data = await response.json();
        if (response.ok) setPlans(data);
        else throw new Error('Failed to load data plans');
      } catch (err) {
        setError(err.message);
        setDialogOpen(true);
      }
    };
    fetchData(); // Fetch data when the component is mounted
  }, [currentUser.token]); // The effect runs only once when the current user token is available

  // Handle form data changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === 'plan' ? { duration: '' } : {}), // Clear duration if plan is changed
    }));
  };

  // Handle search for data plans
  const handleSearch = async () => {
    if (!formData.plan || !formData.duration) {
      setError('Please select a plan and duration.');
      setDialogOpen(true);
      return;
    }

    // Check and update the duration if it contains 'day' but not 'days'
    let updatedDuration = formData.duration.includes('day') && !formData.duration.includes('days')
        ? formData.duration.replace('day', 'days') // Replace 'day' with 'days'
        : formData.duration;

    // Construct the payload for the API call
    const payload = {
      network: `${formData.network}_PLAN`, // Append '_PLAN' to the network provider
      plan: formData.plan,
      duration: updatedDuration // Use the updated duration
    };

    const databaseData = {
      network: `${formData.network}`, // Append '_PLAN' to the network provider
      plan: formData.plan,
      duration: updatedDuration, // Use the updated duration
      price: formData.price
    };

    // console.log(databaseData);
    console.log(formData);

    try {
      // console.log(payload); // Log the payload for debugging

      setLoading(true); // Set loading state to true

      // Send the request to find data plans
      const response = await fetch(`${API_BASE_URL}/api/v1/find-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`, // Pass the current user's token in headers
        },
        body: JSON.stringify(payload), // Send the payload as request body
      });

      const data = await response.json(); // Parse the response data

      // Handle success response
      if (data.success && data.data) {
        setLoading(false); // Set loading state to false
    
      // Check if the response `month_validate` matches `formData.duration`
      if (String(data.data.month_validate) === String(formData.duration)) {
          setDatas(databaseData);
          setConfirmDialog(true); // Show the confirmation dialog
          console.log("Validated data:", datas); // Log the validated data
        } else {
          setError("Invalid duration selected.");
          setDialogOpen(true);
      }
    
        return;
      }

      // Handle failure response
      setError(data.error); // Set the error message
      setDialogOpen(true); // Open the dialog
      setLoading(false); // Set loading state to false

    } catch (err) {
      setError(err.message); // Set error message
      setDialogOpen(true); // Open the error dialog
      setLoading(false); // Set loading state to false
    }
  };

  // Find the selected plan's price
  const selectedPlan = plans.find((plan) => plan.plan === formData.plan);
  const price = selectedPlan ? selectedPlan.price : ''; // Get the price of the selected plan
  
  // console.log(datas);
  
  return (
    <div className="bg-white py-6 px-3 rounded-lg">
      <div className="max-w-4xl mx-auto p-3 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Buy Data Plan</h2>
        {!showPurchaseForm ? ( // If purchase form is not shown, display the search form
          <>
            <div className="p-4 bg-white rounded-lg">
              <label className="block my-5">
                <span className="text-gray-700">Network</span>
                <select name="network" value={formData.network} onChange={handleChange} className="mt-1 block w-full p-3 border rounded">
                  {['MTN', 'AIRTEL', 'GLO', '9MOBILE'].map((network, index) => ( // Map networks to options
                    <option key={index} value={network}>{network}</option>
                  ))}
                </select>
              </label>

              <label className="block my-5">
                <span className="text-gray-500">Plan</span>
                <select name="plan" value={formData.plan} onChange={handleChange} className="mt-1 block w-full p-3 border rounded">
                  <option value="" className='text-gray-400'>Select Plan</option>
                  {plans.map((p, index) => (
                    p.networkProvider === formData.network && <option key={index} value={p.plan}>{p.plan}</option>
                  ))}
                </select>
              </label>

              <label className="block my-5">
                <span className="text-gray-500">Duration</span>
                <select name="duration" disabled={!formData.plan} value={formData.duration} onChange={handleChange} className="mt-1 block w-full p-3 border border-gray-300 rounded">
                  <option value="" className='text-gray-400'>Select Duration</option>
                  {plans
                    .filter((network) => network.networkProvider === formData.network)
                    .map((network, index) => (
                      <option key={index} value={network.duration}>
                        {network.duration}
                      </option>
                    ))}
                </select>
              </label>

              {/* Price field */}
              <label className='block my-5'>
                <span className="text-gray-700">Price</span><br />
                <input type="text" name='price' onChange={handleChange}  value={price ? formData.price = price : 'No Price'} className='text-gray-500  font-semibold mt-1 block w-full p-3 border border-gray-300 rounded'/>
              </label>

              <button onClick={handleSearch} className='bg-blue-500 w-full font-semibold p-3 text-white rounded-md'>
                {loading ? 
                (
                  <span className="flex justify-center items-center gap-2"><FaArrowsRotate className='animate-spin' />Searching Data...</span>
                ) : 'Search Data'}
              </button>
            </div>
          </>
        ) : (
          <dataContext.Provider value={datas}>
            <BuyDataNow datas={datas}/>
          </dataContext.Provider>
        )}
        {dialogOpen && <Dialog message={error} onClose={() => setDialogOpen(false)} />}
        {confirmDialog && <ConfirmDialog onProceed={() => { setShowPurchaseForm(true); setConfirmDialog(false); }} onClose={() => setConfirmDialog(false)} />}
      </div>
    </div>
  );
};

export default BuyDataPlan;
