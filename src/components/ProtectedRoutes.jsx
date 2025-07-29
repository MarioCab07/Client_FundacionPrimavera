import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loading } from "./Loading";

const ProtectedRoutes = ({ allowedRoles, fallback = "/403" }) => {
  const { user, loading, hasAnyRole } = useAuth();
  const location = useLocation();

  if (loading) return <Loading fullscreen />;

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  if (allowedRoles?.length && !hasAnyRole(allowedRoles)) {
    return <Navigate to={fallback} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
