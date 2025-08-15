import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import type { Token } from "../types/token";
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please enter username, email and password.");
            return;
        }

        try {
            const res = await api.postForm<Token>("/oauth2_our/login", {
                username: email,
                password: password,
            });
            console.log(res);
            localStorage.setItem("token", res.access_token);
            setError("");
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
                    Login to your account
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                    <Link to="/register">Don't have an account yet?</Link>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-xl transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
