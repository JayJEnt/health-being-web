import type { FC } from "react";
import { useCurrentUser } from "../../shared/hooks/useCurrentUser";
import ChangeEmailCard from "./components/ChangeEmailCard";
import ChangeNameCard from "./components/ChangeNameCard";
import ChangePasswordCard from "./components/ChangePasswordCard";

const SettingsScreen: FC = () => {
	const { user, setUser, loading, error } = useCurrentUser();

	const currentName = user?.name ?? "";
	const currentEmail = user?.email ?? "";

	const formsDisabled = loading || !user;
	const userLineClass = error ? "text-red-600" : "text-gray-600";

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-2">Settings</h1>

			<p className={`text-sm mb-6 ${userLineClass}`}>
				{loading
					? "Loading user data..."
					: error
						? error
						: `Signed in as ${currentName || "Unknown user"} (${currentEmail || "no-email"})`}
			</p>

			<div className="space-y-6">
				<ChangeNameCard user={user} disabled={formsDisabled} onUserUpdated={setUser} />
				<ChangeEmailCard user={user} disabled={formsDisabled} onUserUpdated={setUser} />
				<ChangePasswordCard user={user} disabled={formsDisabled} onUserUpdated={setUser} />
			</div>
		</div>
	);
};

export default SettingsScreen;
