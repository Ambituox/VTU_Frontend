import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !otp) {
      setError('Please fill in both fields');
      return;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setError('OTP must be exactly 6 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/v1/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submittedOTP: otp, email })
      });

      const data = await response.json();
      if (!data.ok || data.success === false) {
        throw new Error(data.message || 'Verification failed');
      }

      alert('Email verified successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
        <Header/>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
                {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input  type="text"  placeholder="Enter OTP"  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"  value={otp}  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}  maxLength="6"  required/>
                    <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>
            </div>
        <Footer/>
    </div>
  );
};

export default VerifyEmail;
