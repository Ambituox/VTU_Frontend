import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services_page from '../pages/Services_page';
import About_page from '../pages/About_page';
import AboutUs from '../pages/about';
import ContactPage from '../pages/Contact_page';
import CreateAccountPage from '../pages/auth/Sign_up';
import SignIn from '../pages/auth/Sign_in';
import Layout from '../layout/Layout';
import Dashboard from '../pages/user_dashboard/dashboard/Dashboard';
import Fund_wallet from '../pages/user_dashboard/Fund_wallet/Fund_wallet';
import Solution_center from '../pages/user_dashboard/solution_center/Solution_center';
import AirtimeTopUp from '../pages/user_dashboard/buy_airtime/AirtimeTopUp';
import DataPlanForm from '../pages/user_dashboard/buy_data/Data_topup';
import ElectricityBillPayment from '../pages/user_dashboard/utility_payment/ElectricityPayment';
import CableTvSubscription from '../pages/user_dashboard/utility_payment/CableTvSubscription';
import PricingComponent from '../pages/user_dashboard/Pricing/Pricing';
import UserProfile from '../pages/user_dashboard/profile/UserProfile';
import ApiComponent from '../pages/user_dashboard/developer/DeveloperApis';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About_page />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services_page />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/login" element={<SignIn />} />

        {/* Protected/User Dashboard Routes */}
        <Route path="/profile" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="fund_wallet" element={<Fund_wallet />} />
          <Route path="solution-center" element={<Solution_center />} />

          <Route path='data-top-up' element={<DataPlanForm/>}/>
          <Route path='airtime-recharge-card' element={<AirtimeTopUp/>}/>
          <Route path='utility-payment' element={<ElectricityBillPayment/>}/>
          <Route path='cable-tv-subscription' element={<CableTvSubscription/>}/>
          <Route path='pricing' element={<PricingComponent/>}/>
          <Route path='user-detail' element={<UserProfile/>}/>
          <Route path='documentation' element={<ApiComponent/>}/>
          {/* <Route path='data-transaction-history' element={<DataTransactionHistory/>}/> */}
          {/* <Route path='utility-transaction-history' element={<UtilityTransactionHistory/>}/> */}
          {/* <Route path='airtime-transaction-history' element={<AirtimeTransactionHistory/>}/> */}
          {/* <Route path='funding-transaction-history' element={<FundingTransactionHistory/>}/> */}
          {/* <Route path='user-profile' element={<UserProfile/>}/> */}
        </Route>
      </Routes>
    </Router>
  );
}
