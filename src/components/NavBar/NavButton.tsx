import React from "react";
import { NavLink } from "react-router-dom";

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
                `flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-colors
				${isActive ? "bg-light-accent/20 text-light-accent" : "text-light-navbar-text hover:bg-light-navbar-hover"}`
            }
        >
            <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
            <span className="text-base lg:text-lg font-medium">{label}</span>
        </NavLink>
    );
};

export default NavButton;
