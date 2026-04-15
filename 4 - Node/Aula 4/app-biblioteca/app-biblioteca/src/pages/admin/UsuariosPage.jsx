import { useState, useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import { Button } from "../../components/ui/Button";
import { UsuarioTable } from "../../components/usuarios/UsuarioTable";
import { UsuarioForm } from "../../components/usuarios/UsuarioForm";
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from "../../services/usuariosService";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => getUsuarios().then((r) => setUsuarios(r.data)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await updateUsuario(editing.id, data);
    else await createUsuario(data);
    load();
  };

  const handleDelete = async (usuario) => {
    if (!confirm(`Excluir usuário "${usuario.nome}"?`)) return;
    try {
      await deleteUsuario(usuario.id);
      load();
    } catch (e) {
      alert(e.response?.data?.error ?? "Erro ao excluir.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1.5rem", background: "#f8fafc" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ margin: 0, color: "#1e293b" }}>Usuários</h2>
            <Button onClick={() => { setEditing(null); setModalOpen(true); }}>+ Novo Usuário</Button>
          </div>
          {loading ? <p style={{ color: "#6b7280" }}>Carregando...</p> : (
            <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <UsuarioTable
                usuarios={usuarios}
                onEdit={(u) => { setEditing(u); setModalOpen(true); }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </main>
      </div>
      {modalOpen && (
        <UsuarioForm
          usuario={editing}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
