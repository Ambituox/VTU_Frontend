import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to send reset link');

            console.log(data);
            alert('Password reset link sent!');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <Header/>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Forgot Password</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className='block text-gray-700 font-medium'>Enter Email Address</label>
                            <input 
                                onChange={handleChange} 
                                value={email} 
                                id='email' 
                                type="email" 
                                className='w-full mt-2 border rounded-md p-3 border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
                                placeholder='Enter email' 
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-center text-red-500 font-semibold">
                                {error}
                            </div>
                        )}
                        <div className="text-center">
                            <Link to='/login' className='text-gray-400 text-sm hover:underline'>Back to login</Link>
                        </div>
                        <button 
                            type="submit" 
                            className='w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400' 
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}