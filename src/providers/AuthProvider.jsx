import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../auth/keycloak";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../consts/auth";

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
    if (keycloak.authenticated) {
      return;
    }

    keycloak.onAuthSuccess = () => {
      setIsAuthenticated(true);
      sessionStorage.setItem(ACCESS_TOKEN_KEY, keycloak.token);
      sessionStorage.setItem(REFRESH_TOKEN_KEY, keycloak.refreshToken);
    };
    keycloak.onAuthError = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    };
    keycloak.onAuthRefreshSuccess = () => {
      setIsAuthenticated(true);
      sessionStorage.setItem(ACCESS_TOKEN_KEY, keycloak.token);
      sessionStorage.setItem(REFRESH_TOKEN_KEY, keycloak.refreshToken);
    };
    keycloak.onAuthRefreshError = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    };
    keycloak.onAuthLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    };
  }, []);

  return (
    <AuthContexxt.Provider value={isAuthenticated}>
      <SetAuthContext.Provider value={setIsAuthenticated}>
        {children}
      </SetAuthContext.Provider>
    </AuthContexxt.Provider>
  );
} 
