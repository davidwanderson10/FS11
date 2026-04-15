const colors = {
  ativo: { background: "#dcfce7", color: "#166534" },
  entregue: { background: "#dbeafe", color: "#1e40af" },
  inativo: { background: "#fee2e2", color: "#991b1b" },
  admin: { background: "#fef9c3", color: "#854d0e" },
  aluno: { background: "#ede9fe", color: "#5b21b6" },
};

export function Badge({ value }) {
  const style = colors[value] ?? { background: "#f3f4f6", color: "#374151" };
  return (
    <span
      style={{
        ...style,
        padding: "2px 10px",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      {value}
    </span>
  );
}
