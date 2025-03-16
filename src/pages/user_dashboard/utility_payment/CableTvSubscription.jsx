import React, { useState } from "react";

const cablePlans = {
  DSTV: [
    "DSTV Padi = N4400",
    "DSTV Yanga = N6000",
    "DSTV CONFAM = N11000",
    "DSTV Compact = N19000",
    "DSTV Compact XtraView + HDPVR = N24000",
    "DSTV premium extra view = N24500",
    "DSTV Compact Plus = N30000",
    "DSTV Asia French = N39000",
    "DSTV Premium = N44500",
  ],
  GOTV: [
    "GOtv Smallie-monthly = N1900",
    "GOtv Jinja = N3900",
    "GOtv Smallie - Quarterly = N5700",
    "GOtv Jolli = N5800",
    "GOtv Max = N8500",
    "GOtv Supa monthly = N11400",
    "GOtv Supa plus monthly = N16800",
    "GOtv Smallie - Yearly = N22800",
  ],
  Startimes: [
    "Nova - 1 Week = N600",
    "Basic - 1 Week = N1550",
    "Smart - 1 Week = N1550",
    "Classic - 1 Week = N1900",
    "Nova - 1 Month = N1900",
    "Nova = N1900",
    "Super - 1 Week = N3000",
    "Basic - 1 Month = N3700",
    "Smart - 1 Month = N3800",
    "Classic - 1 Month = N5500",
    "Super - 1 Month = N9000",
  ],
};

const CableSubscriptionForm = () => {
  const [cableName, setCableName] = useState("DSTV");
  const [smartCard, setSmartCard] = useState("");
  const [cablePlan, setCablePlan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { cableName, smartCard, cablePlan };

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(`Subscription Successful: ${data.message}`);
    } catch (error) {
      console.error("Error submitting subscription:", error);
      alert("Failed to submit subscription.");
    }
  };

  return (
    <div className="h-screen ">
      <div className=" max-w-3xl mt-20 mx-auto bg-white shadow-lg rounded-lg lg:p-6 p-3">
          <h1 className="text-xl font-bold mb-4 text-center">Cablesub</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Cable Name*</label>
              <select
                className="w-full p-2 border rounded"
                value={cableName}
                onChange={(e) => setCableName(e.target.value)}
              >
                {Object.keys(cablePlans).map((cable) => (
                  <option key={cable} value={cable}>
                    {cable}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Smart Card number / IUC number*</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={smartCard}
                onChange={(e) => setSmartCard(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Cable Plan*</label>
              <select
                className="w-full p-2 border rounded"
                value={cablePlan}
                onChange={(e) => setCablePlan(e.target.value)}
                required
              >
                <option value="">---------</option>
                {cablePlans[cableName].map((plan, index) => (
                  <option key={index} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
            >
              Validate
            </button>
          </form>

          <p className="text-gray-600 mt-4">
            You can contact DSTV/GOtv's customers care unit on 01-2703232/08039003788 or the toll
            free lines: 08149860333, 07080630333, and 09090630333 for assistance,
            STARTIMES's customers care unit on (094618888, 014618888)
          </p>
        </div>
      </div>
  );
};

export default CableSubscriptionForm;
