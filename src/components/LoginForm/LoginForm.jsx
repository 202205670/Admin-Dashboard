
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginForm.css';
import eyeOpen from '../../assets/images/eyeOpen.svg';
import eyeClosed from '../../assets/images/eyeClosed.svg';

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
    } else {
      setError('');
      console.log('Form Submitted', formData);
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="LoginForm_login">
      <div className="loginFormContainer_login">
        <h2>Login to Your Account</h2>
        {error && <div className="error_login">{error}</div>}
        <form className="loginFormForm_login" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <div className="inputContainer_login">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="Toggle Password Visibility"
              className="togglePassword_login"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="forgotPasswordContainer_login">
            <a href="#" className="forgotPasswordLink_login">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
