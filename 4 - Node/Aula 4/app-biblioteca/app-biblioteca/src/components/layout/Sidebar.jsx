import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const linkStyle = (isActive) => ({
  display: "block",
  padding: "0.6rem 1rem",
  borderRadius: "6px",
  textDecoration: "none",
  color: isActive ? "#fff" : "#cbd5e1",
  background: isActive ? "#2563eb" : "transparent",
  fontWeight: isActive ? 600 : 400,
  fontSize: "0.875rem",
  transition: "background 0.15s",
});

export function Sidebar() {
  const { user } = useAuth();

  return (
    <aside style={{
      width: "220px", minHeight: "calc(100vh - 60px)", background: "#1e293b",
      padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem",
      flexShrink: 0,
    }}>
      <p style={{ color: "#64748b", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", padding: "0 0.5rem", marginBottom: "0.25rem" }}>
        Menu
      </p>
      <NavLink to="/catalogo" style={({ isActive }) => linkStyle(isActive)}>Catálogo</NavLink>
      <NavLink to="/historico" style={({ isActive }) => linkStyle(isActive)}>Meu Histórico</NavLink>
      <NavLink to="/alterar-senha" style={({ isActive }) => linkStyle(isActive)}>Alterar Senha</NavLink>

      {user?.perfil === "admin" && (
        <>
          <p style={{ color: "#64748b", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", padding: "0.75rem 0.5rem 0.25rem" }}>
            Administração
          </p>
          <NavLink to="/admin/livros" style={({ isActive }) => linkStyle(isActive)}>Livros</NavLink>
          <NavLink to="/admin/autores" style={({ isActive }) => linkStyle(isActive)}>Autores</NavLink>
          <NavLink to="/admin/categorias" style={({ isActive }) => linkStyle(isActive)}>Categorias</NavLink>
          <NavLink to="/admin/usuarios" style={({ isActive }) => linkStyle(isActive)}>Usuários</NavLink>
          <NavLink to="/admin/pedidos" style={({ isActive }) => linkStyle(isActive)}>Pedidos</NavLink>
        </>
      )}
    </aside>
  );
}
