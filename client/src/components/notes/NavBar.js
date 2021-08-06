import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../images/notes.png';

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
    toast.dark('✔️ Logout Successful', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      {/* <ToastContainer /> */}
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
          <button className='logout' onClick={logoutSubmit}>
            <Link to='/'>Logout</Link>
          </button>
        </ul>
      </header>
    </>
  );
}
