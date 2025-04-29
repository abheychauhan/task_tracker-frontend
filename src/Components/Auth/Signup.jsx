import React from 'react'
import { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {    
    const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await API.post('/auth/signup', form);
        navigate('/login');
    } catch (err) {
        alert(err.response.data.message || 'Signup failed');
    }
};

return (
        <div className="flex justify-center flex-col gap-2 items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                {['name', 'email', 'country', 'password'].map((field) => (
                    <input
                        key={field}
                        type={field === 'password' ? 'password' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-2 border rounded"
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        required
                    />
                ))}
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            <button onClick={()=>navigate('/login')} className='text-center cursor-pointer block w-full text-blue-600'>Signup if already have account.</button>

        </div>
    );
  
}

export default Signup