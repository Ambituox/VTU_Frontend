import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {

  return (
    <div className="bg-white">

      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto md:max-w-[95%] max-w-full py-28 sm:py-32 lg:py-22">
          <div className="flex justify-around flex-wrap w-full">
            <div className="md:w-[45%] sm:w-[97%] w-full text-center">
              <h1 className="text-balance md:text-6xl text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Instant Recharge On <br /> OneCredit
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/" className="rounded-md bg-orange-600 w-[100px] py-2.5 text-[16] font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-200 focus-visible:outline-orange-600">Log In</Link>
                <Link to="/" className="rounded-md bg-orange-600 w-[100px] py-2.5 text-[16] font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-200 focus-visible:outline-orange-600">Register</Link>
              </div>
            </div>
            <div className="md:w-[48%] sm:w-[97%] w-full">
              <img src="/bg.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
