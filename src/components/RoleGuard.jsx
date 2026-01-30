import { Navigate } from "react-router-dom";
import { can } from "../utils/permissions";
import { useAuth } from "../context/AuthContext";

const RoleGuard = ({ action, children }) => {
  const { user } = useAuth();

  if (!can(user.role, action)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleGuard;
