import { useState } from "react";

import { api } from "../../shared/api/client";
import type { User } from "../../shared/api/models/user";
import GenericButton from "../../shared/components/Generic/Button";

type Props = {
	user: User;
	deleteHandler: (user: User) => void;
};

const UserCard: React.FC<Props> = ({ user, deleteHandler }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [username, setUsername] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");

	const handleSave = async () => {
		try {
			await api.put(`/users/${user.id}`, {
				username,
				email,
				...(password ? { password } : {}),
			});
			setIsEditing(false);
			setPassword("");
			alert("User updated!");
		} catch (err) {
			console.error("Error updating user:", err);
			alert("Update failed.");
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setUsername(user.name);
		setEmail(user.email);
		setPassword("");
	};

	return (
		<div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 space-y-2">
			{isEditing ? (
				<>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border rounded px-2 py-1 w-full"
						placeholder="Username"
					/>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border rounded px-2 py-1 w-full"
						placeholder="Email"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border rounded px-2 py-1 w-full"
						placeholder="New Password (optional)"
					/>
					<div className="flex gap-2">
						<GenericButton
							type="button"
							className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
							onClick={void handleSave}
						>
							Save
						</GenericButton>
						<GenericButton
							type="button"
							className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
							onClick={handleCancel}
						>
							Cancel
						</GenericButton>
					</div>
				</>
			) : (
				<>
					<div className="text-lg font-semibold text-gray-900">{user.name}</div>
					<div className="text-sm text-gray-600">{user.email}</div>
					<div className="text-sm text-gray-600">ID: {user.id}</div>
					<div className="text-sm text-gray-600">Role: {user.role}</div>
					<div className="flex gap-4">
						<GenericButton
							type="button"
							className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
							onClick={() => setIsEditing(true)}
						>
							Edit
						</GenericButton>
						<GenericButton
							type="button"
							className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mt-2"
							onClick={() => deleteHandler(user)}
						>
							Delete
						</GenericButton>
					</div>
				</>
			)}
		</div>
	);
};

export default UserCard;
