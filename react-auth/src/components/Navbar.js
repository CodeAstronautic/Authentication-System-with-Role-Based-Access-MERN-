import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem('token');
            navigate('/login');
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <nav className="navbar custom-navbar mb-2 py-3">
      <div className="container d-flex justify-content-between align-items-center px-3">
        <Link className="navbar-brand" to="/">
          Dashboard
        </Link>
        {isLoggedIn ? (
          <button className="btn nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn nav-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
