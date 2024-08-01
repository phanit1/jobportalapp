import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerScreen = () => {
  const history = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    // localStorage.removeItem('authToken');
    // Navigate to the login page
    history('/');
  };

  return (
    <div>
      <h1>Welcome, Employer</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployerScreen;
