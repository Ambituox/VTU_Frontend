import React, { createContext, useEffect, useState } from 'react';
import { MdOutlinePayment, MdSpaceDashboard } from 'react-icons/md';
import { FaUsers, FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';
import Main_links from './sidebar/main/Main_links';
import Services_links from './sidebar/services/Services_links';
import Extra_links from './sidebar/extra/Extra_links';

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
    icon: <FaUsers className="text-xl" />,
  },
  {
    title: 'Solution Center',
    path: 'solution-center',
    class: 'px-3 py-1 font-normal hover:text-blue-500 duration-200 rounded-md flex items-center gap-2',
    icon: <MdOutlinePayment className="text-xl" />,
  },
];

export const SidebarLinkContext = createContext();

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`h-screen overflow-y-auto pb-5 z-20 bg-gray-900 text-gray-400 fixed lg:static ${
        isOpen ? 'w-64' : 'w-0'
      } transition-all duration-300`}>
      <div className="px-5 py-6 flex items-center justify-between">
        <h1 className="lg:text-4xl text-3xl font-bold text-white">Ambitioux</h1>
        <button onClick={toggleSidebar} className="text-white text-2xl lg:hidden focus:outline-none" aria-label="Close Sidebar">
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
      </nav>
    </div>
  );
};

const Header = ({ toggleSidebar }) => {
  return (
    <header className="text-white z-10 top-0 sticky bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <button onClick={toggleSidebar} className="text-2xl p-2 text-slate-900 lg:hidden focus:outline-none" aria-label="Open Sidebar">
            ☰
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 duration-150 hover:text-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5a3.75 3.75 0 01-7.5 0M19.5 9c0-3.533-2.167-6.797-5.7-7.825a.75.75 0 00-.6 0C6.667 2.203 4.5 5.467 4.5 9c0 3.75-1.5 6-1.5 6h18s-1.5-2.25-1.5-6z"/>
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              3
            </span>
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvHOqSGRmj_SeRuzMpVCHbYeBtLAYKJmk3Vg&s" alt="User" className="w-8 h-8 object-fill rounded-full"/>
              <span className="hidden md:inline font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

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
          <div className="p-4">
            <Outlet />
          </div>
          {/* <div className="w-full bg-white p-3 flex justify-between items-center lg:flex-row flex-col">
            <p className="text-gray-400 text-sm">Copyright &copy; 2023 - 2024 VPC</p>
            <p className="text-gray-400 text-sm">Made with Love from Nigeria</p>
          </div> */}
          <div className="text-white flex justify-center items-center absolute bottom-8 right-5 h-[40px] w-[40px] bg-green-500 animate-bounce rounded-full">
            <FaWhatsapp />
          </div>
        </div>
      </div>
    </div>
  );
}
