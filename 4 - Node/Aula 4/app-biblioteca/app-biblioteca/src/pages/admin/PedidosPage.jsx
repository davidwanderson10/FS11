import { useState, useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import { Button } from "../../components/ui/Button";
import { PedidoTable } from "../../components/pedidos/PedidoTable";
import { PedidoForm } from "../../components/pedidos/PedidoForm";
import { getPedidos, createPedido, updatePedido, deletePedido } from "../../services/pedidosService";
import { getLivros } from "../../services/livrosService";
import { getUsuarios } from "../../services/usuariosService";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () =>
    Promise.all([getPedidos(), getLivros(), getUsuarios()])
      .then(([p, l, u]) => { setPedidos(p.data); setLivros(l.data); setUsuarios(u.data); })
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await updatePedido(editing.id, data);
    else await createPedido(data);
    load();
  };

  const handleDelete = async (pedido) => {
    if (!confirm(`Excluir pedido #${pedido.id}?`)) return;
    try {
      await deletePedido(pedido.id);
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
            <h2 style={{ margin: 0, color: "#1e293b" }}>Pedidos de Empréstimo</h2>
            <Button onClick={() => { setEditing(null); setModalOpen(true); }}>+ Novo Pedido</Button>
          </div>
          {loading ? <p style={{ color: "#6b7280" }}>Carregando...</p> : (
            <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <PedidoTable
                pedidos={pedidos}
                livros={livros}
                usuarios={usuarios}
                onEdit={(p) => { setEditing(p); setModalOpen(true); }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </main>
      </div>
      {modalOpen && (
        <PedidoForm
          pedido={editing}
          livros={livros}
          usuarios={usuarios}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
