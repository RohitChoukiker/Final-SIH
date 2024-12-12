import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">E-DakConnect</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.email}
            </span>
          )}
          
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-black-600 dark:text-black-300 text-lg-500	"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};