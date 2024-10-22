import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPermission } from '../store/settingSlice';
import {useNavigate} from 'react-router-dom'

const Settings = () => {
  const dispatch = useDispatch();
  const currentPermission = useSelector((state) => state.settings.permission);
  const [permission, setPermissionState] = useState(currentPermission);
  const navigate = useNavigate();

  const handleToggle = () => {
    setPermissionState((prev) => !prev); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPermission(permission));
    navigate('/dashboard');
    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Permission Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <label className="block text-gray-700 mr-4" htmlFor="permission">
              Allow Project/Task Creation:
            </label>
            <input
              type="checkbox"
              id="permission"
              checked={permission}
              onChange={handleToggle}
              className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
