import { type FC, type FormEvent, useEffect, useMemo, useState } from "react";

import { userOwnerApi } from "../../../shared/api/endpoints/user_role/user";
import SubmitButton from "../../../shared/components/Buttons/SubmitButton";
import Card from "../../../shared/components/Display/Card";
import Field from "../../../shared/components/Form/Field";
import StatusMessage, {
	type StatusMessageData,
} from "../../../shared/components/Status/StatusMessage";
import type { User, UserPatch } from "../../../shared/models/user";

import { validateEmail } from "../validators";

type Props = {
	user: User | null;
	disabled: boolean;
	onUserUpdated: (u: User) => void;
};

const ChangeEmailCard: FC<Props> = ({ user, disabled, onUserUpdated }) => {
	const currentEmail = user?.email ?? "";

	const [draft, setDraft] = useState("");
	const [msg, setMsg] = useState<StatusMessageData>(null);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setDraft(currentEmail);
	}, [currentEmail]);

	const error = useMemo(() => validateEmail(draft), [draft]);
	const changed = useMemo(
		() => !!user && draft.trim() !== currentEmail,
		[draft, currentEmail, user],
	);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setMsg(null);

		if (!user) {
			setMsg({ text: "User data is not loaded yet.", type: "error" });
			return;
		}
		if (error) {
			setMsg({ text: error, type: "error" });
			return;
		}
		if (!changed) return;

		const payload: UserPatch = { email: draft.trim() };

		setSaving(true);
		try {
			const updatedUser = await userOwnerApi.patch(payload);
			onUserUpdated(updatedUser);
			setMsg({ text: "Email updated.", type: "success" });
		} catch (err) {
			console.error(err);
			setMsg({
				text: "Something went wrong while updating email.",
				type: "error",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card title="Change email">
			<form onSubmit={onSubmit} className="space-y-4">
				<Field
					label="Email"
					value={draft}
					onChange={(v) => {
						setDraft(v);
						if (msg) setMsg(null);
					}}
					type="email"
					placeholder="e.g. user@example.com"
					autoComplete="email"
				/>

				<div className="flex items-center gap-3 flex-wrap">
					<SubmitButton
						disabled={disabled || saving || !!error || !changed}
						className={saving ? "opacity-70 cursor-not-allowed" : ""}
					>
						{saving ? "Saving..." : "Save email"}
					</SubmitButton>

					{user && !changed ? (
						<span className="text-sm text-gray-500">Current email</span>
					) : user && changed ? (
						<button
							type="button"
							onClick={() => {
								setDraft(currentEmail);
								setMsg(null);
							}}
							disabled={disabled || saving}
							className="text-sm text-gray-600 underline disabled:opacity-50"
						>
							Reset
						</button>
					) : null}

					{error ? <span className="text-sm text-red-600">{error}</span> : null}
				</div>

				<StatusMessage msg={msg} />
			</form>
		</Card>
	);
};

export default ChangeEmailCard;
