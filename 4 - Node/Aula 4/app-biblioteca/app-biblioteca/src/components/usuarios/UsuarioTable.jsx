import { Table } from "../ui/Table";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function UsuarioTable({ usuarios, onEdit, onDelete }) {
  return (
    <Table
      columns={[
        { key: "id", label: "ID" },
        { key: "nome", label: "Nome" },
        { key: "matricula", label: "Matrícula" },
        { key: "email", label: "Email" },
        { key: "perfil", label: "Perfil", render: (r) => <Badge value={r.perfil} /> },
        { key: "status", label: "Status", render: (r) => <Badge value={r.status} /> },
      ]}
      data={usuarios}
      actions={(row) => (
        <>
          <Button variant="outline" onClick={() => onEdit(row)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(row)}>Excluir</Button>
        </>
      )}
    />
  );
}
