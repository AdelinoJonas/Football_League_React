import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Suspense } from 'react';

const Login = React.lazy(async () => import('../pages/Login').then((m) => ({ default: m.Login })));
const Home = React.lazy(async () => import('../pages/Home').then((m) => ({ default: m.Home })));

function ProtectedRoute({ element: Element, redirectTo }) {
  const { apiKey } = useContext(AuthContext);

  return apiKey ? <Outlet /> : <Navigate to={redirectTo} />;
}

export function MyRoutes() {
  const { setApiKey, apiKey, isValidKey, setIsValidKey } = useContext(AuthContext);

  useEffect(() => {
    const apiKeyFromLocalStorage = localStorage.getItem('apiKey');
    if (apiKeyFromLocalStorage) {
      setApiKey(apiKeyFromLocalStorage);
    }
  }, [isValidKey]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProtectedRoute element={<Home />} redirectTo="/login" />
          </Suspense>
        }
      />
    </Routes>
  );
}