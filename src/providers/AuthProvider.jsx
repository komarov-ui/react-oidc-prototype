import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { redirectToKeycloak } from "../auth/redirectToKeycloak";
import { AUTH_KEY, AUTH_LOADING_KEY } from "../consts/auth";

const AuthContexxt = createContext(false);
const SetAuthContext = createContext(() => { });

export function useAuth() {
  return useContext(AuthContexxt);
}

export function useSetAuth() {
  return useContext(SetAuthContext);
}

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage(AUTH_KEY);
  const [authLoading, setAuthLoading] = useLocalStorage(AUTH_LOADING_KEY)
  
  useEffect(() => {
    if (!authLoading && !auth) {
      setAuthLoading(true);
      redirectToKeycloak();
    }
  }, [auth, authLoading, setAuthLoading]);

  return (
    <AuthContexxt.Provider value={auth}>
      <SetAuthContext.Provider value={setAuth}>
        {children}
      </SetAuthContext.Provider>
    </AuthContexxt.Provider>
  );
} 
