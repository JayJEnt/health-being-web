import * as Icons from "../../assets/icons.ts"; //Icons List
import NavButton from "./NavButton.tsx"; //NavBarButton Component

const NavBar: React.FC = () => {
	return (
		<nav
			className="flex flex-col h-full items-center 
            lg:w-[15vw] p-8
            bg-light-navbar-bg"
		>
			<NavButton icon={Icons.HomeIcon} label="Home" />
			<NavButton icon={Icons.MagnifyingGlassIcon} label="Serach" />
			<NavButton icon={Icons.HeartIcon} label="Favourite" />
			<NavButton icon={Icons.Cog6ToothIcon} label="Settings" />
		</nav>
	);
};

export default NavBar;
