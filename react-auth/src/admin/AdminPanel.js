import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../route';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAllUsers();
        if (response.status) {
          setUsers(response.data);
        } else {
          toast.error(response.message || 'Failed to fetch users');
        }
      } catch (error) {
        toast.error('Error fetching users');
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="user-profile-container space">
      <div className="form-container text-white">
        <h2 className="form-title text-center">Admin Panel - All Users</h2>

        <div className="table-responsive mt-4">
          <table className="table table-dark table-hover table-bordered text-white rounded-3 overflow-hidden">
            <thead style={{ backgroundColor: '#2b2c4b' }}>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td className={user.role === 'admin' ? 'text-warning' : 'text-info'}>
                      {user.role}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
