import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { CatalogFilters } from "../components/catalog/CatalogFilters";
import { BookGrid } from "../components/catalog/BookGrid";
import { getLivros } from "../services/livrosService";
import { getAutores } from "../services/autoresService";
import { getCategorias } from "../services/categoriasService";
import { getPedidos } from "../services/pedidosService";
import { useAuth } from "../hooks/useAuth";

export default function CatalogPage() {
  const { user } = useAuth();
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [busca, setBusca] = useState("");
  const [autorId, setAutorId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getLivros(), getAutores(), getCategorias(), getPedidos()])
      .then(([l, a, c, p]) => {
        setLivros(l.data);
        setAutores(a.data);
        setCategorias(c.data);
        setPedidos(p.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const livrosFiltrados = livros
    .filter((l) => l.titulo.toLowerCase().includes(busca.toLowerCase()))
    .filter((l) => !autorId || l.autorId === autorId)
    .filter((l) => !categoriaId || l.categoriaId === categoriaId);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1.5rem", background: "#f8fafc" }}>
          <h2 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#1e293b" }}>Catálogo de Livros</h2>
          <CatalogFilters
            busca={busca} setBusca={setBusca}
            autorId={autorId} setAutorId={setAutorId}
            categoriaId={categoriaId} setCategoriaId={setCategoriaId}
            autores={autores} categorias={categorias}
          />
          {loading ? (
            <p style={{ color: "#6b7280" }}>Carregando...</p>
          ) : (
            <BookGrid livros={livrosFiltrados} pedidos={pedidos} user={user} />
          )}
        </main>
      </div>
    </div>
  );
}
