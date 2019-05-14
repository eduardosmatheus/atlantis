import React from 'react';
import logo from './logo.svg';
import AppRouter from './modules/Router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
