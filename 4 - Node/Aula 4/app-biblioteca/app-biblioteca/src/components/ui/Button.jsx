const variants = {
  primary: { background: "#2563eb", color: "#fff", border: "none" },
  danger: { background: "#dc2626", color: "#fff", border: "none" },
  secondary: { background: "#6b7280", color: "#fff", border: "none" },
  outline: { background: "transparent", color: "#2563eb", border: "1px solid #2563eb" },
};

export function Button({ children, variant = "primary", disabled = false, type = "button", onClick, style = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontSize: "0.875rem",
        fontWeight: 500,
        transition: "opacity 0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
