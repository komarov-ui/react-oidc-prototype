import { NavLink } from 'react-router-dom';
import ButtonLogout from '../kit/ButtonLogout';
import NavBar from '../kit/NavBar';
import { useEffect, useState } from 'react';
import { API_GET_PROTECTED_RESOURCE } from '../../consts/api';

function ProtectedPage() {
  const [protectedData, setProtectedData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch(API_GET_PROTECTED_RESOURCE, {
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
      {protectedData && <div>{JSON.stringify(protectedData)}</div>}
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