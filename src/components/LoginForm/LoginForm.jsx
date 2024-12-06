import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; // Commented for now
import "./LoginForm.css";
import eyeOpen from "../../assets/images/eyeOpen.svg";
import eyeClosed from "../../assets/images/eyeClosed.svg";
import axiosInstance from "../../server/axios.instance";

const LoginForm = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Commented for now

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      try {
        const response = await axiosInstance.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // Extract token from the response
        const { token } = response.data.data;

        // Store token in localStorage
        localStorage.setItem("token", token);

        setIsAuthenticated(true);
        // Navigate to the dashboard
        navigate("/dashboard");
      } catch (err) {
        console.error("Login error:", err);
        setError("Invalid credentials. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onReCAPTCHAChange = (value) => {
    setIsVerified(!!value);
  };

  return (
    <div className="LoginForm_login">
      <div className="loginFormContainer_login">
        <h2 className="loginHeader_login">
        <span style={{ color: "#d4af37" }}>Log</span>in to your Account
        </h2>
        {error && <div className="error_login">{error}</div>}
        <form className="loginFormForm_login" onSubmit={handleSubmit}>
          <label htmlFor="email" className="label_login">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="inputField_login"
            required
          />
          <label htmlFor="password" className="label_login">
            Password
          </label>
          <div className="inputContainer_login">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="inputField_login"
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
            <a href="#" className="forgotPasswordLink_login">
              Forgot your password?
            </a>
          </div>

          <button type="submit" className="loginButton_login">
            Sign In
          </button>

          <div className="recaptchaContainer_login">
            {/* { 
            <ReCAPTCHA
              sitekey="6LfH7HEqAAAAAGTRSFbN4RNKIbTf3kPV25R8Rkd"  // Replace with your actual reCAPTCHA site key
              onChange={onReCAPTCHAChange}
            />
            } */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
