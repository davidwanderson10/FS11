import { useState, useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import { Button } from "../../components/ui/Button";
import { AutorTable } from "../../components/autores/AutorTable";
import { AutorForm } from "../../components/autores/AutorForm";
import { getAutores, createAutor, updateAutor, deleteAutor } from "../../services/autoresService";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => getAutores().then((r) => setAutores(r.data)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await updateAutor(editing.id, data);
    else await createAutor(data);
    load();
  };

  const handleDelete = async (autor) => {
    if (!confirm(`Excluir "${autor.nome}"?`)) return;
    try {
      await deleteAutor(autor.id);
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
            <h2 style={{ margin: 0, color: "#1e293b" }}>Autores</h2>
            <Button onClick={() => { setEditing(null); setModalOpen(true); }}>+ Novo Autor</Button>
          </div>
          {loading ? <p style={{ color: "#6b7280" }}>Carregando...</p> : (
            <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <AutorTable
                autores={autores}
                onEdit={(a) => { setEditing(a); setModalOpen(true); }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </main>
      </div>
      {modalOpen && (
        <AutorForm
          autor={editing}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
