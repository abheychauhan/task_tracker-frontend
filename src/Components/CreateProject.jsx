import React, { useState } from 'react'
import API from '../services/api';

function CreateProject({ onCreated }) {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create a project');
            return;
        }
        try {
            await API.post('/projects', { name : name }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setName('');
            onCreated();
        } catch (err) {
            alert('Error creating project');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New project name"
                className="border p-2 rounded flex-1"
                required
            />
            <button className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
                Create
            </button>
        </form>
  )
}

export default CreateProject