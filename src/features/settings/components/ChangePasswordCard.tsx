import { type FC, type FormEvent, useMemo, useState } from "react";

import { userOwnerApi } from "../../../shared/api/endpoints/user_role/user";
import SubmitButton from "../../../shared/components/Buttons/SubmitButton";
import Card from "../../../shared/components/Display/Card";
import Field from "../../../shared/components/Form/Field";
import StatusMessage, {
	type StatusMessageData,
} from "../../../shared/components/Status/StatusMessage";
import type { User, UserPatch } from "../../../shared/models/user";

import { validatePassword } from "../validators";

type Props = {
	user: User | null;
	disabled: boolean;
	onUserUpdated: (u: User) => void;
};

const ChangePasswordCard: FC<Props> = ({ user, disabled, onUserUpdated }) => {
	const [p1, setP1] = useState("");
	const [p2, setP2] = useState("");
	const [msg, setMsg] = useState<StatusMessageData>(null);
	const [saving, setSaving] = useState(false);

	const error = useMemo(() => validatePassword(p1, p2), [p1, p2]);

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

		const payload: UserPatch = { password: p1 };

		setSaving(true);
		try {
			const updatedUser = await userOwnerApi.patch(payload);
			onUserUpdated(updatedUser);

			setMsg({ text: "Password updated.", type: "success" });
			setP1("");
			setP2("");
		} catch (err) {
			console.error(err);
			setMsg({
				text: "Something went wrong while updating password.",
				type: "error",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card title="Change password">
			<form onSubmit={onSubmit} className="space-y-4">
				<Field
					label="New password"
					value={p1}
					onChange={(v) => {
						setP1(v);
						if (msg) setMsg(null);
					}}
					type="password"
					placeholder="At least 8 characters"
					autoComplete="new-password"
				/>
				<Field
					label="Confirm new password"
					value={p2}
					onChange={(v) => {
						setP2(v);
						if (msg) setMsg(null);
					}}
					type="password"
					autoComplete="new-password"
				/>

				<div className="flex items-center gap-3 flex-wrap">
					<SubmitButton
						disabled={disabled || saving || !!error}
						className={saving ? "opacity-70 cursor-not-allowed" : ""}
					>
						{saving ? "Saving..." : "Save password"}
					</SubmitButton>

					{error ? <span className="text-sm text-red-600">{error}</span> : null}
				</div>

				<StatusMessage msg={msg} />
			</form>
		</Card>
	);
};

export default ChangePasswordCard;
