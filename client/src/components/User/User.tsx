import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';


const User = () => {
  
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.dir(user.currentDateTime)
  }, [])

  return (
    <>
      {`Hello ${user.name}`}
    </>
  );
};

export default User;