import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation
import InputField from '../components/InputField';
// import './LoginPage.css';

const LoginPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    role: '' // Adding role state to store the selected role
  });

  const navigate = useNavigate();  // Initialize useNavigate hook

  // Handle input changes for username, password, and role
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleLogin = () => {
    if (loginDetails.role === '') {
      alert('Please select a role before logging in.');
      return;
    }

    // Route based on the selected role
    if (loginDetails.role === 'admin') {
      
      navigate('/admin/status');  // Redirect to Admin page
    } else if (loginDetails.role === 'student') {
      navigate('/student');  // Redirect to Student page
    }
  };

  return (
    <div className="login-page">
      <h2>Login to Hostel Management</h2>

      <InputField
        label="Username"
        name="username"
        value={loginDetails.username}
        onChange={handleInputChange}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={loginDetails.password}
        onChange={handleInputChange}
      />

      <div className="role-selection">
        <label htmlFor="role">Select Role</label>
        <select
          id="role"
          name="role"
          value={loginDetails.role}
          onChange={handleInputChange}
        >
          <option value="" disabled>Select a role</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
      </div>

      <button onClick={handleLogin} className="login-btn">Login</button>
    </div>
  );
};

export default LoginPage;
