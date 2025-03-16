import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to reset password');

            alert('Password reset successful!');
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col">
            <Header />
            <div className="flex my-20 flex-grow items-center justify-center px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Reset Password</h1>
                    {error && <div className="text-red-500 text-center mt-2 font-semibold">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className='text-gray-700 font-semibold block mb-1'>New Password</label>
                            <input 
                                onChange={handlePasswordChange} 
                                value={password} 
                                type="password" 
                                className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition' 
                                placeholder='Enter new password' 
                                required
                            />
                        </div>
                        <div>
                            <label className='text-gray-700 font-semibold block mb-1'>Confirm Password</label>
                            <input 
                                onChange={handleConfirmPasswordChange} 
                                value={confirmPassword} 
                                type="password" 
                                className='w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition' 
                                placeholder='Confirm new password' 
                                required
                            />
                        </div>
                        <div className="text-center mt-2">
                            <Link to='/login' className='text-blue-600 hover:underline text-sm font-medium'>Back to login</Link>
                        </div>
                        <button 
                            type="submit" 
                            className='w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition disabled:bg-gray-400' 
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
