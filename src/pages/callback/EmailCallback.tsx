import { useEffect, useState } from "react";

import { oauth2Api } from "../../shared/api/endpoints/public/oauth2";
import { useSaveTokenFromQueryToLocalStorage } from "../../shared/hooks/token";

const EmailCallbackPage: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	useSaveTokenFromQueryToLocalStorage();

	useEffect(() => {
		oauth2Api
			.verifyEmail()
			.then(() => setMessage("Email succesfully verified!"))
			.catch(() => setError("Could not verify email."));
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		setError("");

		if (!email) {
			setError("Please enter email.");
			return;
		}

		try {
			await oauth2Api.sendVerificationEmail(email);
			setMessage("Email have been sent.");
		} catch (err: unknown) {
			console.error(err);
			setError("Could not send verification email.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
					Authentication process
				</h2>
				{error ? (
					<form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
						<p className="text-red-500 text-sm text-center">{error}</p>
						<input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
						/>
						<button
							type="submit"
							className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-xl transition"
							onClick={handleSubmit}
						>
							Send new authentication link
						</button>
					</form>
				) : (
					<p className="text-green-500 text-sm text-center">{message}</p>
				)}
			</div>
		</div>
	);
};

export default EmailCallbackPage;
