import { useState, useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import { Button } from "../../components/ui/Button";
import { CategoriaTable } from "../../components/categorias/CategoriaTable";
import { CategoriaForm } from "../../components/categorias/CategoriaForm";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../../services/categoriasService";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => getCategorias().then((r) => setCategorias(r.data)).finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await updateCategoria(editing.id, data);
    else await createCategoria(data);
    load();
  };

  const handleDelete = async (cat) => {
    if (!confirm(`Excluir "${cat.nome}"?`)) return;
    try {
      await deleteCategoria(cat.id);
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
            <h2 style={{ margin: 0, color: "#1e293b" }}>Categorias</h2>
            <Button onClick={() => { setEditing(null); setModalOpen(true); }}>+ Nova Categoria</Button>
          </div>
          {loading ? <p style={{ color: "#6b7280" }}>Carregando...</p> : (
            <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <CategoriaTable
                categorias={categorias}
                onEdit={(c) => { setEditing(c); setModalOpen(true); }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </main>
      </div>
      {modalOpen && (
        <CategoriaForm
          categoria={editing}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
