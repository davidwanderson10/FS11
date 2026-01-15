import { useState } from "react";

export default function AddVehicleModal({ onClose, onAdd }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Manutenção");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ nome, descricao, status });
    onClose();
    setNome(""); setDescricao(""); setStatus("Manutenção");
  }

  return (
    <div style={{
      position:'fixed', top:0, left:0, width:'100vw', height:'100vh',
      background:'#000a', display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      <form onSubmit={handleSubmit} style={{
        background:'#232b3e', padding:'32px', borderRadius:'16px', minWidth:'320px'
      }}>
        <h2>Novo Equipamento</h2>
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} required style={{width:'100%',marginBottom:'12px'}} />
        <input placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} required style={{width:'100%',marginBottom:'12px'}} />
        <select value={status} onChange={e=>setStatus(e.target.value)} style={{width:'100%',marginBottom:'12px'}}>
          <option>Manutenção</option>
          <option>Alugada</option>
        </select>
        <button type="submit" style={{marginRight:'8px'}}>Adicionar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}