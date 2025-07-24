import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loading } from "./Loading";
import { ROLES } from "../constants/constants";

const DASH_ROLES = [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.GERENTE];

const PublicRoute = ({ children }) => {
  const { user, loading, hasAnyRole } = useAuth();

  if (loading) return <Loading fullscreen />;

  if (user) {
    // Ajusta destino según tus roles
    if (hasAnyRole(DASH_ROLES)) return <Navigate to="/Dashboard" replace />;
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default PublicRoute;
