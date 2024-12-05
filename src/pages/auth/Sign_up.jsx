import React from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import Aos from 'aos';
import { useEffect } from 'react';
import Header from '../../components/Header';

const CreateAccountPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with a default animation duration
  }, []);

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ADF802] text-center mb-6" data-aos="zoom-in">Register Now</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="John Doe" data-aos="fade-right"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="example@example.com" data-aos="fade-left"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input type="password" id="password" name="password" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="********" data-aos="fade-right"/>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700"> Confirm Password
              </label>
              <input type="password" id="confirmPassword" name="confirmPassword" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="********" data-aos="fade-left"/>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Already have an account?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" data-aos="zoom-in">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccountPage;
