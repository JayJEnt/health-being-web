import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { tokenDataApi } from "../shared/api/endpoints/user_role/token_data.ts";
import { userOwnerApi } from "../shared/api/endpoints/user_role/user";
import SubmitButton from "../shared/components/Buttons/SubmitButton";
import type { User, UserCreate } from "../shared/models/user";

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
	<section className="bg-white/60 border border-gray-200 rounded-lg p-5">
		<h2 className="text-lg font-semibold mb-4">{title}</h2>
		{children}
	</section>
);

const Field: React.FC<{
	label: string;
	value: string;
	onChange: (v: string) => void;
	type?: string;
	placeholder?: string;
	autoComplete?: string;
}> = ({ label, value, onChange, type = "text", placeholder, autoComplete }) => (
	<label className="block">
		<span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
		<input
			type={type}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			autoComplete={autoComplete}
			className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
		/>
	</label>
);

const Message: React.FC<{ text: string | null }> = ({ text }) =>
	text ? <p className="text-sm mt-3 text-gray-700">{text}</p> : null;

const SettingsPage: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [userLoading, setUserLoading] = useState(true);
	const [userError, setUserError] = useState<string | null>(null);

	const [identityDraft, setIdentityDraft] = useState<Pick<UserCreate, "name" | "email">>({
		name: "",
		email: "",
	});

	const [identityMsg, setIdentityMsg] = useState<string | null>(null);
	const [identitySaving, setIdentitySaving] = useState(false);

	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");
	const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
	const [passwordSaving, setPasswordSaving] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const fetchUser = async () => {
			try {
				setUserLoading(true);
				setUserError(null);

				const response = await tokenDataApi.getUser();
				if (!isMounted) return;

				if (!response) throw new Error("Empty user response");

				setUser(response);

				setIdentityDraft({
					name: response.name ?? "",
					email: response.email ?? "",
				});
			} catch (err) {
				console.error("Failed to fetch user:", err);
				if (!isMounted) return;

				setUser(null);
				setIdentityDraft({ name: "", email: "" });
				setUserError("Failed to load user data. Please refresh and try again.");
			} finally {
				if (isMounted) setUserLoading(false);
			}
		};

		void fetchUser();

		return () => {
			isMounted = false;
		};
	}, []);

	const currentName = user?.name ?? "";
	const currentEmail = user?.email ?? "";

	const identityValidation = useMemo(() => {
		const nextName = identityDraft.name.trim();
		const nextEmail = identityDraft.email.trim();

		if (nextName.length === 0) return { ok: false, reason: "Name is required." };
		if (nextName.length < 3) return { ok: false, reason: "Name must be at least 3 characters." };
		if (nextName.length > 30) return { ok: false, reason: "Name must be at most 30 characters." };
		if (!/^[a-zA-Z0-9_.-]+$/.test(nextName))
			return {
				ok: false,
				reason: "Allowed: letters, numbers, underscore, dot and dash.",
			};

		if (nextEmail.length === 0) return { ok: false, reason: "Email is required." };
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail))
			return { ok: false, reason: "Invalid email format." };

		if (user && nextName === (user.name ?? "") && nextEmail === (user.email ?? "")) {
			return { ok: false, reason: "No changes to save." };
		}

		return { ok: true, reason: "" };
	}, [identityDraft.name, identityDraft.email, user]);

	const passwordValidation = useMemo(() => {
		if (password1.length === 0 || password2.length === 0) {
			return { ok: false, reason: "Please fill in both password fields." };
		}
		if (password1.length < 8) {
			return { ok: false, reason: "Password must be at least 8 characters." };
		}
		if (password1 !== password2) {
			return { ok: false, reason: "Passwords do not match." };
		}
		return { ok: true, reason: "" };
	}, [password1, password2]);

	const formsDisabled = userLoading || !user;

	const onIdentitySubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIdentityMsg(null);

		if (!user) {
			setIdentityMsg("User data is not loaded yet.");
			return;
		}

		if (!identityValidation.ok) {
			setIdentityMsg(identityValidation.reason);
			return;
		}

		const payload: UserCreate = {
			name: identityDraft.name.trim(),
			email: identityDraft.email.trim(),
		};

		setIdentitySaving(true);
		try {
			await userOwnerApi.update(payload);

			setUser((prev) => (prev ? { ...prev, name: payload.name, email: payload.email } : prev));

			setIdentityMsg("Account details updated.");
		} catch (err) {
			console.error(err);
			setIdentityMsg("Something went wrong while updating account details.");
		} finally {
			setIdentitySaving(false);
		}
	};

	const onPasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setPasswordMsg(null);

		if (!user) {
			setPasswordMsg("User data is not loaded yet.");
			return;
		}

		if (!passwordValidation.ok) {
			setPasswordMsg(passwordValidation.reason);
			return;
		}

		const baseName = user.name ?? "";
		const baseEmail = user.email ?? "";

		if (!baseName || !baseEmail) {
			setPasswordMsg("Missing name/email in user data. Please refresh and try again.");
			return;
		}

		const payload: UserCreate = {
			name: baseName,
			email: baseEmail,
			password: password1,
		};

		setPasswordSaving(true);
		try {
			await userOwnerApi.update(payload);

			setPasswordMsg("Password updated.");
			setPassword1("");
			setPassword2("");
		} catch (err) {
			console.error(err);
			setPasswordMsg("Something went wrong while updating password.");
		} finally {
			setPasswordSaving(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-2">Settings</h1>

			<p className="text-sm text-gray-600 mb-6">
				{userLoading
					? "Loading user data..."
					: userError
						? userError
						: `Signed in as ${currentName || "Unknown user"} (${currentEmail || "no-email"})`}
			</p>

			<div className="space-y-6">
				<Card title="Account details">
					<form onSubmit={onIdentitySubmit} className="space-y-4">
						<Field
							label="Name"
							value={identityDraft.name}
							onChange={(v) => setIdentityDraft((d) => ({ ...d, name: v }))}
							placeholder="e.g. john_doe"
							autoComplete="username"
						/>
						<Field
							label="Email"
							value={identityDraft.email}
							onChange={(v) => setIdentityDraft((d) => ({ ...d, email: v }))}
							type="email"
							placeholder="e.g. user@example.com"
							autoComplete="email"
						/>

						<div className="flex items-center gap-3">
							<SubmitButton
								disabled={formsDisabled || identitySaving || !identityValidation.ok}
								className={identitySaving ? "opacity-70 cursor-not-allowed" : ""}
							>
								{identitySaving ? "Saving..." : "Save changes"}
							</SubmitButton>

							{!identityValidation.ok &&
								(identityDraft.name.trim().length > 0 || identityDraft.email.trim().length > 0) && (
									<span className="text-sm text-gray-500">{identityValidation.reason}</span>
								)}
						</div>

						<Message text={identityMsg} />
					</form>
				</Card>

				<Card title="Change password">
					<form onSubmit={onPasswordSubmit} className="space-y-4">
						<Field
							label="New password"
							value={password1}
							onChange={setPassword1}
							type="password"
							placeholder="At least 8 characters"
							autoComplete="new-password"
						/>
						<Field
							label="Confirm new password"
							value={password2}
							onChange={setPassword2}
							type="password"
							placeholder=""
							autoComplete="new-password"
						/>

						<div className="flex items-center gap-3">
							<SubmitButton
								disabled={formsDisabled || passwordSaving || !passwordValidation.ok}
								className={passwordSaving ? "opacity-70 cursor-not-allowed" : ""}
							>
								{passwordSaving ? "Saving..." : "Save password"}
							</SubmitButton>

							{!passwordValidation.ok && (password1.length > 0 || password2.length > 0) && (
								<span className="text-sm text-gray-500">{passwordValidation.reason}</span>
							)}
						</div>

						<Message text={passwordMsg} />
					</form>
				</Card>
			</div>
		</div>
	);
};

export default SettingsPage;
