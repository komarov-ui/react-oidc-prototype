import { FC } from "react";
import { logout } from "../../auth/redirectToKeycloak";

export const ButtonLogout: FC = () => {
  return (
    <button className="button" onClick={logout}>
      Logout
    </button>
  );
}
