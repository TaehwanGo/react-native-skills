import React from 'react';

interface User {
  id: number;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  setUser(user: User): void;
}

export const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = React.useContext(AuthContext);
  if (!auth) {
    // 안전하게 Context를 사용하기 위해, Provider가 없는 경우에는 에러를 발생시킵니다.
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return auth;
}
