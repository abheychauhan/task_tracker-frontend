import React, { useEffect, useState } from 'react'
import API from '../services/api';

function TaskList({ projectId }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const token = localStorage.getItem('token');

    const fetchTasks = async (projectId) => {
        try {
            const { data } = await API.get(`/tasks/${projectId} ` , {
                headers: { Authorization: `Bearer ${token}`},
            });
            setTasks(data);
            console.log(data);
        } catch {
            alert('Failed to load tasks');
        }
    };

    useEffect(() => {
        fetchTasks(projectId);
    }, [projectId]);

    const createTask = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await API.post(`/tasks/${projectId}`, newTask ,
                {headers: { Authorization: `Bearer ${token}`}});
            setNewTask({ title: '', description: '' });
            fetchTasks(projectId);
        } catch {
            alert('Error creating task');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/tasks/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
            fetchTasks(projectId);
        } catch {
            alert('Update failed');
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchTasks(projectId);
        } catch {
            alert('Delete failed');
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Tasks</h3>
            <form onSubmit={createTask} className="flex gap-2 my-2">
                <input
                    type="text"
                    placeholder="Title"
                    className="p-2 border rounded"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    className="p-2 border rounded flex-1"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <button className="bg-green-500 text-white px-4 rounded">Add</button>
            </form>

            <ul className="space-y-2">
                {tasks.map(task => (
                    <li key={task._id} className="p-3 border rounded flex justify-between items-center">
                        <div>
                            <h4 className="font-bold">{task.title}</h4>
                            <p className="text-sm text-gray-600">{task.description}</p>
                            <p className="text-xs text-gray-500">Created on: {task.createdAt.split("T")[0]}</p>
                            <p className="text-xs text-gray-500">Status: <span className="capitalize">{task.status}</span></p>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={task.status}
                                onChange={(e) => updateStatus(task._id, e.target.value)}
                                className="border p-1 rounded text-sm"
                            >
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:underline text-sm">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default TaskList