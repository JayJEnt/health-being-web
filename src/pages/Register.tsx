import { useState } from "react";
import { Link } from "react-router-dom";
import { oauth2Api } from "../api/endpoints/public/oauth2";
import type { UserCreate } from "../api/models/user";


const LoginPage: React.FC = () => {
    const [user, setUser] = useState<UserCreate>({
        username: "",
        email: "",
        password: "",
    });
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [error, setError] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user.username || !user.email || !user.password) {
            setError("Please enter username, email and password.");
            return;
        }

        if (user.password !== repeatPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const res = await oauth2Api.ourRegister(user);
            console.log(res);
            setError("");
            alert("Registered successfully!");
        } catch (err) {
            console.error("Registration error:", err);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                    Sign up
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={user.username}
                        onChange={(e) =>
                            setUser((user) => ({ ...user, username: e.target.value }))
                        }
                        className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) =>
                            setUser((user) => ({ ...user, email: e.target.value }))
                        }
                        className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) =>
                            setUser((user) => ({ ...user, password: e.target.value }))
                        }
                        className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <input
                        type="password"
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <Link to="/login">Already have an account?</Link>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-xl transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
