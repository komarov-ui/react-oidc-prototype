import { NavLink } from 'react-router-dom';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';
import { useEffect, useState } from 'react';
import { API_GET_PROTECTED_RESOURCE } from '../../consts/api';
import { useAuthorization } from '../../auth/useAuthorization';
import { kyFetch } from '../../api/interceptor';

function ProtectedPage() {
  const [protectedData, setProtectedData] = useState(null);

  const { userInfo } = useAuthorization()

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await kyFetch(API_GET_PROTECTED_RESOURCE, {
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProtectedData(data);
    }

    fetchProtectedData();
  }, [])

  return (
    <div className="page-container">
      <h1>Protected Page</h1>
      Some protected content:
      {protectedData && <pre>{JSON.stringify(protectedData, null, 2)}</pre>}
      <br />
      Some user info:
      {userInfo && <pre>{JSON.stringify(userInfo, null, 2)}</pre>}
      <NavBar>
        <NavLink className="button" to="/">
          Home
        </NavLink>
        <ButtonLogout />
      </NavBar>
    </div>
  );
}

export default ProtectedPage