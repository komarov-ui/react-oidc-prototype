import { logout } from "../../auth/redirectToKeycloak";

export default function ButtonLogout() {
  return (
    <button className="button" onClick={logout}>
      Logout
    </button>
  );
}
