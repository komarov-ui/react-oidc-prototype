import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { kyFetch } from '../../api/interceptor';
import { useAuthorization } from '../../auth/useAuthorization';
import { API_GET_ANOTHER_PROTECTED_RESOURCE, API_GET_PROTECTED_RESOURCE } from '../../consts/api';
import { NavBar } from '../kit/NavBar';
import { ButtonLogout } from '../kit/ButtonLogout';

const fetchProtectedData = async (setProtectedData: Dispatch<SetStateAction<unknown>>) => {
  const response = await kyFetch(API_GET_PROTECTED_RESOURCE, {
    credentials: 'include', // Include cookies
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  setProtectedData(data);
}

const fetchAnotherProtectedData = async (setAnotherProtectedData: Dispatch<SetStateAction<unknown>>) => {
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
  const [protectedData, setProtectedData] = useState<unknown>(null);
  const [anotherProtectedData, setAnotherProtectedData] = useState<unknown>(null);

  const { userInfo } = useAuthorization()

  useEffect(() => {
    fetchProtectedData(setProtectedData);
    fetchAnotherProtectedData(setAnotherProtectedData);
  }, [])

  return (
    <div className="page-container">
      <h1>Protected Page</h1>
      {!!protectedData && (
        <>
          Some protected content:
          <pre>{JSON.stringify(protectedData, null, 2)}</pre>
          <br />
        </>
      )}
      {!!anotherProtectedData && (
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