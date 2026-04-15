export function Table({ columns, data, actions }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}
              >
                {col.label}
              </th>
            ))}
            {actions && <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 600, color: "#374151" }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}
              >
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id ?? i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: "0.75rem 1rem", color: "#111827" }}>
                    {col.render ? col.render(row) : row[col.key] ?? "—"}
                  </td>
                ))}
                {actions && (
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
