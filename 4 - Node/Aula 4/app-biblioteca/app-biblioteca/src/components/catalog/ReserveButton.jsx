import { Button } from "../ui/Button";

export function ReserveButton({ disponivel, user }) {
  const podeReservar = user?.status === "ativo" && disponivel > 0;

  const tooltip = !podeReservar
    ? user?.status !== "ativo"
      ? "Seu perfil está inativo"
      : "Sem exemplares disponíveis"
    : "";

  return (
    <div title={tooltip}>
      <Button
        variant="primary"
        disabled={!podeReservar}
        style={{ width: "100%" }}
        onClick={() => alert("Entre em contato com a biblioteca para fazer sua reserva.")}
      >
        Reservar
      </Button>
    </div>
  );
}
