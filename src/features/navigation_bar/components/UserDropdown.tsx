import type React from "react";

import {
	ArrowRightOnRectangleIcon,
	ChevronDownIcon,
	UserIcon,
	UserPlusIcon,
} from "../../../shared/assets/icons";

import GenericButton from "../../../shared/components/Generic/Button";

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
			<GenericButton type="dropdown" onClick={toggle}>
				<UserIcon className="w-6 h-6" />
				<ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
			</GenericButton>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col py-2 z-50">
					{!isAuthenticated ? (
						<>
							<GenericButton
								type="dropdown"
								as="NavLink"
								icon={ArrowRightOnRectangleIcon}
								label="Login"
								to="/login"
								onClick={close}
							/>
							<GenericButton
								type="dropdown"
								as="NavLink"
								icon={UserPlusIcon}
								label="Register"
								to="/register"
								onClick={close}
							/>
						</>
					) : (
						<>
							<GenericButton
								type="dropdown"
								as="NavLink"
								icon={UserIcon}
								label="My Profile"
								to="/user"
								onClick={close}
							/>

							{isAdmin && (
								<GenericButton
									type="dropdown"
									as="NavLink"
									icon={UserIcon}
									label="Users"
									to="/users_list"
									onClick={close}
								/>
							)}

							<GenericButton
								type="dropdown"
								as="NavLink"
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
