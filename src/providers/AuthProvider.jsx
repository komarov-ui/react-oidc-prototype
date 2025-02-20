import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { redirectToKeycloak } from "../auth/redirectToKeycloak";
import { LOCAL_STORAGE_KEY_USER_INFO, LOCAL_STORAGE_KEY_AUTH_LOADING, LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE } from "../consts/auth";

export default function AuthProvider({ children }) {
  const [userInfo] = useLocalStorage(LOCAL_STORAGE_KEY_USER_INFO);
  const [authLoading, setAuthLoading] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_LOADING)
  const [, setAuthOriginPage] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE)

  useEffect(() => {
    if (!authLoading && !userInfo) {
      setAuthLoading(true);
      setAuthOriginPage(location.href)
      redirectToKeycloak();
    }
  }, [userInfo, authLoading, setAuthLoading, setAuthOriginPage]);

  return <>{children}</>;
} 
