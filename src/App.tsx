import { Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/useAuth.ts';
import NavBar from './components/NavBar/NavBar.tsx';
import Home from './pages/Home.tsx';
import LoginPage from './pages/Login.tsx';
import RecipePage from './pages/Recipe.tsx';
import RecipeSubmitPage from './pages/RecipeSubmitPage.tsx';
import RegisterPage from './pages/Register.tsx';
import UserProfile from './pages/UserProfile.tsx';
import UsersList from './pages/UsersList.tsx';

function App() {
  const { status } = useAuth();
  const isAuthenticated = status === 'authenticated';

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 min-h-screen">
      <NavBar />
      <main className="pt-16 absolute inset-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route
            path="/recipe/submit"
            element={isAuthenticated ? <RecipeSubmitPage /> : <LoginPage />}
          />
          <Route path="/user" element={isAuthenticated ? <UserProfile /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users_list" element={<UsersList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;