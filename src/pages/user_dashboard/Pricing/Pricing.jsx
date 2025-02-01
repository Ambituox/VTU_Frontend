import React, { useState } from "react";

const dataPlans = {
  "Airtel Data": [
    { size: "100.0MB", price: "₦27.5", validity: "7days" },
    { size: "100.0MB", price: "₦70.0", validity: "1 day" },
    { size: "250.0MB", price: "₦75.0", validity: "14 days" },
    { size: "300.0MB", price: "₦82.5", validity: "7 days(weekly)" },
    { size: "100.0MB", price: "₦98.0", validity: "1 day plan" },
    { size: "450.0MB", price: "₦117.6", validity: "7 days day and night plan" },
    { size: "300.0MB", price: "₦120.0", validity: "2 days" },
    { size: "500.0MB", price: "₦137.5", validity: "30 days corporate gifting" },
    { size: "500.0MB", price: "₦145.0", validity: "14 days" },
    { size: "200.0MB", price: "₦176.0", validity: "3 days" },
    { size: "1.0GB", price: "₦220.0", validity: "2 days" },
    { size: "1.0GB", price: "₦250.0", validity: "7 days" },
    { size: "1.0GB", price: "₦275.0", validity: "30 days corporate gifting" },
    { size: "350.0MB", price: "₦294.0", validity: "7 days plan" },
    { size: "2.0GB", price: "₦320.0", validity: "2 days" },
    { size: "1.0GB", price: "₦343.0", validity: "7 days plan" },
    { size: "1.5GB", price: "₦345.0", validity: "7 days" },
    { size: "750.0MB", price: "₦490.0", validity: "7 days" },
    { size: "2.5GB", price: "₦490.0", validity: "2 days" },
    { size: "2.0GB", price: "₦490.0", validity: "2 days plan" },
    { size: "2.0GB", price: "₦519.0", validity: "14 days" },
    { size: "3.0GB", price: "₦520.0", validity: "7 days" },
    { size: "2.0GB", price: "₦550.0", validity: "30 days corporate gifting" },
    { size: "1.2GB", price: "₦980.0", validity: "30 days" },
    { size: "4.0GB", price: "₦1020.0", validity: "30 days" },
    { size: "1.5GB", price: "₦1176.0", validity: "30 days" },
    { size: "2.0GB", price: "₦1176.0", validity: "30 days" },
    { size: "5.0GB", price: "₦1190.0", validity: "14 days" },
    { size: "5.0GB", price: "₦1375.0", validity: "30 days corporate gifting" },
    { size: "3.0GB", price: "₦1470.0", validity: "30 days" },
    { size: "6.0GB", price: "₦1470.0", validity: "7 days plan" },
    { size: "6.0GB", price: "₦1645.0", validity: "30 days" },
    { size: "4.5GB", price: "₦1960.0", validity: "30 days" },
    { size: "10.0GB", price: "₦2020.0", validity: "30 days" },
    { size: "6.0GB", price: "₦2450.0", validity: "30 days" },
    { size: "10.0GB", price: "₦2750.0", validity: "30 days corporate gifting" },
    { size: "10.0GB", price: "₦2940.0", validity: "30 days" },
    { size: "15.0GB", price: "₦3020.0", validity: "30 days" },
    { size: "20.0GB", price: "₦4000.0", validity: "30 days" },
    { size: "30.0GB", price: "₦4400.0", validity: "7DAYS ROUTER PLAN" },
    { size: "18.0GB", price: "₦4900.0", validity: "30 days" },
    { size: "40.0GB", price: "₦7000.0", validity: "30 days" },
    { size: "75.0GB", price: "₦14700.0", validity: "30 days" },
    { size: "120.0GB", price: "₦19600.0", validity: "30 days" },
    { size: "1.0TB", price: "₦98000.0", validity: "1 year" }
  ],
  "MTN Data": [
    { planSize: "25.0MB", price: "₦13.0", validity: "30 days" },
    { planSize: "20.0MB", price: "₦15.0", validity: "30 days" },
    { planSize: "50.0MB", price: "₦25.0", validity: "30 days corporate gifting" },
    { planSize: "100.0MB", price: "₦30.0", validity: "30 days" },
    { planSize: "50.0MB", price: "₦46.0", validity: "30 days" },
    { planSize: "40.0MB", price: "₦49.0", validity: "1 day" },
    { planSize: "150.0MB", price: "₦50.0", validity: "30 days" },
    { planSize: "150.0MB", price: "₦60.0", validity: "30 days corporate gifting" },
    { planSize: "250.0MB", price: "₦69.7", validity: "30 days" },
    { planSize: "250.0MB", price: "₦70.0", validity: "30 days corporate gifting" },
    { planSize: "100.0MB", price: "₦95.0", validity: "1 Day" },
    { planSize: "500.0MB", price: "₦122.5", validity: "30 days" },
    { planSize: "500.0MB", price: "₦129.0", validity: "30 days" },
    { planSize: "750.0MB", price: "₦135.0", validity: "30 days" },
    { planSize: "500.0MB", price: "₦138.5", validity: "30 days" },
    { planSize: "500.0MB", price: "₦141.0", validity: "30 days corporate gifting" },
    { planSize: "500.0MB", price: "₦160.0", validity: "30 days" },
    { planSize: "1.0GB", price: "₦200.0", validity: "1 day" },
    { planSize: "1.0GB", price: "₦200.0", validity: "1 day" },
    { planSize: "1.0GB", price: "₦200.0", validity: "1 day" },
    { planSize: "200.0MB", price: "₦209.0", validity: "3-days(direct)" },
    { planSize: "250.0MB", price: "₦209.0", validity: "2-days(direct)" },
    { planSize: "1.0GB", price: "₦240.0", validity: "30 days" },
    { planSize: "1.0GB", price: "₦259.0", validity: "30 days" },
    { planSize: "1.0GB", price: "₦277.0", validity: "30 days" },
    { planSize: "1.0GB", price: "₦282.0", validity: "30 days (corporate gifting)" },
    { planSize: "350.0MB", price: "₦285.0", validity: "7-day(direct)" },
    { planSize: "750.0MB", price: "₦285.0", validity: "3-days(direct)" },
    { planSize: "1.0GB", price: "₦290.0", validity: "30 days" },
    { planSize: "1.0GB", price: "₦343.0", validity: "1 day" },
    { planSize: "1.5GB", price: "₦392.0", validity: "7 days" },
    { planSize: "1.5GB", price: "₦408.0", validity: "30 days" },
    { planSize: "750.0MB", price: "₦470.0", validity: "7 days(direct)" },
    { planSize: "600.0MB", price: "₦475.0", validity: "7 days" },
    { planSize: "2.0GB", price: "₦480.0", validity: "30 days" }
  ],
  "Glo Data": [
    { planSize: '50.0MB', price: '₦46.0', validity: '50MB incl 5MB nite' },
    { planSize: '200.0MB', price: '₦53.0', validity: '14 days (corporate gifting)' },
    { planSize: '150.0MB', price: '₦92.0', validity: '1 day' },
    { planSize: '500.0MB', price: '₦130.0', validity: '30 days (corporate gifting)' },
    { planSize: '350.0MB', price: '₦184.0', validity: '350MB incl 110MB nite + Extra' },
    { planSize: '1.0GB', price: '₦187.0', validity: '1 day' },
    { planSize: '1.0GB', price: '₦265.0', validity: '30 days (corporate gifting)' },
    { planSize: '2.0GB', price: '₦282.0', validity: '1 day' },
    { planSize: '1.8GB', price: '₦460.0', validity: '14 days 800MB day + 1GB nite' },
    { planSize: '3.5GB', price: '₦475.0', validity: '2 days' },
    { planSize: '2.0GB', price: '₦530.0', validity: '30 days (corporate gifting)' },
    { planSize: '3.0GB', price: '₦795.0', validity: '30 days (corporate gifting)' },
    { planSize: '3.9GB', price: '₦920.0', validity: '30 days 1.9GB day + 2GB nite' },
    { planSize: '5.0GB', price: '₦1300.0', validity: '30 days (corporate gifting)' },
    { planSize: '7.5GB', price: '₦1380.0', validity: '30 days 3.5GB day + 4GB nite' },
    { planSize: '15.0GB', price: '₦1840.0', validity: '7 days' },
    { planSize: '9.2GB', price: '₦1840.0', validity: '30 days 5.2GB day + 4GB nite' },
    { planSize: '10.8GB', price: '₦2300.0', validity: '30 days 6.8GB day + 4GB nite' },
    { planSize: '10.0GB', price: '₦2600.0', validity: '30 days' },
    { planSize: '14.0GB', price: '₦2760.0', validity: '30 days 10GB day + 4GB nite' },
    { planSize: '18.0GB', price: '₦3680.0', validity: '30 days 14GB day + 4GB nite' },
    { planSize: '20.0GB', price: '₦4600.0', validity: '30 days 20GB day + 4GB nite' },
    { planSize: '27.0GB', price: '₦7360.0', validity: '30 days 27GB day + 2GB nite' },
    { planSize: '50.0GB', price: '₦9200.0', validity: '50GB incl 2GB nite + Extra 5GB' },
    { planSize: '93.0GB', price: '₦13800.0', validity: '30 days' },
    { planSize: '119.0GB', price: '₦16560.0', validity: '30 days' },
    { planSize: '138.0GB', price: '₦18400.0', validity: '30 days' },
    { planSize: '1.0TB', price: '₦92000.0', validity: '30 days' },
    { planSize: '1.0TB', price: '₦221000.0', validity: '30 days' }
  ],
  "9mobile Data": [
    { planSize: "10.0MB", price: "₦10.0", validity: "30 days" },
    { planSize: "15.0MB", price: "₦15.0", validity: "30 days" },
    { planSize: "25.0MB", price: "₦25.0", validity: "30 days" },
    { planSize: "100.0MB", price: "₦35.0", validity: "30 days" },
    { planSize: "25.0MB", price: "₦41.0", validity: "1 day" },
    { planSize: "500.0MB", price: "₦69.5", validity: "30 days" },
    { planSize: "100.0MB", price: "₦82.0", validity: "1 day" },
    { planSize: "500.0MB", price: "₦125.0", validity: "30 days" },
    { planSize: "250.0MB", price: "₦164.0", validity: "7 days(weekly)" },
    { planSize: "1.0GB", price: "₦170.0", validity: "30 days" },
    { planSize: "1.5GB", price: "₦240.0", validity: "30 days" },
    { planSize: "2.0GB", price: "₦320.0", validity: "30 days" },
    { planSize: "500.0MB", price: "₦410.0", validity: "7 days(weekly)" },
    { planSize: "2000.0MB", price: "₦415.0", validity: "1 (2gb)day" },
    { planSize: "1.0GB", price: "₦415.0", validity: "1 day" },
    { planSize: "3.0GB", price: "₦480.0", validity: "30 days" },
    { planSize: "4.0GB", price: "₦640.0", validity: "30 days" },
    { planSize: "4.5GB", price: "₦720.0", validity: "30 days" },
    { planSize: "5.0GB", price: "₦800.0", validity: "30 days" },
    { planSize: "1.5GB", price: "₦820.0", validity: "30 days" },
    { planSize: "3.5GB", price: "₦875.0", validity: "30 days" },
    { planSize: "2.0GB", price: "₦984.0", validity: "30 days" },
    { planSize: "7.5GB", price: "₦1200.0", validity: "30 days" },
    { planSize: "3.0GB", price: "₦1230.0", validity: "30 days{Gifting}" },
    { planSize: "7.0GB", price: "₦1230.0", validity: "7 days(weekly)" },
    { planSize: "11.0GB", price: "₦1397.0", validity: "30 days" },
    { planSize: "4.5GB", price: "₦1640.0", validity: "30 days{Gifting}" },
    { planSize: "7.0GB", price: "₦1680.0", validity: "30 days" },
    { planSize: "10.0GB", price: "₦1700.0", validity: "30 days" },
    { planSize: "15.0GB", price: "₦2400.0", validity: "30 days" },
    { planSize: "15.0GB", price: "₦3000.0", validity: "30 days" },
    { planSize: "20.0GB", price: "₦3200.0", validity: "30 days" },
    { planSize: "25.0GB", price: "₦3250.0", validity: "30 days" },
    { planSize: "11.0GB", price: "₦3280.0", validity: "30 days{Gifting}" },
    { planSize: "30.0GB", price: "₦3900.0", validity: "30 days" },
    { planSize: "15.0GB", price: "₦4100.0", validity: "30 days{Gifting}" },
    { planSize: "40.0GB", price: "₦5560.0", validity: "30 days" },
    { planSize: "50.0GB", price: "₦6350.0", validity: "30 days" },
    { planSize: "40.0GB", price: "₦8200.0", validity: "30 days{Gifting}" },
    { planSize: "300.0MB", price: "₦10000.0", validity: "30 days" },
    { planSize: "75.0GB", price: "₦12300.0", validity: "30 days{Gifting}" },
    { planSize: "100.0GB", price: "₦12700.0", validity: "90 days" },
    { planSize: "100.0GB", price: "₦13900.0", validity: "30 days" },
    { planSize: "1.0TB", price: "₦125000.0", validity: "30 days" },
    { planSize: "1000.0MB", price: "₦246000.0", validity: "1 day" },
    { planSize: "650.0MB", price: "₦16400000.0", validity: "1 day" }
  ],
};

const PricingComponent = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("Airtel Data");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Tabs for Network Selection */}
      <div className="flex justify-center space-x-4 mb-6">
        {Object.keys(dataPlans).map((network) => (
          <button
            key={network}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              selectedNetwork === network
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setSelectedNetwork(network)}
          >
            {network}
          </button>
        ))}
      </div>

      {/* Pricing Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {dataPlans[selectedNetwork].map((plan, index) => (
          <div key={index}
            className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <h3 className="text- font-semibold text-gray-600">{plan.size} Plan Size</h3>
            <p className="text-blue-600 font-bold text-xl my-2">{plan.price}</p>
            <p className="text-gray-600 text-sm">{plan.validity}</p>
            {/* <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Buy Now
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;
