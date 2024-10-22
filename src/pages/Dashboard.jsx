import React, {useState} from 'react';
import ProjectList from '../components/ProjectList';
import TaskPieChart from '../components/PieChart';
import AddProject from '../components/AddProject';
import {useSelector} from 'react-redux'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasPermission = useSelector(state => state.settings.permission);
  
  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Project Management Dashboard</h1>
      {
        hasPermission && <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Project
      </button>
      }
      
      <div className="flex">
        <div className="w-1/3">
          <ProjectList />
        </div>
        <div className="w-1/3">
        </div>
        <div className="w-1/3">
              <TaskPieChart />
        </div>
      </div>
      {isModalOpen && (
          <AddProject
            onClose={() => setIsModalOpen(false)}
          />
        )}{" "}
    </div>
  );
};

export default Dashboard;
