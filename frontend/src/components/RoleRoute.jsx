import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allow = [] }) => {
  const { user } = useAuth();
  if (!user) return null; // o un loader
  if (!allow.includes(user.rol)) return <Navigate to="/" replace />;
  return <Outlet />;
};
export default RoleRoute;
