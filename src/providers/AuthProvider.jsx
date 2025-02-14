import { createContext, useContext, useState, useEffect } from "react";
import keycloak from "../auth/keycloak";

const AuthContexxt = createContext(false);
const SetAuthContext = createContext(() => { });

export function useAuth() {
  return useContext(AuthContexxt);
}

export function useSetAuth() {
  return useContext(SetAuthContext);
}

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.onAuthSuccess = () => {
        setIsAuthenticated(true);
      };
      keycloak.onAuthError = () => {
        setIsAuthenticated(false);
      };
      keycloak.onAuthRefreshError = () => {
        setIsAuthenticated(false);
      };
      keycloak.onAuthLogout = () => {
        setIsAuthenticated(false);
      };
      keycloak.onAuthRefresh = () => {
        setIsAuthenticated(true);
      };
    }
  }, []);

  return (
    <AuthContexxt.Provider value={isAuthenticated}>
      <SetAuthContext.Provider value={setIsAuthenticated}>
        {children}
      </SetAuthContext.Provider>
    </AuthContexxt.Provider>
  );
} 
