import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';;
import About_page from '../pages/About_page';
import ContactPage from '../pages/Contact_page';
import ServicesPage from '../pages/Services_page';
import CreateAccountPage from '../pages/auth/Sign_up';
import SignIn from '../pages/auth/Sign_in';
import Layout from '../layout/Layout';
import Dashboard from '../pages/user_dashboard/dashboard/Dashboard';
import Fund_wallet from '../pages/user_dashboard/Fund_wallet/Fund_wallet';
import Solution_center from '../pages/user_dashboard/solution_center/Solution_center';
import AirtimeTopUp from '../pages/user_dashboard/buy_airtime/AirtimeTopUp';
import DataPlanForm from '../pages/user_dashboard/buy_data/BuyDataPlan';
import ElectricityBillPayment from '../pages/user_dashboard/utility_payment/ElectricityPayment';
import PricingComponent from '../pages/user_dashboard/Pricing/Pricing';
import UserProfile from '../pages/user_dashboard/profile/UserProfile';
import ApiComponent from '../pages/user_dashboard/developer/DeveloperApis';
import ResetPassword from '../pages/auth/ResetPassword';
import ChangePassword from '../pages/user_dashboard/profile/ChangePassword';
import AccountPin from '../pages/user_dashboard/profile/AccountPin';
import CableSubscription from '../pages/user_dashboard/utility_payment/CableTvSubscription';
import VerifyAccount from '../pages/auth/VerifyAccount';
import VerifyEmailWithOTP from '../pages/auth/VerifyEmailWithOTP';
import Private_Route from '../components/private/PrivateRoute';
import ForgotPasswordRequest from '../pages/auth/ForgotPasswordRequest';
import ForgotPassword from '../pages/auth/ForgotPassword';
import UpdateData from '../pages/admin/UpdateData';
import MakePayment from '../components/BuyData/MakePayment';
import BuyDataNow from '../components/BuyData/BuyDataNow';
import VerifyPayment from '../pages/user_dashboard/buy_airtime/VerifyPayment';
import CreateData from '../pages/user_dashboard/buy_data/CreateData';
import TransactionHistory from '../pages/user_dashboard/TransactionHistory';
import { useSelector } from 'react-redux';
import NotFound from '../pages/NotFound/NotFound';
import AllUsers from '../pages/admin/all_user/AllUsers';

export default function AppRoutes() {
  const { existingUser } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About_page />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Authentication route */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/forgot-password-request" element={<ForgotPasswordRequest />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/verify-email" element={<VerifyEmailWithOTP />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected/User Dashboard Routes */}
        <Route element={<Private_Route />}>
        </Route>
          <Route path="/profile" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="user-detail/change-password" element={<ChangePassword />} />
            <Route path="account-pin" element={<AccountPin />} />
            <Route path="fund_wallet" element={<Fund_wallet />} />
            <Route path="solution-center" element={<Solution_center />} />

            <Route path='data-top-up' element={<DataPlanForm/>}/>
            <Route path='airtime-recharge-card' element={<AirtimeTopUp/>}/>
            <Route path='utility-payment' element={<ElectricityBillPayment/>}/>
            <Route path='cable-tv-subscription' element={<CableSubscription/>}/>
            <Route path='pricing' element={<PricingComponent/>}/>
            <Route path='user-detail' element={<UserProfile/>}/>
            <Route path='documentation' element={<ApiComponent/>}/>

            {/* Admin Routes */}
            <Route path='admin/all-users' element={<AllUsers/>}/>
            <Route path='admin/create-data' element={<CreateData/>}/>
            {/* <Route path='admin/update-data/:id' element={<UpdateData/>}/> */}
            <Route path='admin/update-data/' element={<UpdateData/>}/>

            <Route path='funding-transaction-history' element={<Fund_wallet/>}/>
            <Route path='transaction-history' element={<TransactionHistory/>}/>
             
            <Route path='data-top-up/buy-now/make-payment' element={<MakePayment/>}/>
            <Route path='data-top-up/buy-now/make-payment/verify-payment' element={<VerifyPayment/>}/>
            <Route path='data-top-up/buy-now' element={<BuyDataNow/>}/>
          </Route>

      </Routes>
    </Router>
  );
}
