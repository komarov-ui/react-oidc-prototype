import HomePage from './components/routes/Home';
import ProtectedPage from './components/routes/Protected';
import LoginPage from './components/routes/Login';  
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom'

export const router = createBrowserRouter(
  createRoutes([
    <Route path="/" element={<HomePage/>} />,
    <Route path="/protected-page" element={<ProtectedPage />}/>,
    <Route path="/login" element={<LoginPage applicationName={'APIHUB Portal'}/>}/>,
  ]),
)

function createRoutes(routers) {
  return routers.map((router, index) => createRoutesFromElements(router, [index])).flat()
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
