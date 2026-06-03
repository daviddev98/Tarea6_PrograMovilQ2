import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { UserRole } from '../types/auth';

export type { UserRole } from '../types/auth';

export type AuthContextValue = {
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCommon: boolean;
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
  const login = useCallback((selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  }, []);

  // Aquí cierro la sesión y limpio el rol para volver a Login.
  const logout = useCallback(() => {
    setRole(null);
    setIsAuthenticated(false);
  }, []);

  const isAdmin = role === 'admin';
  const isCommon = role === 'common';

  const value = useMemo(
    () => ({
      role,
      isAuthenticated,
      isAdmin,
      isCommon,
      login,
      logout,
    }),
    [role, isAuthenticated, isAdmin, isCommon, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// Aquí expongo el hook para leer el contexto desde cualquier pantalla o navegador.
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
