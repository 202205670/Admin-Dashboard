import React, { useState } from 'react';
import './LoginForm.css';
import eyeOpen from '../../assets/images/eyeOpen.svg';
import eyeClosed from '../../assets/images/eyeClosed.svg';

const LoginForm = () => {
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
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="LoginForm">
      <div className="loginFormContainer">
        <h2>Login to Your Account</h2>
        {error && <div className="error">{error}</div>}
        <form className="loginForm" onSubmit={handleSubmit}>
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
          <div className="inputContainer">
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
              className="togglePassword"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="forgotPasswordContainer">
            <a href="#" className="forgotPasswordLink">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
