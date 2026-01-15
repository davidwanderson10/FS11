import styles from './Historico.module.css';

function Historico({ movimentacoes }) {
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Histórico</h2>
      
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Categoria</div>
          <div className={styles.headerCell}>Descrição</div>
          <div className={styles.headerCell}>Data</div>
          <div className={styles.headerCell}>Valor</div>
        </div>
        
        <div className={styles.tableBody}>
          {movimentacoes.map(mov => (
            <div key={mov.id} className={styles.tableRow}>
              <div className={styles.tableCell}>
                <span className={`
                  ${styles.categoriaBadge} 
                  ${mov.categoria === 'Receita' ? styles.receita : styles.despesa}
                `}>
                  {mov.categoria}
                </span>
              </div>
              <div className={styles.tableCell}>{mov.descricao}</div>
              <div className={styles.tableCell}>{mov.data}</div>
              <div className={styles.tableCell}>
                <span className={`
                  ${styles.valor} 
                  ${mov.categoria === 'Receita' ? styles.valorReceita : styles.valorDespesa}
                `}>
                  {formatarValor(mov.valor)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Historico;