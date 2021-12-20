import Router from 'next/router';
import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/api';

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

interface AuthCredentialsData {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: AuthCredentialsData) => Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: AuthCredentialsData) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });

      Router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
