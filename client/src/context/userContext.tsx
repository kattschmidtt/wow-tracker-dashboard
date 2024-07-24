// context/UserProvider.tsx
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { UserModel } from '../Models/userModel';
import { getCurrentISODate } from '../util/util';

/**
 * Initial user state will be grabbed from server user profile end point
 * HARDCODED FOR NOW
 */
const initialUserState: UserModel = {
  id: 1,
  name: 'Leroy Jenkins',
  pictureUrl: 'WIP',
  currentDateTime: getCurrentISODate(),
};

/**
 * We are creating a context that will allow the sharing of the 'user' state
 * and state updater 'userState'
 */
export const UserContext = createContext<{
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}>({user: initialUserState, setUser: () => {}});

interface UserProviderProps {
  children: ReactNode;
}

// Component to wrap around RouterProvider
export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserModel>(initialUserState);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
};
