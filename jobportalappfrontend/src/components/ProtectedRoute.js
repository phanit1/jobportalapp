import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect to login if not authenticated
    const userData = localStorage.getItem('userData');
    console.log(userData);
    // return <Navigate to="/" state={{ from: location }} />;
  }

  if (roles && !roles.includes(auth.role)) {
    const userData = JSON.parse(localStorage.getItem('userData'));

    // console.log(JSON.parse(userData), "userdata");
    alert("You do not have permission to view this page.")
    // Redirect to unauthorized if role is not allowed
    console.log(`/${userData.data.roleType}`)
    const redirectTo = `/${userData.data.roleType}`;
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
