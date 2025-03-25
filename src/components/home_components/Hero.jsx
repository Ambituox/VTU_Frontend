import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with custom options
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-200">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto md:max-w-[90%] max-w-full py-20 sm:py-24 lg:py-28">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full space-y-8 lg:space-y-0" data-aos="fade-up">
            <div className="lg:w-[45%] sm:w-[97%] w-full text-center lg:text-left"data-aos="fade-right">
              <h1 className="text-balance md:text-6xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Instant <span className="clr2">Recharge</span> On{' '}
                <span className="clr">Ambitioux</span>
              </h1>
              <p className="mt-6 text-gray-600 text-lg font-normal">
                Experience seamless and secure online top-ups with our fast and reliable service. Get started today and stay connected in just a few clicks.
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6" data-aos="zoom-in">
                <Link to="/login" className="rounded-md cl2 w-[150px] py-2 text-[16] font-semibold text-white shadow-lg text-center transition-all hover:bg-blue-700">
                  Log In
                </Link>
                <Link to="/signup" className="rounded-md cl3 w-[150px] py-2 text-[16] font-semibold text-white shadow-lg text-center transition-all hover:bg-lime-500">
                  Register
                </Link>
              </div>
            </div>
            <div className="lg:w-[48%] sm:w-[97%] w-full" data-aos="fade-left">
              <img src="/bg.png" alt="Virtual Top Up" className="rounded-lg shado" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
