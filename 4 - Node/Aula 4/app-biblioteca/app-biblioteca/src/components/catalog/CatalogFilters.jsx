export function CatalogFilters({ busca, setBusca, autorId, setAutorId, categoriaId, setCategoriaId, autores, categorias }) {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 200px" }}>
        <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151" }}>Pesquisar por título</label>
        <input
          type="text"
          placeholder="Digite o título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
        <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151" }}>Autor</label>
        <select
          value={autorId}
          onChange={(e) => setAutorId(e.target.value ? Number(e.target.value) : "")}
          style={{ padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem" }}
        >
          <option value="">Todos</option>
          {autores.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: "1 1 160px" }}>
        <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151" }}>Categoria</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : "")}
          style={{ padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem" }}
        >
          <option value="">Todas</option>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
      </div>

      <button
        onClick={() => { setBusca(""); setAutorId(""); setCategoriaId(""); }}
        style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem", cursor: "pointer", background: "#f9fafb" }}
      >
        Limpar
      </button>
    </div>
  );
}
