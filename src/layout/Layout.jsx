import React, { createContext, useEffect, useState } from 'react';
import { MdOutlinePayment, MdSpaceDashboard } from 'react-icons/md';
import { FaUserAlt, FaUsers, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';
import Main_links from './sidebar/main/Main_links';
import Services_links from './sidebar/services/Services_links';
import Extra_links from './sidebar/extra/Extra_links';
import { useSelector } from 'react-redux';
import { GrTransaction } from 'react-icons/gr';
import AdminNav from '../pages/admin/AdminNav';
import UserLogoutButton from '../components/user_dashboard_component/UserLogout';

const mainlinks = [
  {
    title: 'Dashboard',
    path: '/profile',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <MdSpaceDashboard className="text-xl" />,
  },
  {
    title: 'Fund Wallet',
    path: 'fund_wallet',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <GrTransaction className="text-xl" />,
  },
  {
    title: 'Transaction History',
    path: 'transaction-history',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <GrTransaction className="text-xl" />,
  },
];

export const SidebarLinkContext = createContext();

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Access the currentUser from Redux store to get the token
  const { currentUser } = useSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);

  // Local state to store the fetched user profile data
  const [user, setUser] = useState([]);

  console.log(user)

  useEffect(() => {
    // Ensure currentUser and currentUser.data are defined
    if (user && user.role) {
      setIsAdmin(true);
    } else {
      console.log("No current user or user data available.");
    }
  }, [currentUser]);

  // useEffect runs when the component mounts or when currentUser changes
  useEffect(() => {
    // Define an async function to fetch the user profile
    const fetchUserProfile = async () => {
      try {
        // Send GET request to the profile API endpoint
        const response = await fetch("https://vtu-xpwk.onrender.com/api/v1/get-profile", {
          method: "GET",
          headers: {
            // Send the token in the Authorization header
            'Authorization': `Bearer ${currentUser?.token}`,
            'Content-Type': 'application/json',
          },
        });

        // Parse the JSON response
        const data = await response.json();

        // Check for errors in the response
        if (!response.ok || data.error) {
          console.error("Failed to fetch user profile:", data.error || response.statusText);
          return;
        }

        // Update the user state with fetched profile data
        setUser(data.data);
      } catch (error) {
        // Handle any network or unexpected errors
        console.error("Error fetching user profile:", error.message);
      }
    };

    // Call the fetch function if the token exists
    if (currentUser?.token) {
      fetchUserProfile();
    }
  }, [currentUser]); // Only re-run the effect if currentUser changes

  return (
    <div
      className={`h-screen overflow-y-auto pb-5 z-20 bg-slate-900 text-gray-400 fixed lg:static ${ isOpen ? '64' : 'w-0'
      } transition-all duration-300`}>
      <div className="px-5 py-6 flex items-center justify-between border-b border-slate-700">
        <Link to={'/'}>
        <div className="flex items-center justify-center gap-2">
          <div className="text-slate-100 text-3xl font-bold flex items-center text-white/60 border-2 border-blue-500 rounded-full p-2">
            <FaUserAlt />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white/60 capitalize">
             Hi, {currentUser?.data?.firstName || "User"}
            </h1>
            <p className="text-sm text-white/40">
              balance: ₦ 5,300.00
            </p>
          </div>
        </div>
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl lg:hidden focus:outline-none"
          aria-label="Close Sidebar"
        >
          <IoClose />
        </button>
      </div>

      <nav className="flex flex-col gap-1 mx-2 mt-5">
        <div>
          <p className="text-[12px] text-blue-500 pl-3 font-medium">MAIN</p>
        </div>
        {mainlinks.length > 0 &&
          mainlinks.map((link, index) => (
            <SidebarLinkContext.Provider value={link} key={index}>
              <Main_links link={link} />
            </SidebarLinkContext.Provider>
          ))}
        <Services_links />
        <Extra_links />
        {
          isAdmin && (
            <div className="bg-gray-900 pt-2 pb-4">
              <p className="text-[12px] text-blue-500 pl-3 font-semibold uppercase">Admin</p>
              <AdminNav/>
            </div>
          )
        }
      </nav>
    </div>
  );
};

const Header = ({ toggleSidebar }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="text-white z-10 top-0 sticky bg-blue-500">
      <div className="flex items-center justify-between px-6 lg:py-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button onClick={toggleSidebar} className="text-2xl p-2 text-slate-50 lg:hidden focus:outline-none" aria-label="Open Sidebar">
            ☰
          </button>
        </div>

        {/* User Actions */}
        {
          currentUser && ( 
            <div className="">
              <UserLogoutButton/>
              {/* <Link to={'/profile'} className={`text-black`}>
                <FaUserAlt />
              </Link> */}
            </div>
          )
        }
      </div>
    </header>
  );
};

// Admin Layout Component


export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col relative max-h-[100vh]">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="overflow-x-hidden h-[100vh] flex-1 overflow-y-auto bg-gray-50 text-black">
          <Header toggleSidebar={toggleSidebar} />
            <div className="p-2">
              <Outlet />
            </div>
            <div className="w-full bg-white p-3 flex justify-between items-center lg:flex-row flex-col">
              <p className="text-gray-400 text-sm">Copyright &copy; 2025</p>
              <p className="text-gray-400 text-sm">Made with Love from Nigeria</p>
            </div>
            <div className="text-white flex justify-center items-center absolute bottom-8 right-5 h-[40px] w-[40px] bg-green-500 animate-bounce rounded-full">
              <FaWhatsapp />
            </div>
        </div>
      </div>
    </div>
  );
}
