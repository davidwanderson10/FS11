import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { updateUsuario } from "../services/usuariosService";
import { useAuth } from "../hooks/useAuth";

export default function AlterarSenhaPage() {
  const { user } = useAuth();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setError("");
    if (novaSenha !== confirmar) { setError("As senhas não coincidem."); return; }
    if (novaSenha.length < 6) { setError("A senha deve ter pelo menos 6 caracteres."); return; }
    setLoading(true);
    try {
      await updateUsuario(user.userId, { senha: novaSenha });
      setMsg("Senha alterada com sucesso!");
      setNovaSenha("");
      setConfirmar("");
    } catch (err) {
      setError(err.response?.data?.error ?? "Erro ao alterar senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1.5rem", background: "#f8fafc" }}>
          <h2 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#1e293b" }}>Alterar Senha</h2>
          <div style={{ background: "#fff", borderRadius: "8px", padding: "2rem", maxWidth: "400px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Input label="Nova Senha" type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required />
              <Input label="Confirmar Nova Senha" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
              {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
              {msg && <p style={{ color: "#166534", fontSize: "0.875rem", margin: 0, background: "#dcfce7", padding: "0.5rem 0.75rem", borderRadius: "6px" }}>{msg}</p>}
              <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Alterar Senha"}</Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
