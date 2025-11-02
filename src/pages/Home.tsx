import { useEffect, useState } from 'react';
import Fridge from '../components/Fridge/Fridge.tsx';
import HomeCarousel from '../components/Home/HomeCarousel.tsx';
import { tokenDataApi } from '../api/endpoints/user_role/token_data.ts';
import type { User } from '../api/models/user.ts'; 

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await tokenDataApi.getUser();
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    void fetchUser();
  }, []);

  return (
    <div
      className="flex flex-col p-8
			lg:grid lg:grid-cols-2"
    >
      <div className="lg:col-start-1">
        <h1
          className="lg:text-5xl
                text-light-main-text dark:bg-dark-main-text "
        >
          Welcome, {user ? `${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}!` : ""}
        </h1>

        <div>
          <span>Favourite recipes</span>
          <HomeCarousel /** there will be api link passed down as an argument**/ />
          <span>Recently cooked</span>
          <HomeCarousel /** there will be api link passed down as an argument**/ />
          <span>From your igredients</span>
          <HomeCarousel /** there will be api link passed down as an argument**/ />
        </div>

      </div>
      <div className="ml-auto flex flex-row gap-4 items-center">
        <Fridge/>
      </div>
    </div>
  );
};

export default Home;
