import styles from './ResumoCards.module.css';

function ResumoCards({ entradas, saidas, saldoTotal }) {
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resumo Financeiro</h2>
      <div className={styles.cardsGrid}>
        <div className={`${styles.card} ${styles.entradas}`}>
          <h3 className={styles.cardTitle}>Entradas</h3>
          <p className={styles.cardValue}>{formatarValor(entradas)}</p>
          <div className={styles.cardIcon}>↑</div>
        </div>

        <div className={`${styles.card} ${styles.saidas}`}>
          <h3 className={styles.cardTitle}>Saídas</h3>
          <p className={styles.cardValue}>{formatarValor(saidas)}</p>
          <div className={styles.cardIcon}>↓</div>
        </div>

        <div className={`${styles.card} ${styles.saldo}`}>
          <h3 className={styles.cardTitle}>Saldo Total</h3>
          <p className={styles.cardValue}>{formatarValor(saldoTotal)}</p>
          <div className={styles.cardIcon}>$</div>
        </div>
      </div>
    </div>
  );
}

export default ResumoCards;