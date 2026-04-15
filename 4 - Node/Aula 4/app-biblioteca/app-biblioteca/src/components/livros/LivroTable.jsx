import { Table } from "../ui/Table";
import { Button } from "../ui/Button";

const BASE_URL = "http://localhost:3000";

export function LivroTable({ livros, onEdit, onDelete }) {
  return (
    <Table
      columns={[
        { key: "id", label: "ID" },
        { key: "titulo", label: "Título" },
        { key: "autor", label: "Autor", render: (r) => r.autores?.nome ?? "—" },
        { key: "categoria", label: "Categoria", render: (r) => r.categorias?.nome ?? "—" },
        { key: "estoque", label: "Estoque" },
        {
          key: "img", label: "Imagem",
          render: (r) => r.img
            ? <img src={`${BASE_URL}${r.img}`} alt={r.titulo} style={{ height: "40px", borderRadius: "4px" }} />
            : "—"
        },
      ]}
      data={livros}
      actions={(row) => (
        <>
          <Button variant="outline" onClick={() => onEdit(row)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(row)}>Excluir</Button>
        </>
      )}
    />
  );
}
