import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../image2.jpg';

const HomePage = () => {
  return (
    <div className="homepage d-flex align-items-center min-vh-100">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Column */}
          <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold text-white">Welcome Back!</h1>
            <p className="lead text-light mb-4">
              Access your profile and manage account settings with ease.
            </p>
            <Link to="/profile" className="btn profile-btn px-5 py-3">
              Go to User Profile
            </Link>
          </div>

          {/* Image Column */}
          <div className="col-lg-6 text-center">
            <img
              src={profileImage}
              alt="User"
              className="img-fluid profile-img shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
