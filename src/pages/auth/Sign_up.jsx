import React, { useState, useEffect, Fragment } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
import Aos from 'aos';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Dialog, Transition } from '@headlessui/react';

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with a default animation duration
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess('');

    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      openModal();
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      openModal();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      const data = await response.json();

      if (!data.ok || data.success === false) {

        setError(data.message || 'Sign in failed');
        setSuccess('');

      } else {

        setSuccess(data.message || 'Sign in successful!');
        setError('');

      }

      openModal();

    } catch (error) {
      setError(error.message);
      setSuccess('');
    } finally {
      setLoading(false);
      openModal();
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#ADF802] text-center mb-6" data-aos="zoom-in">Register Now</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field, index) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1).replace('Password', ' Password')}
                </label>
                <input
                  type={field.includes('password') ? 'password' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder={field === 'email' ? 'example@example.com' : ''}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                />
              </div>
            ))}

            <div className="text-sm text-center w-full">
              <Link to="/login" className="text-gray-400">Already have an account? <span className="text-blue-600 hover:text-blue-500">Login</span></Link>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-[#ADF802] text-white font-semibold rounded-lg hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>

      {/* Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
              <Dialog.Title className={`text-2xl font-bold ${success ? 'text-green-600' : 'text-red-600'}`}>
                {success ? 'Success!' : 'Error!'}
              </Dialog.Title>
              <p className="mt-2 text-gray-700">{success || error}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={closeModal}>
                Got it, thanks!
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <Footer />
    </>
  );
};

export default CreateAccountPage;
