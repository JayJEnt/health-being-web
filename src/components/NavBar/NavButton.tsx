import React from 'react';
import { NavLink } from 'react-router-dom';

type NavButtonProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  onClick?: () => void;
};

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label, to, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-colors
				${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`
      }
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-current" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
};

export default NavButton;
