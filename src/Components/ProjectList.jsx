import React from 'react'
import API from '../services/api';
import { useEffect, useState } from 'react';
import CreateProject from './CreateProject';
import TaskList from './TaskList';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');

    const fetchProjects = async () => {
        try {
          const token = localStorage.getItem('token'); // or from cookies if you're using js-cookie
          const response = await API.get('/projects', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProjects(response.data);
          console.log('Projects:', response.data);
        } catch (error) {
          console.error('Error fetching projects:', error.response?.data || error.message);
        }
      };
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="space-y-6">
            <CreateProject onCreated={fetchProjects} />
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {projects.map((proj) => (
                    <div key={proj._id} className="p-4 border rounded shadow hover:bg-gray-50">
                        <div className="flex justify-between">
                            <h3 className="font-bold">{proj.name}</h3>
                            <button onClick={() => setSelectedProjectId(proj._id)} className="text-blue-600">
                                View Tasks
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProjectId && (
                <TaskList projectId={selectedProjectId} />
            )}
        </div>
  )
}

export default ProjectList