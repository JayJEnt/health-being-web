import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../api/models/user';
import * as Icons from '../../assets/icons';
import { useAuth } from '../../auth/useAuth';
import NavButton from './NavButton';

const NavBar: React.FC = () => {
  const { status, logout } = useAuth() as {
    logout: () => void;
    status: string;
    user: User;
  };
  const navigate = useNavigate();
  const isAuthenticated = status === 'authenticated';
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    void navigate('/');
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center px-8 z-50">
      {/* Left: Logo, Title */}
      <h1 className="text-xl font-bold text-gray-800 mr-8">Health-being</h1>

      {/* Center: Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 flex justify-center"
      >
        <div className="relative w-full max-w-md">
          <Icons.MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </form>

      {/* Right: Nav buttons */}
      <div className="ml-auto flex flex-row gap-4 items-center">
        <NavButton icon={Icons.HomeIcon} label="Home" to="/" />

        {!isAuthenticated ? (
          <>
            <NavButton icon={Icons.ArrowRightOnRectangleIcon} label="Login" to="/login" />
            <NavButton icon={Icons.UserPlusIcon} label="Register" to="/register" />
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Icons.ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span className="text-base font-medium">Logout</span>
          </button>
        )}

        <NavButton icon={Icons.Cog6ToothIcon} label="Settings" to="/settings" />
      </div>
    </nav>
  );
};

export default NavBar;