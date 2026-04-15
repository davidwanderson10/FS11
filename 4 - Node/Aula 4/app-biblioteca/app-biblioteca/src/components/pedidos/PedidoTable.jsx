import { Table } from "../ui/Table";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const fmt = (d) => d ? new Date(d).toLocaleDateString("pt-BR") : "—";

export function PedidoTable({ pedidos, livros, usuarios, onEdit, onDelete }) {
  const getLivro = (id) => livros.find((l) => l.id === id)?.titulo ?? id;
  const getUsuario = (id) => usuarios.find((u) => u.id === id)?.nome ?? id;

  return (
    <Table
      columns={[
        { key: "id", label: "ID" },
        { key: "livro_id", label: "Livro", render: (r) => getLivro(r.livro_id) },
        { key: "usuario_id", label: "Usuário", render: (r) => getUsuario(r.usuario_id) },
        { key: "data_inicio", label: "Início", render: (r) => fmt(r.data_inicio) },
        { key: "data_prevista", label: "Prevista", render: (r) => fmt(r.data_prevista) },
        { key: "data_entrega", label: "Entrega", render: (r) => fmt(r.data_entrega) },
        { key: "status", label: "Status", render: (r) => <Badge value={r.status} /> },
      ]}
      data={pedidos}
      actions={(row) => (
        <>
          <Button variant="outline" onClick={() => onEdit(row)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(row)}>Excluir</Button>
        </>
      )}
    />
  );
}
