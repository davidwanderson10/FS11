import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: "2rem" }}>Carregando...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.perfil !== "admin") return <Navigate to="/catalogo" replace />;

  return children;
}
