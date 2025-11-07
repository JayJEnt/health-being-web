import { useEffect, useState } from 'react';

import { userAdminApi } from '../api/endpoints/admin_role/user';
import type { User } from '../api/models/user';
import UserCard from '../components/UsersList/UserCard';

const UsersList: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  useEffect(() => {
    void userAdminApi.getAll().then(setUsersList).catch(console.error);
  }, []);
  const handleDelete = async (deletedUser: User) => {
    try {
      await userAdminApi.delete(deletedUser.id);
      const newUsersList = usersList.filter((user) => user.id !== deletedUser.id);
      setUsersList(newUsersList);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        {usersList.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            deleteHandler={(u) => {
              void handleDelete(u);
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default UsersList;
