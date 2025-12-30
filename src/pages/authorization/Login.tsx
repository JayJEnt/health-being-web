import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { oauth2Api } from "../../shared/api/endpoints/public/oauth2";
import { GoogleIcon } from "../../shared/assets/GoogleIcon";
import GenericButton from "../../shared/components/Buttons/Button";
import SubmitButton from "../../shared/components/Buttons/SubmitButton";
import { useAuth } from "../../shared/hooks/useAuth";

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleGoogleLogin = async () => {
		try {
			const response = await oauth2Api.externalLogin("google");
			if (response.url) {
				window.location.href = response.url;
			}
		} catch (err) {
			console.error("Failed to initialize Google login", err);
			setError("Failed to initialize Google login");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Please enter email and password.");
			return;
		}

		try {
			await login({ email, password });
			void navigate("/");
		} catch (err) {
			console.error("Login failed", err);
			setError("Login failed. Check your credentials.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
					Login to your account
				</h2>
				<form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
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
					<Link to="/forgot_password">Forgot your password?</Link>
					{error && <p className="text-red-500 text-sm text-center">{error}</p>}
					<SubmitButton>Login</SubmitButton>

					<div className="relative my-4">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
						</div>
					</div>

					<GenericButton
						onClick={() => void handleGoogleLogin()}
						className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition"
					>
						<GoogleIcon className="w-5 h-5" />
						<span>Sign in with Google</span>
					</GenericButton>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
