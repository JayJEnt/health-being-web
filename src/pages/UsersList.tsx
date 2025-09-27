import { useEffect, useState } from "react";
import { api } from "../api/client";
import { settings } from "../config";
import type { User } from "../api/models/user";
import UserCard from "../components/UsersList/UserCard";
const UsersList: React.FC = () => {
    const [usersList, setUsersList] = useState<User[]>([]);
    useEffect(() => {
        api
            .get<User[]>(`${settings.USERS_ENDPOINT}`)
            .then((res) => {
                setUsersList(res);
            });
    }, []);
    const handleDelete = async (deletedUser: User) => {
        try {
            await api.delete(
                `${settings.USERS_ENDPOINT}/${deletedUser.id}`,
            );
            const newUsersList = usersList.filter(
                (user) => user.id !== deletedUser.id,
            );
            setUsersList(newUsersList);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <div>
                {usersList.map((user) => (
                    <UserCard key={user.id} user={user} deleteHandler={handleDelete} />
                ))}
            </div>
        </div>
    );
};
export default UsersList;
