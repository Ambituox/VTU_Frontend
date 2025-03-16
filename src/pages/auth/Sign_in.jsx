import React, { useState, useEffect } from 'react';
import "aos/dist/aos.css";
import Aos from 'aos';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch('https://vtu-xpwk.onrender.com/api/v1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }
      alert('Sign in successful!');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center lg:p-6 p-3">
        <div className="w-full max-w-md rounded-lg bg-white shadow-lg lg:p-8 p-6" data-aos="fade-up">
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

            <div className="flex items-end justify-end">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
            </p>
            <button  type="submit"  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"  disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;