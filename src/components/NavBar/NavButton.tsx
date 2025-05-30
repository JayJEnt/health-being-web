import React from "react";

type NavButtonProps = {
	icon: React.ElementType;
	label: string;
};

const NavButton: React.FC<NavButtonProps> = ({ icon: Icon, label }) => {
	return (
		<button
			className="flex gap-6 w-[80%] cursor-pointer 
            lg:text-2xl mt-5
            text-light-navbar-text dark:text-light-navbar-text"
		>
			<Icon className="lg:w-9" />
			<span>{label}</span>
		</button>
	);
};

export default NavButton;
