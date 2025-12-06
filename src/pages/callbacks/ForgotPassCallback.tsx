import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import checkPasswordStrength from "../../features/register_password/checkPasswordStrength";
import RegisterPassword from "../../features/register_password/RegisterPassword";
import { oauth2Api } from "../../shared/api/endpoints/public/oauth2";
import { storeToken } from "../../shared/hooks/storeToken";

const ForgotPassCallbackPage: React.FC = () => {
	const { token } = useParams();
	const [password, setPassword] = useState<string>("");
	const [repeatPassword, setRepeatPassword] = useState<string>("");
	const [passwordStrength, setPasswordStrength] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	useEffect(() => {
		if (!token) return;
		storeToken(token);
	}, [token]);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setPassword(val);
		setPasswordStrength(checkPasswordStrength(val));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");
		setError("");

		if (!password) {
			setError("Please enter password.");
			return;
		}
		if (password !== repeatPassword) {
			setError("Passwords do not match.");
			return;
		}
		const strength = checkPasswordStrength(password);
		if (strength === "Too short" || strength === "Weak") {
			setError(
				"Password is too weak. Use at least 8 characters, upper and lower case, number and special character.",
			);
			return;
		}
		try {
			await oauth2Api.sendVerificationEmail(password); // Fix this line to call the correct API for password reset
			setMessage("Password have been changed.");
		} catch (err: unknown) {
			setError(`Unknown error occured: ${String(err)}`);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
					Create new Password
				</h2>
				<form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
					<RegisterPassword
						password={password || ""}
						repeatPassword={repeatPassword}
						passwordStrength={passwordStrength}
						onPasswordChange={(value) =>
							handlePasswordChange({
								target: { value },
							} as React.ChangeEvent<HTMLInputElement>)
						}
						onRepeatPasswordChange={(value) => setRepeatPassword(value)}
					/>
					{error ? (
						<p className="text-red-500 text-sm text-center">{error}</p>
					) : (
						(message ?? <p className="text-green-500 text-sm text-center">{message}</p>)
					)}
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

export default ForgotPassCallbackPage;
