import { type FC, type FormEvent, useEffect, useMemo, useState } from "react";

import { userOwnerApi } from "../../../shared/api/endpoints/user_role/user";
import SubmitButton from "../../../shared/components/Buttons/SubmitButton";
import Card from "../../../shared/components/Display/Card";
import Field from "../../../shared/components/Form/Field";
import StatusMessage, {
	type StatusMessageData,
} from "../../../shared/components/Status/StatusMessage";
import type { User, UserPatch } from "../../../shared/models/user";

import { validateName } from "../validators";

type Props = {
	user: User | null;
	disabled: boolean;
	onUserUpdated: (u: User) => void;
};

const ChangeNameCard: FC<Props> = ({ user, disabled, onUserUpdated }) => {
	const currentName = user?.name ?? "";

	const [draft, setDraft] = useState("");
	const [msg, setMsg] = useState<StatusMessageData>(null);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		setDraft(currentName);
	}, [currentName]);

	const error = useMemo(() => validateName(draft), [draft]);
	const changed = useMemo(() => !!user && draft.trim() !== currentName, [draft, currentName, user]);

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

		const payload: UserPatch = { name: draft.trim() };

		setSaving(true);
		try {
			const updatedUser = await userOwnerApi.patch(payload);
			onUserUpdated(updatedUser);
			setMsg({ text: "Name updated.", type: "success" });
		} catch (err) {
			console.error(err);
			setMsg({
				text: "Something went wrong while updating name.",
				type: "error",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card title="Change name">
			<form onSubmit={onSubmit} className="space-y-4">
				<Field
					label="Name"
					value={draft}
					onChange={(v) => {
						setDraft(v);
						if (msg) setMsg(null);
					}}
					placeholder="e.g. john_doe"
					autoComplete="username"
				/>

				<div className="flex items-center gap-3 flex-wrap">
					<SubmitButton
						disabled={disabled || saving || !!error || !changed}
						className={saving ? "opacity-70 cursor-not-allowed" : ""}
					>
						{saving ? "Saving..." : "Save name"}
					</SubmitButton>

					{user && !changed ? (
						<span className="text-sm text-gray-500">Current username</span>
					) : user && changed ? (
						<button
							type="button"
							onClick={() => {
								setDraft(currentName);
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

export default ChangeNameCard;
