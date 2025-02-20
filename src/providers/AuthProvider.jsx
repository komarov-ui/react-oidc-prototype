import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { redirectToKeycloak } from "../auth/redirectToKeycloak";
import { AUTH_KEY, AUTH_LOADING_KEY, AUTH_ORIGIN_PAGE } from "../consts/auth";

export default function AuthProvider({ children }) {
  const [authData] = useLocalStorage(AUTH_KEY);
  const [authLoading, setAuthLoading] = useLocalStorage(AUTH_LOADING_KEY)
  const [, setOriginPage] = useLocalStorage(AUTH_ORIGIN_PAGE)

  useEffect(() => {
    if (!authLoading && !authData) {
      setAuthLoading(true);
      setOriginPage(location.href)
      redirectToKeycloak();
    }
  }, [authData, authLoading, setAuthLoading, setOriginPage]);

  return <>{children}</>;
} 
