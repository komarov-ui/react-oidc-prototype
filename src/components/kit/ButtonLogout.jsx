import keycloak from "../../auth/keycloak";

export default function ButtonLogout() {
  return (
    <button className="button" onClick={() => keycloak.logout()}>
      Logout
    </button>
  );
}
