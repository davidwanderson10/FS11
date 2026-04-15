import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";

export function PedidoForm({ pedido, livros, usuarios, onSave, onClose }) {
  const [form, setForm] = useState({
    livroId: pedido?.livro_id ?? "",
    usuarioId: pedido?.usuario_id ?? "",
    data_inicio: pedido?.data_inicio ? pedido.data_inicio.split("T")[0] : "",
    data_prevista: pedido?.data_prevista ? pedido.data_prevista.split("T")[0] : "",
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.livroId || !form.usuarioId || !form.data_inicio || !form.data_prevista) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    try {
      await onSave({ ...form, livroId: Number(form.livroId), usuarioId: Number(form.usuarioId) });
      onClose();
    } catch (e) {
      setError(e.response?.data?.error ?? "Erro ao salvar.");
    }
  };

  const selectStyle = { padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem", width: "100%" };

  return (
    <Modal title={pedido ? "Editar Pedido" : "Novo Pedido"} onClose={onClose} onConfirm={handleSave}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Livro *</label>
        <select value={form.livroId} onChange={set("livroId")} style={selectStyle}>
          <option value="">Selecione...</option>
          {livros.map((l) => <option key={l.id} value={l.id}>{l.titulo}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Usuário *</label>
        <select value={form.usuarioId} onChange={set("usuarioId")} style={selectStyle}>
          <option value="">Selecione...</option>
          {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nome} ({u.matricula})</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Input label="Data de Início *" type="date" value={form.data_inicio} onChange={set("data_inicio")} required />
        <Input label="Data Prevista *" type="date" value={form.data_prevista} onChange={set("data_prevista")} required />
      </div>
      {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
    </Modal>
  );
}
