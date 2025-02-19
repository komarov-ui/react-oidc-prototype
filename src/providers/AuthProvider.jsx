import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { redirectToKeycloak } from "../auth/redirectToKeycloak";
import { AUTH_KEY, AUTH_LOADING_KEY, AUTH_ORIGIN_PAGE } from "../consts/auth";

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
  const [, setOriginPage] = useLocalStorage(AUTH_ORIGIN_PAGE)
  
  useEffect(() => {
    if (!authLoading && !auth) {
      setAuthLoading(true);
      setOriginPage(location.href)
      redirectToKeycloak();
    }
  }, [auth, authLoading, setAuthLoading, setOriginPage]);

  return (
    <AuthContexxt.Provider value={auth}>
      <SetAuthContext.Provider value={setAuth}>
        {children}
      </SetAuthContext.Provider>
    </AuthContexxt.Provider>
  );
} 
