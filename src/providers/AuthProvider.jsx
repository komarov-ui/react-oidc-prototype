import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { redirectToKeycloak } from "../auth/redirectToKeycloak";
import { LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE, LOCAL_STORAGE_KEY_USER_INFO } from "../consts/auth";

// FIXME 20.02.25 // Configure TypeScript
// eslint-disable-next-line
export default function AuthProvider({ children }) {
  const [userInfo] = useLocalStorage(LOCAL_STORAGE_KEY_USER_INFO);
  const [, setAuthOriginPage] = useLocalStorage(LOCAL_STORAGE_KEY_AUTH_ORIGIN_PAGE)

  useEffect(() => {
    if (!userInfo) {
      setAuthOriginPage(location.href)
      redirectToKeycloak();
    }
  }, [userInfo, setAuthOriginPage]);

  return <>{children}</>;
} 
