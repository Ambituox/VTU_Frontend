import { current } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { FaMoneyCheckAlt, FaUniversity, FaRegBuilding, FaWhatsapp } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { ImDatabase } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const [showMore, setShowMore] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const {firstName} = currentUser.data;

  return (
    <div className="bg-white lg:py-18 py-6 text-slate-700 md:px-6 px-3 rounded-lg shadow-md transition-all duration-500">
      <h1 className="text-2xl font-bold">Welcome to Ambitioux, <span className="capitalize">{firstName}</span></h1>
      <p className="mt-2 text-sm">
        Welcome to Ambitioux VTU, your one-stop platform for seamless and affordable data, airtime, and bill payments. 
        Enjoy exclusive benefits such as discounted data prices, cashback rewards, and commissions on every successful referral. 
        Save money while earning effortlessly by using our reliable VTU services.
      </p>
      {showMore && (
        <p className="mt-2 text-sm transition-opacity duration-500 ease-in-out">
          With Ambitioux, you can:
          <ul className="list-disc pl-5">
            <li>Purchase data at unbeatable rates.</li>
            <li>Earn commissions on every MTN data purchase made by your referrals.</li>
            <li>Enjoy fast and secure transactions.</li>
            <li>Get cashback rewards on select purchases.</li>
          </ul>
        </p>
      )}
      <button  onClick={() => setShowMore(!showMore)}  className="mt-2 text-red-600 underline focus:outline-none transition-colors duration-300 text-sm hover:text-red-400">
        {showMore ? "See Less" : "See More"}
      </button>
    </div>

  );
};

