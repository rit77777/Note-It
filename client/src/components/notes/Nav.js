import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/notes.png';

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className='logo'>
        <img className='img' src={logo} alt='logo'></img>
        <h2>
          <Link to='/'>Note it</Link>
        </h2>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/create'>Create Note</Link>
        </li>
        <li onClick={logoutSubmit}>
          <Link to='/'>Logout</Link>
        </li>
      </ul>
    </header>
  );
}
