import React, { useState } from 'react';

export default function Solution_center() {
  const [formData, setFormData] = useState({
    issueType: "",
    referenceNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Validate the form
    if (!formData.issueType || formData.issueType === "Select Issue Type") {
      setLoading(false);
      setErrorMessage("Please select an issue type.");
      return;
    }

    if (!formData.referenceNo) {
      setLoading(false);
      setErrorMessage("Please enter the reference number.");
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Your request has been successfully submitted.");
      setFormData({
        issueType: "",
        referenceNo: "",
      });
    }, 2000); // Simulate a network request
  };

  return (
    <div className="p-3 min-h-screen">
      <div>
        {/* Go back button */}
        {/* <button className="font-medium mb-4 px-4 py-2 bg-white rounded-md">
          Go Back
        </button> */}

        {/* Solution Center Form */}
        <form onSubmit={handleSubmit} className="lg:max-w-[50%] max-w-[97%] mt-5 mx-auto bg-white rounded-md lg:p-4 p-2 shadow-lg">
          <h2 className="font-medium text-xl text-center">Instant Account Funding</h2>
          <p className="text-gray-400 text-sm italic text-center">
            Payments are Processed Automatically
          </p>

          {/* Issue Type Selection */}
          <div className="my-5">
            <p className="pb-2">Select Issue Type:</p>
            <select name="issueType" id="issueType" className="w-full rounded-md border py-2 px-3 outline-none" value={formData.issueType} onChange={handleChange} required>
              <option value="Select Issue Type">Select Issue Type</option>
              <option value="Account Deposit / Funding Issue">
                Account Deposit / Funding Issue
              </option>
              <option value="Data Purchase Issue">Data Purchase Issue</option>
              <option value="Airtime Purchase Issue">Airtime Purchase Issue</option>
            </select>
          </div>

          {/* Reference No. Input */}
          <div>
            <p className="pb-2 text-gray-400">Reference No. / Order Id:</p>
            <input type="text" name="referenceNo" placeholder="Enter Reference Number" className="w-full rounded-md border py-2 px-3 outline-none" value={formData.referenceNo} onChange={handleChange} required/>
            <p className="pt-2 text-gray-400">
              For{" "}
              <span className="font-medium">Funding Issues,</span> check your email for the payment Reference No.
            </p>
          </div>

          {/* Instructions Based on Issue Type */}
          {formData.issueType === "Account Deposit / Funding Issue" && (
            <div className="my-4 text-sm text-gray-600">
              <p>
                If you are facing an issue with your account deposit, ensure that the reference number is correct.
                You can check your email for more details.
              </p>
            </div>
          )}

          {formData.issueType === "Data Purchase Issue" && (
            <div className="my-4 text-sm text-gray-600">
              <p>If you're experiencing an issue with your data purchase, provide the exact reference number for further assistance.</p>
            </div>
          )}

          {formData.issueType === "Airtime Purchase Issue" && (
            <div className="my-4 text-sm text-gray-600">
              <p>Please make sure to enter the reference number from your airtime purchase for better resolution.</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-5 flex justify-center items-center">
            <button
              type="submit"
              className="py-2 rounded-md w-[160px] bg-gray-800 text-white hover:bg-gray-600 duration-150 font-medium"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full mr-2"></span>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>

        {/* Error Message Tooltip */}
        {errorMessage && (
          <div className="mt-4 p-2 bg-gray-900 text-white rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-2 bg-green-500 text-white rounded-md text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
