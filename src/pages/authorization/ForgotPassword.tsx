import { useState } from "react";
import { Link } from "react-router-dom";

import { oauth2Api } from "../../shared/api/endpoints/public/oauth2";

const ForgotPasswordPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		setError("");

		if (!email) {
			setError("Please enter your email.");
			return;
		}

		try {
			await oauth2Api.sendPasswordChangeRequest(email);
			setMessage("Password reset link has been sent.");
		} catch (err) {
			setError(`Unknown error occured: ${String(err)}`);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
					Forgot your password?
				</h2>
				<form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
					<h3 className="text-gray-600 dark:text-gray-300 text-center mb-4">
						Enter your email address below and we'll send you a link to reset your password.
					</h3>
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
					/>

					<Link to="/register">Don't have an account yet?</Link>
					<Link to="/login">Remembered your password?</Link>

					{error ? (
						<p className="text-red-500 text-sm text-center">{error}</p>
					) : (
						(message ?? <p className="text-green-500 text-sm text-center">{message}</p>)
					)}

					<button
						type="submit"
						className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-xl transition"
					>
						Send Reset Link
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
