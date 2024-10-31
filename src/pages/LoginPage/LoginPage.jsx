import React from 'react';
import './LoginPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginImage from '../../assets/images/LoginImage.svg';
import Logo from '../../assets/images/1.jpg';

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <div className="imgContainer">
        <img src={LoginImage} alt="Login Illustration" />
        <img src={Logo} alt="Logo" />
      </div>
      <div className="loginFormContainer">
        <div className="logo">
        
        </div>
        <LoginForm />
      </div>
      
      {/* Footer added here */}
      <div className="footer">
        &copy; 2023 Gold Tiger Logistics Solutions
      </div>
    </div>
  );
};

export default LoginPage;
