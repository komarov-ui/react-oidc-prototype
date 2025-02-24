import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './components/routes/HomePage';
import LoginPage from './components/routes/LoginPage';
import LogoutPage from './components/routes/LogoutPage';
import ProtectedPage from './components/routes/ProtectedPage';
// import AuthProvider from './providers/AuthProvider';

export const router = createBrowserRouter(
  createRoutes([
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="/protected-page" element={<ProtectedPage />} />
    </Route>,
    <Route path="/login" element={<LoginPage applicationName='APIHUB Portal' />} />,
    <Route path="/logout" element={<LogoutPage applicationName='APIHUB Portal' />} />,
  ]),
)

function createRoutes(routers) {
  return routers.map((router, index) => createRoutesFromElements(router, [index])).flat()
}

function App() {
  return <RouterProvider router={router} />;
  // return (
  //   <AuthProvider>
  //     <RouterProvider router={router} />
  //   </AuthProvider>
  // );
}

export default App
