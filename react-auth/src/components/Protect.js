// src/routes/AdminRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUserProfile } from '../route'; // ✅ Make sure this is your correct import
import { toast } from 'react-toastify';

const Protect = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ Track loading

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
      } finally {
        setLoading(false); // ✅ Done loading
      }
    };

    getProfile();
  }, []);

  if (loading) return <div>Loading...</div>; // 🌀 While fetching data

  // ✅ Only allow admin
  if (user?.role === 'admin') {
    return children;
  } else {
    return <Navigate to="/profile" />; // ⛔ Redirect others
  }
};

export default Protect;
