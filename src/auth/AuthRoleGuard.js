// AuthRoleGuard.js
import { Navigate } from 'react-router-dom';

const AuthRoleGuard = ({ allowedRoles, userRole, children }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }
  return children;
};

export default AuthRoleGuard;
