import { useState } from "react";
import { Link } from "react-router-dom";
import checkPasswordStrength from "../features/register_password/checkPasswordStrength";
import RegisterPassword from "../features/register_password/RegisterPassword";
import { oauth2Api } from "../shared/api/endpoints/public/oauth2";
import type { UserCreate } from "../shared/api/models/user";

const RegisterPage: React.FC = () => {
	const [user, setUser] = useState<UserCreate>({
		name: "",
		email: "",
		password: "",
	});
	const [repeatPassword, setRepeatPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [passwordStrength, setPasswordStrength] = useState<string>("");

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setUser((user) => ({ ...user, password: val }));
		setPasswordStrength(checkPasswordStrength(val));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user.name || !user.email || !user.password) {
			setError("Please enter username, email and password.");
			return;
		}
		if (user.password !== repeatPassword) {
			setError("Passwords do not match.");
			return;
		}
		const strength = checkPasswordStrength(user.password);
		if (strength === "Too short" || strength === "Weak") {
			setError(
				"Password is too weak. Use at least 8 characters, upper and lower case, number and special character.",
			);
			return;
		}
		try {
			console.log("Registering user:", user);
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
				<form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
					<input
						type="text"
						placeholder="Username"
						value={user.name}
						onChange={(e) => setUser((user) => ({ ...user, name: e.target.value }))}
						className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
					/>
					<input
						type="email"
						placeholder="Email"
						value={user.email}
						onChange={(e) => setUser((user) => ({ ...user, email: e.target.value }))}
						className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
					/>
					<RegisterPassword
						password={user.password || ""}
						repeatPassword={repeatPassword}
						passwordStrength={passwordStrength}
						onPasswordChange={(value) =>
							handlePasswordChange({
								target: { value },
							} as React.ChangeEvent<HTMLInputElement>)
						}
						onRepeatPasswordChange={(value) => setRepeatPassword(value)}
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

export default RegisterPage;
