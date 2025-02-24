import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './components/routes/HomePage';
import LoginPage from './components/routes/LoginPage';
import ProtectedPage from './components/routes/ProtectedPage';

export const router = createBrowserRouter(
  createRoutes([
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="/protected-page" element={<ProtectedPage />} />
    </Route>,
    <Route path="/login" element={<LoginPage applicationName='APIHUB Portal' />} />,
  ]),
)

function createRoutes(routers) {
  return routers.map((router, index) => createRoutesFromElements(router, [index])).flat()
}

function App() {
  return <RouterProvider router={router} />;
}

export default App
