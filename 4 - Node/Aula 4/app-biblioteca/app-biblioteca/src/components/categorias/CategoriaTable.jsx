import { Table } from "../ui/Table";
import { Button } from "../ui/Button";

export function CategoriaTable({ categorias, onEdit, onDelete }) {
  return (
    <Table
      columns={[
        { key: "id", label: "ID" },
        { key: "nome", label: "Nome" },
      ]}
      data={categorias}
      actions={(row) => (
        <>
          <Button variant="outline" onClick={() => onEdit(row)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(row)}>Excluir</Button>
        </>
      )}
    />
  );
}
