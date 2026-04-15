export function calcularDisponibilidade(livro, pedidos) {
  const pedidosAtivos = pedidos.filter(
    (p) => p.livro_id === livro.id && p.status === "ativo"
  ).length;
  return (livro.estoque ?? 0) - pedidosAtivos;
}

export function useDisponibilidade(livros, pedidos) {
  return livros.map((livro) => ({
    ...livro,
    disponivel: calcularDisponibilidade(livro, pedidos),
  }));
}
