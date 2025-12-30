interface RegisterPasswordProps {
	password: string;
	repeatPassword: string;
	passwordStrength: string;
	onPasswordChange: (value: string) => void;
	onRepeatPasswordChange: (value: string) => void;
}

const RegisterPassword: React.FC<RegisterPasswordProps> = ({
	password,
	repeatPassword,
	passwordStrength,
	onPasswordChange,
	onRepeatPasswordChange,
}) => {
	return (
		<div className="flex flex-col gap-4">
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => onPasswordChange(e.target.value)}
				className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
			/>

			{passwordStrength && (
				<div
					className={`text-sm mt-[-8px] mb-2 ${
						passwordStrength === "Strong"
							? "text-green-600"
							: passwordStrength === "Medium"
								? "text-yellow-600"
								: "text-red-600"
					}`}
				>
					Password strength: {passwordStrength}
				</div>
			)}

			<input
				type="password"
				placeholder="Repeat password"
				value={repeatPassword}
				onChange={(e) => onRepeatPasswordChange(e.target.value)}
				className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
			/>
		</div>
	);
};

export default RegisterPassword;
