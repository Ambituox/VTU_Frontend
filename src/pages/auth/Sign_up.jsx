import React, { useState } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import Aos from 'aos';
import { useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with a default animation duration
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://vtu-xpwk.onrender.com/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to create account');

      alert('Account created successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ADF802] text-center mb-6" data-aos="zoom-in">Register Now</h2>
          {error && <div className="text-red-500 text-center mb-4 font-semibold">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="John Doe" data-aos="fade-right" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="example@example.com" data-aos="fade-left" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="********" data-aos="fade-right" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="********" data-aos="fade-left" />
              </div>
            </div>

            <div className="flex items-center font-normal justify-between">
              <div className="text-sm text-center w-full">
                <Link to="/login" className="text-gray-400">Already have an account? <span className="text-blue-600 hover:text-blue-500">Login</span></Link>
              </div>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400">
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CreateAccountPage;