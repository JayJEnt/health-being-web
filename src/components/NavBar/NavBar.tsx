import * as Icons from "../../assets/icons";
import { useAuth } from "../../auth/useAuth";
import NavButton from "./NavButton";
import { useNavigate } from "react-router-dom";
const NavBar: React.FC = () => {
    const { status, user, logout } = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = status === "authenticated";
    const isAdmin = user?.role === "admin";

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

                {!isAuthenticated && (
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

                {isAuthenticated && (
                    <button
                        className="flex cursor-pointer items-center gap-4 w-full px-4 py-3 rounded-xl transition-colors text-light-navbar-text hover:bg-light-navbar-hover"
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        <Icons.ArrowRightOnRectangleIcon className="w-6 h-6 lg:w-8 lg:h-8" />
                        <span className="text-base lg:text-lg font-medium">Logout</span>
                    </button>
                )}
            </div>

            {isAdmin && (
                <>
                    <h2 className="text-sm font-semibold mt-8 mb-2 text-light-navbar-text uppercase tracking-wide">
                        Admin
                    </h2>
                    <div className="flex flex-col gap-2 w-full ">
                        <NavButton icon={Icons.UserIcon} label="Users" to="/users_list" />
                    </div>
                </>
            )}
        </nav>
    );
};

export default NavBar;
