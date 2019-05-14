import React from 'react';
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
