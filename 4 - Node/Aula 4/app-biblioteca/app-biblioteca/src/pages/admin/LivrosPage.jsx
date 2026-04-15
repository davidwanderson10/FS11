import { useState, useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import { Button } from "../../components/ui/Button";
import { LivroTable } from "../../components/livros/LivroTable";
import { LivroForm } from "../../components/livros/LivroForm";
import { getLivros, createLivro, updateLivro, deleteLivro } from "../../services/livrosService";
import { getAutores } from "../../services/autoresService";
import { getCategorias } from "../../services/categoriasService";

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () =>
    Promise.all([getLivros(), getAutores(), getCategorias()])
      .then(([l, a, c]) => { setLivros(l.data); setAutores(a.data); setCategorias(c.data); })
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleSave = async (formData) => {
    if (editing) await updateLivro(editing.id, formData);
    else await createLivro(formData);
    load();
  };

  const handleDelete = async (livro) => {
    if (!confirm(`Excluir "${livro.titulo}"?`)) return;
    try {
      await deleteLivro(livro.id);
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
            <h2 style={{ margin: 0, color: "#1e293b" }}>Livros</h2>
            <Button onClick={() => { setEditing(null); setModalOpen(true); }}>+ Novo Livro</Button>
          </div>
          {loading ? <p style={{ color: "#6b7280" }}>Carregando...</p> : (
            <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <LivroTable
                livros={livros}
                onEdit={(l) => { setEditing(l); setModalOpen(true); }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </main>
      </div>
      {modalOpen && (
        <LivroForm
          livro={editing}
          autores={autores}
          categorias={categorias}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
