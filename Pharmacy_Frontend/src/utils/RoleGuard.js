import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import TokenHandler from "./TokenHandler";

const RoleGuard = ({ children, allowedRoles, redirectTo }) => {
  const location = useLocation();
  const token = TokenHandler.getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const userRole = payload.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo || "/unauthorized"} replace />;
  }

  return children;
};

export default RoleGuard;
