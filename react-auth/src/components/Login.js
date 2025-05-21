import React from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../route';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            if (response.status) {
                localStorage.setItem('token', response.token);
                toast.success('User login successfully!');
                const role = response.data.role;
                console.log(role);
                
                if (role == 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/profile');
                }
            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card p-5">
                <h2 className="form-title mb-4 text-center">User Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="user-form">
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
                        <label>Password</label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Minimum 6 characters' }
                            })}
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="btn custom-submit-btn mt-3">Login</button>
                </form>

                <p className="text-center mt-5 text-white">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-info fw-semibold text-decoration-none">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
