import { FC } from "react";
import { keycloakLogout } from "../../auth/redirects";

export const ButtonLogout: FC = () => {
  return (
    <button className="button" onClick={keycloakLogout}>
      Logout
    </button>
  );
}
