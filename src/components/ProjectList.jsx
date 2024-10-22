import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const projects = useSelector((state) => state.projects.projects);
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Projects</h2>
        <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.id} className=" shadow-lg rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-blue-600 mb-2">
                {project.name}
              </h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
