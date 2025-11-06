import { useState } from 'react';
import { Link } from 'react-router-dom';

import { oauth2Api } from '../api/endpoints/public/oauth2';
import type { UserCreate } from '../api/models/user';
import ButtonComponent from '../components/GenericComponents/ButtonComponent.tsx';

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<UserCreate>({
    name: '',
    email: '',
    password: '',
  });
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  function checkPasswordStrength(pw: string): string {
    if (pw.length < 8) return 'Too short';
    let score = 0;
    if (/[a-z]/.test(pw)) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return 'Weak';
    if (score === 2 || score === 3) return 'Medium';
    if (score === 4) return 'Strong';
    return 'Weak';
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUser((user) => ({ ...user, password: val }));
    setPasswordStrength(checkPasswordStrength(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      setError('Please enter username, email and password.');
      return;
    }
    if (user.password !== repeatPassword) {
      setError('Passwords do not match.');
      return;
    }
    const strength = checkPasswordStrength(user.password);
    if (strength === 'Too short' || strength === 'Weak') {
      setError(
        'Password is too weak. Use at least 8 characters, upper and lower case, number and special character.',
      );
      return;
    }
    try {
      console.log('Registering user:', user);
      const res = await oauth2Api.ourRegister(user);
      console.log(res);
      setError('');
      alert('Registered successfully!');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Sign up
        </h2>
        <form onSubmit={void handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={user.name}
            onChange={(e) => setUser((user) => ({ ...user, name: e.target.value }))}
            className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser((user) => ({ ...user, email: e.target.value }))}
            className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          {user.password && (
            <div
              className={`text-sm mt-[-8px] mb-2 ${
                passwordStrength === 'Strong'
                  ? 'text-green-600'
                  : passwordStrength === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              Password strength: {passwordStrength}
            </div>
          )}
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />

          <Link to="/login">Already have an account?</Link>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <ButtonComponent buttonType="submit">Register</ButtonComponent>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
