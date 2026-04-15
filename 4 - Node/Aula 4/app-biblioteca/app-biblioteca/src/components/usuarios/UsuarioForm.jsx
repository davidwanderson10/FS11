import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";

export function UsuarioForm({ usuario, onSave, onClose }) {
  const [form, setForm] = useState({
    nome: usuario?.nome ?? "",
    matricula: usuario?.matricula ?? "",
    perfil: usuario?.perfil ?? "aluno",
    curso: usuario?.curso ?? "",
    cpf: usuario?.cpf ?? "",
    data_nascimento: usuario?.data_nascimento ? usuario.data_nascimento.split("T")[0] : "",
    email: usuario?.email ?? "",
    senha: "",
    status: usuario?.status ?? "ativo",
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.nome || !form.email || !form.cpf || !form.data_nascimento) {
      setError("Nome, email, CPF e data de nascimento são obrigatórios.");
      return;
    }
    if (!usuario && !form.senha) { setError("Senha é obrigatória para novo usuário."); return; }
    try {
      const payload = { ...form };
      if (!payload.senha) delete payload.senha;
      await onSave(payload);
      onClose();
    } catch (e) {
      setError(e.response?.data?.error ?? "Erro ao salvar.");
    }
  };

  const selectStyle = { padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "0.875rem", width: "100%" };

  return (
    <Modal title={usuario ? "Editar Usuário" : "Novo Usuário"} onClose={onClose} onConfirm={handleSave}>
      <Input label="Nome" value={form.nome} onChange={set("nome")} required />
      <Input label="Email" type="email" value={form.email} onChange={set("email")} required />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Input label="Matrícula" value={form.matricula} onChange={set("matricula")} />
        <Input label="CPF (11 dígitos)" value={form.cpf} onChange={set("cpf")} required />
        <Input label="Data de Nascimento" type="date" value={form.data_nascimento} onChange={set("data_nascimento")} required />
        <Input label="Curso" value={form.curso} onChange={set("curso")} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Perfil</label>
          <select value={form.perfil} onChange={set("perfil")} style={selectStyle}>
            <option value="aluno">aluno</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>Status</label>
          <select value={form.status} onChange={set("status")} style={selectStyle}>
            <option value="ativo">ativo</option>
            <option value="inativo">inativo</option>
          </select>
        </div>
      </div>
      <Input label={usuario ? "Nova Senha (deixe em branco para manter)" : "Senha"} type="password" value={form.senha} onChange={set("senha")} required={!usuario} />
      {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", margin: 0 }}>{error}</p>}
    </Modal>
  );
}
