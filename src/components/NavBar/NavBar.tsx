import * as Icons from "../../assets/icons.ts";
import NavButton from "./NavButton.tsx";

type Props = {
    loggedIn: boolean;
};
const NavBar: React.FC<Props> = ({ loggedIn }) => {
    return (
        <nav className="flex flex-col items-start h-full p-6 bg-light-navbar-bg lg:w-[15vw] min-w-[180px]">
            <h1 className="text-xl font-bold mb-6 text-light-navbar-text">Menu</h1>

            <div className="flex flex-col gap-2 w-full">
                <NavButton icon={Icons.HomeIcon} label="Home" to="/" />
                <NavButton
                    icon={Icons.MagnifyingGlassIcon}
                    label="Search"
                    to="/recipe/24"
                />
                <NavButton icon={Icons.HeartIcon} label="Favourite" to="/favourites" />
                <NavButton icon={Icons.Cog6ToothIcon} label="Settings" to="/settings" />
            </div>

            <h2 className="text-sm font-semibold mt-8 mb-2 text-light-navbar-text uppercase tracking-wide">
                Recipes
            </h2>
            <div className="flex flex-col gap-2 w-full">
                <NavButton
                    icon={Icons.PlusIcon}
                    label="Submit Recipe"
                    to="/recipe/submit"
                />
            </div>

            <h2 className="text-sm font-semibold mt-8 mb-2 text-light-navbar-text uppercase tracking-wide">
                User
            </h2>
            <div className="flex flex-col gap-2 w-full">
                <NavButton icon={Icons.UserIcon} label="My Profile" to="/user" />
                {!loggedIn && (
                    <>
                        <NavButton
                            icon={Icons.ArrowRightOnRectangleIcon}
                            label="Login"
                            to="/login"
                        />
                        <NavButton
                            icon={Icons.UserPlusIcon}
                            label="Register"
                            to="/register"
                        />
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
