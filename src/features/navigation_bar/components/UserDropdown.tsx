import type React from "react";

import {
	ArrowRightOnRectangleIcon,
	ChevronDownIcon,
	UserIcon,
	UserPlusIcon,
} from "../../../shared/assets/icons";

import NavButton from "./NavButton";

interface UserDropdownProps {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
	isAuthenticated: boolean;
	isAdmin: boolean;
	handleLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
	isOpen,
	toggle,
	close,
	isAuthenticated,
	isAdmin,
	handleLogout,
}) => {
	return (
		<div className="relative">
			<button
				type="button"
				onClick={toggle}
				className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
			>
				<UserIcon className="w-6 h-6" />
				<ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col py-2 z-50">
					{!isAuthenticated ? (
						<>
							<NavButton
								icon={ArrowRightOnRectangleIcon}
								label="Login"
								to="/login"
								onClick={close}
							/>
							<NavButton icon={UserPlusIcon} label="Register" to="/register" onClick={close} />
						</>
					) : (
						<>
							<NavButton icon={UserIcon} label="My Profile" to="/user" onClick={close} />

							{isAdmin && (
								<NavButton icon={UserIcon} label="Users" to="/users_list" onClick={close} />
							)}

							<NavButton
								icon={ArrowRightOnRectangleIcon}
								label="Logout"
								to="/"
								onClick={() => {
									close();
									handleLogout();
								}}
							/>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default UserDropdown;
