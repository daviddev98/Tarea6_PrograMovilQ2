import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { UserRole } from '../types/auth';

type AuthContextValue = {
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (selectedRole: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  // Aquí guardo el estado global de autenticación que usaré en Login y en las pantallas protegidas.
  const [role, setRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Aquí registro el rol elegido y marco la sesión como iniciada al presionar Ingresar.
  const login = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setRole(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      role,
      isAuthenticated,
      login,
      logout,
    }),
    [role, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
