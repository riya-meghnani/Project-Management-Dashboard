import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    return (
        <nav className={`bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-md`}>
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <div className="text-lg font-bold text-gray-800 dark:text-white">
                    <Link to="/dashboard" className="hover:text-blue-500 transition duration-300">
                        Project Management
                    </Link>
                </div>
                <ul className="flex space-x-8">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 transition duration-300 ${location.pathname === '/dashboard' ? 'font-semibold text-blue-500' : ''}`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 transition duration-300 ${location.pathname === '/settings' ? 'font-semibold text-blue-500' : ''}`}
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
                <button onClick={toggleTheme} className="ml-4 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                    Toggle Theme
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
