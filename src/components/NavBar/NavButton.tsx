import React from 'react';
import { NavLink } from 'react-router-dom';

type NavButtonProps = {
  icon: React.ElementType;
  label: string;
  to: string;
};

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
        ${isActive
          ? 'text-blue-600 font-semibold'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
      }
    >
      <Icon className="w-5 h-5 text-current" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
};

export default NavButton;