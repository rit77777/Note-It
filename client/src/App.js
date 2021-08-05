import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Notes from './components/Notes';

import api from './api/api';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const verified = await api.get('/users/verify', {
          headers: { Authorization: token },
        });
        setIsLogin(verified.data);
        if (verified.data === false) { 
          return localStorage.clear();
        }
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default App;
