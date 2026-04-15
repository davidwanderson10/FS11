import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={{
      background: "#1e3a5f", color: "#fff", padding: "0 1.5rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "60px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }}>
      <Link to="/catalogo" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "1.125rem" }}>
        📚 Biblioteca
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {user && (
          <span style={{ fontSize: "0.875rem", color: "#93c5fd" }}>
            {user.username ?? user.nome} ({user.perfil})
          </span>
        )}
        <Button variant="outline" style={{ color: "#fff", borderColor: "#fff" }} onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </nav>
  );
}
