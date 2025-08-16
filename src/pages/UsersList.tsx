import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { User } from "../types/user";
const UsersList: React.FC = () => {
    const [usersList, setUsersList] = useState<User[]>([]);
    useEffect(() => {
        api.get<User[]>("/users").then((res) => {
            setUsersList(res);
        });
    }, []);
    return (
        <div>
            <div>
                {usersList.map((user) => (
                    <div key={user.id}>
                        <a>{user.username}</a>
                        <a>{user.email}</a>
                        <a>{user.id}</a>
                        <a>{user.role}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default UsersList;
