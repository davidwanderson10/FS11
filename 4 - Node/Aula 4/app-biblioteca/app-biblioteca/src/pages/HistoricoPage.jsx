import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Table } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { getPedidos } from "../services/pedidosService";
import { getLivros } from "../services/livrosService";
import { useAuth } from "../hooks/useAuth";

const fmt = (d) => d ? new Date(d).toLocaleDateString("pt-BR") : "—";

export default function HistoricoPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPedidos(), getLivros()])
      .then(([p, l]) => {
        setPedidos(p.data.filter((ped) => ped.usuario_id === user?.userId));
        setLivros(l.data);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const getLivro = (id) => livros.find((l) => l.id === id)?.titulo ?? id;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "1.5rem", background: "#f8fafc" }}>
          <h2 style={{ marginTop: 0, marginBottom: "1.5rem", color: "#1e293b" }}>Meu Histórico de Empréstimos</h2>
          {loading ? (
            <p style={{ color: "#6b7280" }}>Carregando...</p>
          ) : (
            <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              <Table
                columns={[
                  { key: "id", label: "ID" },
                  { key: "livro_id", label: "Livro", render: (r) => getLivro(r.livro_id) },
                  { key: "data_inicio", label: "Início", render: (r) => fmt(r.data_inicio) },
                  { key: "data_prevista", label: "Devolução Prevista", render: (r) => fmt(r.data_prevista) },
                  { key: "data_entrega", label: "Devolvido em", render: (r) => fmt(r.data_entrega) },
                  { key: "status", label: "Status", render: (r) => <Badge value={r.status} /> },
                ]}
                data={pedidos}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
