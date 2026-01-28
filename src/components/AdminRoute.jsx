import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { role } = useAuth();
  if (role !== "admin") return <Navigate to="/" replace />;
  return children;
};

export default AdminRoute;
