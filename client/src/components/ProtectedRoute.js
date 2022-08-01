import React from 'react';

import { Navigate } from 'react-router-dom'


const useAuth= () => {
  const user = localStorage.getItem('user');

  if (user) {
    return true;
  } else {
    return false;
  }
}

const ProtectedRoutes = ({ children }) => {

  const auth = useAuth();
  //const navigate = useNavigate();

  //Checks if the user is autenthicated.
  return auth? children : <Navigate to="/login" />

}

export default ProtectedRoutes;