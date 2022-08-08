import React from 'react';

import { Navigate } from 'react-router-dom'


export const useAuth = () => {
  const outfit = localStorage.getItem('outfit');

  if (outfit) {
    return true;
  } else {
    return false;
  }
  
}

const ProtectedRouteGuest = ({ children }) => {

  const auth = useAuth();
  //const navigate = useNavigate();

  //Checks if the user is autenthicated.
  return auth? children : <Navigate to="/" />
}

export default ProtectedRouteGuest;