import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../route';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const response = await registerUser(data);
//       toast.success('User registered successfully!');
//       navigate('/profile');
//     } catch (error) {
//       console.error('Registration error:', error);
//       const errorMessage = error.response?.data?.message || 'Registration failed';
//       toast.error(errorMessage);
//     }
//   };


const onSubmit = async (formData) => {
  try {
    const response = await registerUser(formData);

     if (response.data.role === 'admin') {
      navigate('/admin'); // 🧭 Replace with your actual admin route
    } else {
      navigate('/'); // 🧭 Replace with your user profile route
    }
  } catch (err) {
    console.error('Registration error:', err);
  }
};


  return (
    <div className="login-page">
      <div className="login-card p-5">
        <h2 className="form-title mb-4 text-center">User Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">

          <div className="form-group mb-4">
            <label>Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="form-group mb-4">
            <label>Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="form-group mb-4">
            <label>Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              defaultValue=""
              className="form-control"
            >
              <option value="" disabled>Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="error-text">{errors.role.message}</p>}
          </div>

          <div className="form-group mb-4">
            <label>Age</label>
            <input
              {...register('age', {
                required: 'Age is required',
                min: { value: 1, message: 'Minimum age is 1' },
                max: { value: 120, message: 'Maximum age is 120' }
              })}
              type="number"
              className="form-control"
              placeholder="Enter your age"
            />
            {errors.age && <p className="error-text">{errors.age.message}</p>}
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              type="password"
              className="form-control"
              placeholder="Create a password"
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn custom-submit-btn mt-3">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
