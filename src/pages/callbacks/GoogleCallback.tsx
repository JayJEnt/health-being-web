import { useEffect, useState } from "react";

import { saveToken } from "../../shared/hooks/saveToken";

const GoogleCallbackPage: React.FC = () => {
	const [message, setMessage] = useState("Processing login...");
	const [error, setError] = useState("");
	const token = new URLSearchParams(window.location.search).get("token");

	useEffect(() => {
		if (!token) {
			setError("No token provided in the callback URL.");
			return;
		}

		try {
			saveToken(token);
			setMessage("Login successful! You can now navigate to the application.");
		} catch (err) {
			setError((err as Error).message);
			setMessage("");
		}
	}, [token]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
				<h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Google Login</h2>

				{error ? (
					<div className="text-red-500 mb-4">{error}</div>
				) : (
					<div className="text-green-500 mb-4">{message}</div>
				)}

				<button
					type="submit"
					onClick={() => {
						window.location.href = "/";
					}}
					className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition mt-4"
				>
					Go to Home
				</button>
			</div>
		</div>
	);
};

export default GoogleCallbackPage;
