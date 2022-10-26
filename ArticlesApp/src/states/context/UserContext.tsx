import React, {createContext, useContext} from 'react';
import {User} from '../../types/api';

// 튜플
type UserContextState = [User | null, (user: User | null) => void];

const UserContext = createContext<UserContextState | null>(null);

export function UserContextProvider({children}: {children: React.ReactNode}) {
  const userState = React.useState<User | null>(null);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export function useUserState() {
  const userState = useContext(UserContext);
  if (!userState) {
    throw new Error('Cannot find UserProvider');
  }
  return userState;
}
