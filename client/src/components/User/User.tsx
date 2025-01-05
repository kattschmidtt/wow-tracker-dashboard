import { useEffect } from 'react';
import { useUser } from '../../context/userContext';


const User = () => {
  const { fetchUserProfile, user, isLoggedIn } = useUser();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>Welcome, {user?.battletag || 'User'}!</div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};

export default User;