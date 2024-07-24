import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { UserModel } from '../../Models/userModel';


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