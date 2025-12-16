import { useEffect, useState } from "react";
import GenericButton from "../../shared/components/Generic/Button";
import { getTokenFromStorage, useSaveQueryTokenToStorage } from "../../shared/hooks/useToken";

const GoogleCallbackPage: React.FC = () => {
	const [message, setMessage] = useState<string>("Processing login...");
	const [error, setError] = useState<string>("");
	useSaveQueryTokenToStorage();

	useEffect(() => {
		const token = getTokenFromStorage();
		if (!token) {
			setError("Could not login.");
			return;
		}
		setMessage("Login successful! You can now navigate to the application.");
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
				<h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Google Login</h2>

				{error ? (
					<div className="text-red-500 mb-4">{error}</div>
				) : (
					<div className="text-green-500 mb-4">{message}</div>
				)}

				<GenericButton
					type="submit"
					onClick={() => {
						window.location.href = "/";
					}}
				>
					Go to Home
				</GenericButton>
			</div>
		</div>
	);
};

export default GoogleCallbackPage;
