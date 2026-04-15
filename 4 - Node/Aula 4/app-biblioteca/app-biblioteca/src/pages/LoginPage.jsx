import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await login(email, senha);
      loginUser(data.token);
      navigate("/catalogo");
    } catch (err) {
      setError(err.response?.data?.error ?? "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
    }}>
      <div style={{
        background: "#fff", borderRadius: "12px", padding: "2.5rem",
        width: "100%", maxWidth: "400px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#1e3a5f" }}>📚 Biblioteca</h1>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Sistema de Gerenciamento
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              style={{ padding: "0.6rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              style={{ padding: "0.6rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem" }}
            />
          </div>

          {error && (
            <p style={{ color: "#dc2626", fontSize: "0.875rem", background: "#fee2e2", padding: "0.5rem 0.75rem", borderRadius: "6px", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px",
              padding: "0.75rem", fontSize: "1rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, marginTop: "0.5rem",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
