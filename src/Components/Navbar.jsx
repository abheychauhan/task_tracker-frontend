import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <Link to="/" className="text-xl font-bold">Task Tracker</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
            </button>
        </nav>
  )
}

export default Navbar