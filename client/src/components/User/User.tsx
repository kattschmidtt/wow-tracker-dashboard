import React, { createContext, useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { UserModel } from '../../Models/userModel';


const User = () => {
  
  const { user, setUser } = useContext(UserContext);
  
  return (
    <>
      {`Hello ${user.name}`}
    </>
  );
};

export default User;