const BankDetailsCard = () => {
  const [activeTab, setActiveTab] = useState("Sterling Bank");

  const bankDetails = {
    "Sterling Bank": {
      accountNumber: "2048543516",
      accountName: "Ambitioux",
      bankName: "Sterling Bank",
      charge: "₦53",
      icon: '/sterling.jpeg',
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
    },
    "9Payment Service Bank": {
      accountNumber: "1234567890",
      accountName: "Ambitioux",
      bankName: "9Payment Service Bank",
      charge: "₦20",
      icon: '/9payment.png',
      bgColor: "bg-gradient-to-r from-green-500 to-green-900",
    },
    "Wema Bank": {
      accountNumber: "9876543210",
      accountName: "Ambitioux",
      bankName: "Wema Bank",
      charge: "₦35",
      icon: '/Wema_Bank_Plc.jpg',
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-800",
    },
    "Moniepoint Microfinance Bank": {
      accountNumber: "5678901234",
      accountName: "Ambitioux",
      bankName: "Moniepoint Microfinance Bank",
      charge: "₦15",
      icon: '/Moniepoint_logo.png',
      bgColor: "bg-gradient-to-r from-green-700 to-green-800",
    },
  };

  const data1 = [
    {
      icon: <FaClockRotateLeft/>,
      title: 'Airtime Transactions',
      link: 'airtime_wallet_summary',
      style: 'w-10 h-10 flex justify-center items-center rounded-md bg-purple-600 text-white'
    },
    {
      icon: <FaClockRotateLeft/>,
      title: 'Transactions',
      link: 'history',
      style: 'w-10 h-10 flex justify-center items-center rounded-md bg-yellow-400 text-white'
    },
  ];

  return (
    <div className="md:mt-10 mt-6">
      {/* Tabs for Banks */}
      <div className="flex justify-start items-center bg-white shadow-lg rounded-lg">
        {Object.keys(bankDetails).map((bank) => (
          <button
            key={bank}
            onClick={() => setActiveTab(bank)}
            className={`md:px-4 px-2 py-2 text-sm transition-all duration-300 ${
              activeTab === bank
                ? "text-green-500 border-b-2 border-green-500 font-semibold"
                : "text-gray-500 hover:text-green-500"
            }`}
          >
            {bank}
          </button>
        ))}
      </div>

      {/* Bank Details Content */}
      <div className={`md:p-6 p-3 rounded-b-lg text-white transition-all duration-500 ${bankDetails[activeTab].bgColor}`}>
        <div className="flex justify-between items-center">
          <img src={bankDetails[activeTab].icon} alt="" className="max-w-[140px] max-h-[60px] rounded-md"/>
          <div className="text-right">
            <p className="text-lg font-bold">{bankDetails[activeTab].charge}</p>
            <p className="text-sm text-gray-200">CHARGE</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold">
            Account Number: {bankDetails[activeTab].accountNumber}
          </p>
          <p className="text-md mt-2">
            Account Name: {" "}
            <span className="font-semibold">
              {bankDetails[activeTab].accountName}
            </span>
          </p>
          <p className="text-md mt-2">Bank Name: {bankDetails[activeTab].bankName}</p>
        </div>
        <p className="mt-4 text-sm font-semibold">AUTOMATED BANK TRANSFER</p>
        <p className="text-sm">
          Make transfer to this account to fund your wallet
        </p>
      </div>
      <div className="my-8 px-4">
        {/* Marquee Section */}
        <div className="bg-gradient-to-r from-green-400 to-red-600 text-white rounded-full py-2 shadow-md">
          <marquee behavior="" direction="" className="text-lg font-semibold">
            🚀 Welcome to Ambitioux VTU! Enjoy fast, affordable data, airtime, and bill payments. 
            Need help? Chat with us at 08162269770 or 08082792885 (WhatsApp only). 
            Reminder: For Airtel SME data, avoid sending to numbers with active loans.
          </marquee>
        </div>

        {/* Feature Cards Section */}
        <div className="flex justify-center items-center gap-6 lg:max-w-2xl mx-auto mt-10 bg-green-100 lg:p-4 p-3 rounded-xl shadow-lg">
          {data1.map((data, index) => (
            <div  key={index}  className="w-[100%] lg:w-[300px] shadow-lg p-4 bg-green-200 rounded-xl flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className={`p-3 rounded-full ${data.style}`}>
                {data.icon}
              </div>
              <p className="font-semibold text-gray-800">{data.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardMain = ({ data }) => {
  const { currentUser } = useSelector((state) => state.user);

  const {firstName} = currentUser.data;

  return (
    <div className="bg-white md:p-6 p-3 rounded-lg shadow-md mt-6">
      <div className="">
        <p className="text-xl border-b pb-3">
          Good day, <span className="font-semibold text-green-500 capitalize">{currentUser && firstName}</span>
        </p>
      </div>
      <BankDetailsCard />
    </div>
  );
};

const DashWallet = () => {
  const walletData = [
    { title: "MTN SME DATA BALANCE", icon : <ImDatabase /> ,amount: "0.00 GB" },
    { title: "AIRTEL CG DATA BALANCE", icon : <ImDatabase /> ,amount: "0.00 GB" },
    { title: "GLO CG DATA BALANCE", icon : <ImDatabase /> ,amount: "0.00 GB" },
    { title: "9MOBILE CG DATA BALANCE", icon : <ImDatabase /> ,amount: "0.00 GB" },
  ];

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-12 max-w-7xl bg-green-200 p-3 rounded-lg">
      {walletData.map((item, index) => (
        <div key={index} className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
          <div className="">
            <h3 className="font-semibold text-sm text-gray-500">{item.title}</h3>
            <p className="text-xl font-bold mt-2 text-gray-600">{item.amount}</p>
          </div>
          <div className="bg-green-500 text-white p-2 rounded-md text-4xl mb-2">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};


const NotificationsFAQsSupport = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 bg-green-100 p-3 rounded-lg gap-4 mt-6 max-w-7xl">
      <div className="lg:h-[100px] bg-green-100 text-green-700 p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-2">Notifications</h4>
        <p>No new notifications at the moment.</p>
      </div>
      <div className="lg:h-[170px] bg-green-100 text-green-700 p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-2">FAQs</h4>
        <p>Please go through them to have a better knowledge of this platform.</p>
        <button className="bg-green-500 text-white mt-4 px-4 py-2 rounded-lg">
          FAQs
        </button>
      </div>
      <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-md">
        <h4 className="font-semibold text-lg mb-2">Support Team</h4>
        <p>
          Have anything to say to us? Please contact our Support Team on
          WhatsApp.
        </p>
        <div className="mt-4 space-y-4">
          <button className="bg-green-500 flex items-center gap-2 text-white px-4 py-2 rounded-lg">
            <FaWhatsapp/> WhatsApp Us
          </button>
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaWhatsapp/> Join Our WhatsApp Group
          </button>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    { logo: "/buyData.jpg", title: "Bulk Reseller Data" },
    { logo: "/airtime.svg", title: "VTU Airtime Top-up" },
    { logo: "/tvSub.jpg", title: "Cable Subscription" },
    { logo: "/epins.jpg", title: "Exam Scratch Card" },
    { logo: "/pin-coupon.png", title: "Bulk Data" },
    { logo: "/electric.png", title: "Electricity Bills Payment" },
    { logo: "/payment-gateway.jpg", title: "Automatic Payment Gateway" },
    { logo: "/referral.png", title: "My Refferals" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-green-100 mt-6 rounded-lg">
      {/* Services Grid */}
      <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            {/* Service Icon */}
            <div className="w-[6rem] h-[6rem] bg-gray-100 rounded-full flex items-center justify-center mb-4 hover:animate-bounce transition-all duration-300">
              <img src={service.logo} alt={service.title} className="w-full h-full object-contain rounded-full"/>
            </div>

            {/* Service Title */}
            <Link to={'/'} className="text-center">{service.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="max-w-7xl bg-green-200 p-3 rounded-lg">
      <DashboardHeader />
      <DashboardMain />
      <DashWallet />
      <NotificationsFAQsSupport />
      <Services/>
    </div>
  );
};

export default Dashboard;
