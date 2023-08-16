import React from "react";
import useAuth from "../../hooks/useAuth";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ accessRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();
  const content = roles.some((role) => accessRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  return content;
};

export default RequireAuth;
