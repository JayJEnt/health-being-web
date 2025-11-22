import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";
import { oauth2Api } from '../api/endpoints/public/oauth2';
import { GoogleIcon } from '../components/Auth/GoogleIcon';


const LoginPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const response = await oauth2Api.externalLogin('google');
      const data = response as unknown as { url: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to initialize Google login', err);
      setError('Failed to initialize Google login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

		if (!email || !password) {
			setError("Please enter email and password.");
			return;
		}

		const ok = await login({ email, password });
		if (ok) {
			void navigate("/");
		} else {
			setError("Login failed. Check your credentials.");
		}
	};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
          Login to your account
        </h2>
        <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded border focus:outline-none focus:ring w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <Link to="/register">Don't have an account yet?</Link>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 rounded-xl transition"
          >
            Login
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleGoogleLogin()}
            className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition"
          >
            <GoogleIcon className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
