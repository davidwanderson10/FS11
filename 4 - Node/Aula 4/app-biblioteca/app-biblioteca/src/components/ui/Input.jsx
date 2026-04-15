export function Input({ label, type = "text", value, onChange, required, placeholder, accept, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", ...style }}>
      {label && (
        <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "#374151" }}>
          {label}{required && <span style={{ color: "#dc2626" }}> *</span>}
        </label>
      )}
      <input
        type={type}
        value={type !== "file" ? (value ?? "") : undefined}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        accept={accept}
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "0.875rem",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
