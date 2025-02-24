import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { kyFetch } from '../../api/interceptor';
import { useAuthorization } from '../../auth/useAuthorization';
import { API_GET_ANOTHER_PROTECTED_RESOURCE, API_GET_PROTECTED_RESOURCE } from '../../consts/api';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';

const fetchProtectedData = async (setProtectedData) => {
  const response = await kyFetch(API_GET_PROTECTED_RESOURCE, {
    credentials: 'include', // Include cookies
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  setProtectedData(data);
}

const fetchAnotherProtectedData = async (setAnotherProtectedData) => {
  const response = await kyFetch(API_GET_ANOTHER_PROTECTED_RESOURCE, {
    credentials: 'include', // Include cookies
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  setAnotherProtectedData(data);
}

function ProtectedPage() {
  const [protectedData, setProtectedData] = useState(null);
  const [anotherProtectedData, setAnotherProtectedData] = useState(null);

  const { userInfo } = useAuthorization()

  useEffect(() => {
    fetchProtectedData(setProtectedData);
    fetchAnotherProtectedData(setAnotherProtectedData);
  }, [])

  return (
    <div className="page-container">
      <h1>Protected Page</h1>
      {protectedData && (
        <>
          Some protected content:
          <pre>{JSON.stringify(protectedData, null, 2)}</pre>
          <br />
        </>
      )}
      {anotherProtectedData && (
        <>
          One more protected content:
          <pre>{JSON.stringify(anotherProtectedData, null, 2)}</pre>
          <br />
        </>
      )}
      {userInfo && (
        <>
          Some user info:
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </>
      )}
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