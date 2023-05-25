import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MyRoutes } from './routes';
import { AuthProvider } from '../context/authContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

