import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersOwnerApi } from '../api/endpoints/user_role/users';
import type { UserCreate } from '../api/models/user';
import { useAuth } from '../auth/useAuth';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    if (!user) {
      void navigate('/login');
    }
  }, [user, navigate]);

  const [newUser, setNewUser] = useState<UserCreate>({
    username: user?.username ?? '',
    email: user?.email ?? '',
    password: '',
    weight: user?.weight,
    hieght: user?.hieght,
    age: user?.age,
    activity_level: user?.activity_level,
    silhouette: user?.silhouette,
  });

  const [repeatedPassword, setRepeatedPassword] = useState<string>('');

  function handleFieldEdit<K extends keyof UserCreate>(newValue: UserCreate[K], field: K) {
    setNewUser((prev) => ({ ...prev, [field]: newValue }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const updateResponse = await usersOwnerApi.update(newUser);
      console.log(updateResponse);
      refreshUser(updateResponse);
      setNewUser((prev) => ({ ...prev, password: '' }));
      setRepeatedPassword('');
    } catch (err) {
      console.log(err);
      setNewUser((prev) => ({ ...prev, password: '' }));
      setRepeatedPassword('');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-md bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center">Account Settings</h2>

      <form className="flex flex-col gap-4" onSubmit={(e) => void handleSubmit(e)}>
        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => handleFieldEdit(e.target.value, 'email')}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={newUser.username}
            onChange={(e) => handleFieldEdit(e.target.value, 'username')}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => handleFieldEdit(e.target.value, 'password')}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">
            Repeat Password
          </label>
          <input
            type="password"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
