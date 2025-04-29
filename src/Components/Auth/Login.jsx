import React from 'react'
import { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', form);
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            alert(err.response.data.message || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2 h-screen bg-gray-100 p-10">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                {['email', 'password'].map((field) => (
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
                <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Login
                </button>
            </form>
            <button onClick={()=>navigate('/signup')} className='text-center cursor-pointer block w-full text-blue-600'>Signup if u are new here.</button>
             <div>
                <p className="text-sm text-gray-500">Use them for testing </p>
                <p className="text-sm text-gray-500">Email : Test@test.com</p>
                <p className="text-sm text-gray-500">Password : 123456</p>
             </div>
        </div>
  )
}

export default Login