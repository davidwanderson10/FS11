import { Badge } from "../ui/Badge";
import { ReserveButton } from "./ReserveButton";

const BASE_URL = "http://localhost:3000";
const PLACEHOLDER = "https://via.placeholder.com/200x280?text=Sem+Imagem";

export function BookCard({ livro, disponivel, user }) {
  const imgSrc = livro.img ? `${BASE_URL}${livro.img}` : PLACEHOLDER;

  return (
    <div style={{
      background: "#fff", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.2s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
    >
      <img
        src={imgSrc}
        alt={livro.titulo}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        onError={(e) => { e.target.src = PLACEHOLDER; }}
      />
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, lineHeight: 1.3 }}>{livro.titulo}</h3>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>{livro.autores?.nome}</p>
        <Badge value={livro.categorias?.nome} />
        {livro.descricao && (
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#374151", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {livro.descricao}
          </p>
        )}
        <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", color: disponivel > 0 ? "#166534" : "#dc2626", fontWeight: 600 }}>
            {disponivel > 0 ? `${disponivel} disponível(is)` : "Indisponível"}
          </p>
          <ReserveButton disponivel={disponivel} user={user} />
        </div>
      </div>
    </div>
  );
}
