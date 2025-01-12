

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";
import Login from "../pages/LoginPage";

AuthGuard.propTypes = {
  children: PropTypes.node,
};



export default function AuthGuard({ children }) {
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);  // Tracks initialization
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);  // Set true if token exists, false otherwise
    setIsInitialized(true);  // Mark as initialized after token check
  }, []);

  if (!isInitialized) {
    return <LoadingScreen />;  // Show loading screen during initialization
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
