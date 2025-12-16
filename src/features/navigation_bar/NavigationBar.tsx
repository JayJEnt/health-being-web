import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon, PlusIcon } from "../../shared/assets/icons";
import { useAuth } from "../../shared/hooks/useAuth";
import type { User } from "../../shared/models/user";

import NavButton from "./components/NavButton";
import SearchBar from "./components/SearchBar";
import SettingsDropdown from "./components/SettingsDropdown";
import UserDropdown from "./components/UserDropdown";

const NavigationBar: React.FC = () => {
	const { status, user, logout } = useAuth() as {
		logout: () => void;
		status: string;
		user: User;
	};

	const navigate = useNavigate();
	const isAuthenticated = status === "authenticated";

	const [openDropdown, setOpenDropdown] = useState<"user" | "settings" | null>(null);

	const handleLogout = () => {
		logout();
		void navigate("/");
	};

	return (
		<nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center px-8 z-50">
			<h1 className="text-xl font-bold text-gray-800 mr-8">Health-being</h1>
			<SearchBar />

			<div className="ml-auto flex flex-row gap-4 items-center">
				<NavButton icon={HomeIcon} label="Home" to="/" />
				<NavButton icon={PlusIcon} label="Submit Recipe" to="/recipe/submit" />

				<UserDropdown
					isOpen={openDropdown === "user"}
					close={() => setOpenDropdown(null)}
					toggle={() => setOpenDropdown((prev) => (prev === "user" ? null : "user"))}
					isAuthenticated={isAuthenticated}
					isAdmin={user?.role === "admin"}
					handleLogout={handleLogout}
				/>

				<SettingsDropdown
					isOpen={openDropdown === "settings"}
					close={() => setOpenDropdown(null)}
					toggle={() => setOpenDropdown((prev) => (prev === "settings" ? null : "settings"))}
				/>
			</div>
		</nav>
	);
};

export default NavigationBar;
