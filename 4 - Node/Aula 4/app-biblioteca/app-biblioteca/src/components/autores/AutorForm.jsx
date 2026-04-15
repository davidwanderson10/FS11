import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";

export function AutorForm({ autor, onSave, onClose }) {
  const [nome, setNome] = useState(autor?.nome ?? "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!nome.trim()) { setError("Nome é obrigatório."); return; }
    try {
      await onSave({ nome: nome.trim() });
      onClose();
    } catch (e) {
      setError(e.response?.data?.error ?? "Erro ao salvar.");
    }
  };

  return (
    <Modal title={autor ? "Editar Autor" : "Novo Autor"} onClose={onClose} onConfirm={handleSave}>
      <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
    </Modal>
  );
}
