import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './components/routes/Home';
import LoginPage from './components/routes/Login';
import ProtectedPage from './components/routes/Protected';
import AuthProvider from './providers/AuthProvider';

export const router = createBrowserRouter(
  createRoutes([
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="/protected-page" element={<ProtectedPage />} />
    </Route>,
    <Route path="/login" element={<LoginPage applicationName={'APIHUB Portal'} />} />,
  ]),
)

function createRoutes(routers) {
  return routers.map((router, index) => createRoutesFromElements(router, [index])).flat()
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
