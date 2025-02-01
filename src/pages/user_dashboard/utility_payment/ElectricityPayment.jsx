import React, { useState } from "react";

const ElectricityBillPayment = () => {
  const [formData, setFormData] = useState({
    discoName: "",
    meterNumber: "",
    meterType: "",
    amount: "",
    customerPhone: "",
  });

  const [modal, setModal] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { discoName, meterNumber, meterType, amount, customerPhone } =
      formData;

    if (
      !discoName ||
      !meterNumber ||
      !meterType ||
      !amount ||
      !customerPhone
    ) {
      setModal({
        show: true,
        type: "error",
        message: "All fields are required!",
      });
      return;
    }

    // Ensure customer phone is valid
    if (!/^\d{11}$/.test(customerPhone)) {
      setModal({
        show: true,
        type: "error",
        message: "Customer phone must be a valid 11-digit number!",
      });
      return;
    }

    setLoading(true); // Activate loading effect

    // Simulate an API call
    setTimeout(() => {
      setLoading(false); // Turn off loading effect
      setModal({
        show: true,
        type: "success",
        message: "Electricity bill payment validated successfully!",
      });
    }, 2000); // Mock delay of 2 seconds
  };

  const closeModal = () => {
    setModal({ show: false, type: "", message: "" });
  };

  return (
    <div className="py-10 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Electricity Bill Payment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="discoName" className="block text-sm font-medium mb-1">
              Disco name*
            </label>
            <select
              id="discoName"
              name="discoName"
              value={formData.discoName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-------</option>
              <option value="IKEJA">Ikeja Electric</option>
              <option value="EKO">Eko Electricity Distribution Company</option>
              <option value="ABUJA">Abuja Electricity Distribution Company</option>
              <option value="KANO">Kano Electricity Distribution Company</option>
              <option value="ENUGU">Enugu Electricity Distribution Company</option>
              <option value="JOS">Jos Electricity Distribution Company</option>
              <option value="PHED">Port Harcourt Electricity Distribution Company</option>
              <option value="YOLA">Yola Electricity Distribution Company</option>
              <option value="IBADAN">Ibadan Electricity Distribution Company</option>
              <option value="BENIN">Benin Electricity Distribution Company</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="meterNumber" className="block text-sm font-medium mb-1">
              Meter number*
            </label>
            <input type="text" id="meterNumber" name="meterNumber" value={formData.meterNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="mb-4">
            <label
              htmlFor="meterType"
              className="block text-sm font-medium mb-1"
            >
              Meter Type*
            </label>
            <select id="meterType" name="meterType" value={formData.meterType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-------</option>
              <option value="IKEJA">Ikeja Electric</option>
              <option value="EKO">Eko Electricity Distribution Company</option>
              <option value="ABUJA">Abuja Electricity Distribution Company</option>
              <option value="KANO">Kano Electricity Distribution Company</option>
              <option value="ENUGU">Enugu Electricity Distribution Company</option>
              <option value="JOS">Jos Electricity Distribution Company</option>
              <option value="PHED">Port Harcourt Electricity Distribution Company</option>
              <option value="YOLA">Yola Electricity Distribution Company</option>
              <option value="IBADAN">Ibadan Electricity Distribution Company</option>
              <option value="BENIN">Benin Electricity Distribution Company</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount*
            </label>
            <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="mb-4">
            <label htmlFor="customerPhone" className="block text-sm font-medium mb-1">
              Customer phone*
            </label>
            <input type="text" id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} placeholder="customer phone number" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <button type="submit" disabled={loading} className={`w-full ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded`}
          >
            {loading ? "Submitting..." : "Validate"}
          </button>
        </form>
      </div>

      {modal.show && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h3
              className={`text-lg font-bold mb-2 ${
                modal.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {modal.type === "error" ? "Error" : "Success"}
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

export default ElectricityBillPayment;
