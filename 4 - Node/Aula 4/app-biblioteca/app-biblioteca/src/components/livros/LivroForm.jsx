import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";

export function LivroForm({ livro, autores, categorias, onSave, onClose }) {
  const [form, setForm] = useState({
    titulo: livro?.titulo ?? "",
    autorId: livro?.autorId ?? "",
    categoriaId: livro?.categoriaId ?? "",
    descricao: livro?.descricao ?? "",
    edicao: livro?.edicao ?? "",
    idioma: livro?.idioma ?? "",
    num_paginas: livro?.num_paginas ?? "",
    editora: livro?.editora ?? "",
    estoque: livro?.estoque ?? "",
    data_publicacao: livro?.data_publicacao ? livro.data_publicacao.split("T")[0] : "",
  });
  const [imgFile, setImgFile] = useState(null);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.titulo || !form.autorId || !form.categoriaId) {
      setError("Título, autor e categoria são obrigatórios.");
      return;
    }
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (v !== "") fd.append(k, v); });
      if (imgFile) fd.append("img", imgFile);
      await onSave(fd);
      onClose();
    } catch (e) {
      setError(e.response?.data?.error ?? "Erro ao salvar.");
    }
  };

  const selectStyle = { padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem", width: "100%" };

  return (
    <Modal title={livro ? "Editar Livro" : "Novo Livro"} onClose={onClose} onConfirm={handleSave}>
      <Input label="Título" value={form.titulo} onChange={set("titulo")} required />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Autor <span style={{ color: "#dc2626" }}>*</span></label>
        <select value={form.autorId} onChange={set("autorId")} style={selectStyle}>
          <option value="">Selecione...</option>
          {autores.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Categoria <span style={{ color: "#dc2626" }}>*</span></label>
        <select value={form.categoriaId} onChange={set("categoriaId")} style={selectStyle}>
          <option value="">Selecione...</option>
          {categorias.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
      </div>

      <Input label="Descrição" value={form.descricao} onChange={set("descricao")} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Input label="Edição" value={form.edicao} onChange={set("edicao")} />
        <Input label="Idioma" value={form.idioma} onChange={set("idioma")} />
        <Input label="Nº de Páginas" type="number" value={form.num_paginas} onChange={set("num_paginas")} />
        <Input label="Editora" value={form.editora} onChange={set("editora")} />
        <Input label="Estoque" type="number" value={form.estoque} onChange={set("estoque")} />
        <Input label="Data de Publicação" type="date" value={form.data_publicacao} onChange={set("data_publicacao")} />
      </div>

      <Input label="Imagem (JPEG/PNG/GIF/WEBP, máx 5MB)" type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files[0])} />

      {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
    </Modal>
  );
}
