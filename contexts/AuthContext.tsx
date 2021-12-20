import { createContext, ReactNode } from 'react';

interface AuthCredentialsData {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: AuthCredentialsData) => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const isAuthenticated = false;

  async function signIn(credentials: AuthCredentialsData) {
    console.log(credentials);
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
