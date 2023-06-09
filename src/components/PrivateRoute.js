import React from "react";
import { Navigate,  } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute  ({ children})  {
  const authContext = useAuth();

  const isAuthenticated = authContext.currentUser !== null;
      
  if (isAuthenticated ) {
    return children
  }
    
  return <Navigate to="/login" />
}