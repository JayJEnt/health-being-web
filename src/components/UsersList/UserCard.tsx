import { useState } from "react";
import type { User } from "../../api/models/user";
import { api } from "../../api/client";
import { usersApi } from "../../api/endpoints/admin_role/users";


type Props = {
    user: User;
    deleteHandler: (user: User) => void;
};

const UserCard: React.FC<Props> = ({ user, deleteHandler }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(user.username);
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
        setUsername(user.username);
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
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-lg font-semibold text-gray-900">
                        {user.username}
                    </div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <div className="text-sm text-gray-600">ID: {user.id}</div>
                    <div className="text-sm text-gray-600">Role: {user.role}</div>
                    <div className="flex gap-4">
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 mt-2"
                            onClick={() => deleteHandler(user)}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserCard;
