import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './routes/Home.jsx';
import Tikets from './routes/Tikets.jsx';
import TiketDetails from './routes/TiketDetails.jsx';
import ErrorPage from './error-page.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx'
import Cookies from 'js-cookie';
import './utils/i18n.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const isAuthenticated = () => {
  const SESSION_DATA = Cookies.get('SESSION_DATA');
  return SESSION_DATA !== undefined && SESSION_DATA !== 'undefined';
};

const PrivateRoute = ({ element, path }) => {
  if (path === '/') {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return null;
    }
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<App />} path='/'/>,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/tikets', element: <Tikets /> },
      { path: '/tikets/:id', element: <TiketDetails /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
