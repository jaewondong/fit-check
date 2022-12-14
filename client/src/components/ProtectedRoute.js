import React from 'react';

import { Navigate } from 'react-router-dom'


export const useAuth = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return true;
  } else {
    return false;
  }
  
}

const ProtectedRoute = ({ children }) => {

  const auth = useAuth();
  //const navigate = useNavigate();

  //Checks if the user is autenthicated.
  return auth? children : <Navigate to="/login" />
}

export default ProtectedRoute;