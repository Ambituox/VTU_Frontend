import React, { useState } from 'react';
import "aos/dist/aos.css";
import Aos from 'aos';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Add actual submit logic here, like an API request
    setError("");
    console.log("Form Submitted", { email, password });
  };

  return (
    <>
    <Header/>
      <div className="flex min-h-screen bg-gray-50 items-center justify-center p-6">
        <div className="w-full max-w-md rounded-lg bg-white shadow-lg p-8" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ADF802] text-center mb-6">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-300"/>
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full rounded bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SignIn;
