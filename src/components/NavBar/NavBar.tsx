import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { User } from '../../api/models/user';
import * as Icons from '../../assets/icons';
import { useAuth } from '../../auth/useAuth';
import NavButton from './NavButton';

const NavBar: React.FC = () => {
  const { status, user, logout } = useAuth() as {
    logout: () => void;
    status: string;
    user: User;
  };
  const navigate = useNavigate();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = user?.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdown, setUserDropdown] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    void navigate('/');
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?phrase=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center px-8 z-50">
      {/* Left: Logo, Title */}
      <h1 className="text-xl font-bold text-gray-800 mr-8">Health-being</h1>

      <div className="flex flex-col gap-2 w-full">
        <NavButton icon={Icons.HomeIcon} label="Home" to="/" />
        <NavButton icon={Icons.MagnifyingGlassIcon} label="Search" to="/search" />
        <NavButton icon={Icons.HeartIcon} label="Favourite" to="/favourites" />
        <NavButton icon={Icons.Cog6ToothIcon} label="Settings" to="/settings" />
      </div>

      {/* Right: Nav buttons */}
      <div className="ml-auto flex flex-row gap-4 items-center">
        <NavButton icon={Icons.HomeIcon} label="Home" to="/" />
        <NavButton icon={Icons.PlusIcon} label="Submit Recipe" to="/recipe/submit" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setSettingsDropdown(false);
              setUserDropdown((prev) => !prev)
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Icons.UserIcon className="w-6 h-6" />
            <Icons.ChevronDownIcon
              className={`w-4 h-4 transition-transform ${userDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {userDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col py-2 z-50">
              {!isAuthenticated ? (
                <>
                  <NavButton
                    icon={Icons.ArrowRightOnRectangleIcon}
                    label="Login"
                    to="/login"
                    onClick={() => setUserDropdown(false)}
                  />
                  <NavButton
                    icon={Icons.UserPlusIcon}
                    label="Register"
                    to="/register"
                    onClick={() => setUserDropdown(false)}
                  />
                </>
              ) : (
                <>
                  <NavButton
                    icon={Icons.UserIcon}
                    label="My Profile"
                    to="/user"
                    onClick={() => setUserDropdown(false)}
                  />
                  {isAdmin && (
                    <NavButton
                      icon={Icons.UserIcon}
                      label="Users"
                      to="/users_list"
                      onClick={() => setUserDropdown(false)}
                    />
                  )}
                  <NavButton
                    icon={Icons.ArrowRightOnRectangleIcon}
                    label="Logout"
                    to="/"
                    onClick={() => {
                      setUserDropdown(false);
                      handleLogout();
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>

        {/* Settings Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setUserDropdown(false);
              setSettingsDropdown((prev) => !prev);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Icons.Cog6ToothIcon className="w-6 h-6" />
            <Icons.ChevronDownIcon
              className={`w-4 h-4 transition-transform ${settingsDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {settingsDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col py-2 z-50">
              <NavButton icon={Icons.Cog6ToothIcon} label="Settings" to="/settings" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
