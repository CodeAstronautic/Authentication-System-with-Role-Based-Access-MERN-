import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUserProfile } from '../route';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetchUserProfile();
        if (res.status) {
          setUser(res.data);
        } else {
          toast.error(res.message || 'Could not load profile');
        }
      } catch (err) {
        toast.error(err.message || 'Error fetching profile');
      }
    };

    getProfile();
  }, []);

  if (!user) {
    return (
      <div className="text-white text-center mt-5">
        <h4>Loading user profile...</h4>
      </div>
    );
  }

  return (
    <div className="user-profile-container d-flex justify-content-center align-items-center">
      <div className="profile-card text-white w-100" style={{ maxWidth: '500px' }}>
        <h2 className="form-title text-center mb-4">User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Role:</strong> <span className="text-warning">{user.role}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
