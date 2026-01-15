import styles from './MesResumo.module.css';

function MesResumo({ movimentacoes }) {
  const movimentacoesJaneiro = movimentacoes.filter(mov => 
    mov.data.includes('/01/2026')
  );

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Jan 2026</h2>
      
      <div className={styles.listaMovimentacoes}>
        {movimentacoesJaneiro.map(mov => (
          <div key={mov.id} className={styles.movimentacao}>
            <div className={styles.movimentacaoInfo}>
              <span className={styles.movimentacaoDescricao}>{mov.descricao}</span>
              <span className={styles.movimentacaoData}>{mov.data}</span>
            </div>
            <span className={`
              ${styles.movimentacaoValor} 
              ${mov.categoria === 'Receita' ? styles.receita : styles.despesa}
            `}>
              {formatarValor(mov.valor)}
            </span>
          </div>
        ))}
      </div>
      
      <div className={styles.resumo}>
        <div className={styles.resumoItem}>
          <span className={styles.resumoLabel}>Total Receitas:</span>
          <span className={styles.resumoValor}>
            {formatarValor(
              movimentacoesJaneiro
                .filter(m => m.categoria === 'Receita')
                .reduce((acc, m) => acc + m.valor, 0)
            )}
          </span>
        </div>
        <div className={styles.resumoItem}>
          <span className={styles.resumoLabel}>Total Despesas:</span>
          <span className={styles.resumoValor}>
            {formatarValor(
              movimentacoesJaneiro
                .filter(m => m.categoria !== 'Receita')
                .reduce((acc, m) => acc + m.valor, 0)
            )}
          </span>
        </div>
        <div className={styles.resumoItem}>
          <span className={styles.resumoLabel}>Saldo do Mês:</span>
          <span className={`${styles.resumoValor} ${styles.saldo}`}>
            {formatarValor(
              movimentacoesJaneiro
                .filter(m => m.categoria === 'Receita')
                .reduce((acc, m) => acc + m.valor, 0) -
              movimentacoesJaneiro
                .filter(m => m.categoria !== 'Receita')
                .reduce((acc, m) => acc + m.valor, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MesResumo;