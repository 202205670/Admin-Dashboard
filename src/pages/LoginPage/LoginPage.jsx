import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './LoginPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginImage from '../../assets/images/LoginImage.svg';
import Logo from '../../assets/images/1.jpg';

const LoginPage = (props) => {
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      navigate('/dashboard'); // Navigate to /dashboard if token is present
    }
  }, [navigate]); // Add navigate to the dependency array

  return (
    <div className="LoginPage">
      <div className="imgContainer">
        <img src={LoginImage} alt="Login Illustration" />
        <img src={Logo} alt="Logo" />
      </div>
      <div className="loginFormContainer">
        <div className="logo">
          {/* You can add logo image or any other element here if needed */}
        </div>
        <LoginForm setIsAuthenticated={props.setIsAuthenticated} />
      </div>
      
      {/* Footer added here */}
      <div className="footer">
        &copy; 2023 Gold Tiger Logistics Solutions
      </div>
    </div>
  );
};

export default LoginPage;
