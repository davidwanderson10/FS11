import styles from './PorCategoria.module.css';

function PorCategoria({ entradas, saidas }) {
  const total = entradas + saidas;
  const percentualEntradas = total > 0 ? (entradas / total) * 100 : 0;
  const percentualSaidas = total > 0 ? (saidas / total) * 100 : 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Por Categoria</h2>
      
      <div className={styles.categoriasContainer}>
        <div className={styles.categoria}>
          <div className={styles.categoriaInfo}>
            <span className={styles.categoriaNome}>Entradas</span>
            <span className={styles.categoriaPercentual}>{percentualEntradas.toFixed(0)}%</span>
          </div>
          <div className={styles.barraContainer}>
            <div 
              className={`${styles.barraProgresso} ${styles.entrada}`}
              style={{ width: `${percentualEntradas}%` }}
            />
          </div>
        </div>
        
        <div className={styles.categoria}>
          <div className={styles.categoriaInfo}>
            <span className={styles.categoriaNome}>Saídas</span>
            <span className={styles.categoriaPercentual}>{percentualSaidas.toFixed(0)}%</span>
          </div>
          <div className={styles.barraContainer}>
            <div 
              className={`${styles.barraProgresso} ${styles.saida}`}
              style={{ width: `${percentualSaidas}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className={styles.legenda}>
        <div className={styles.legendaItem}>
          <div className={`${styles.legendaCor} ${styles.entrada}`}></div>
          <span>Entradas</span>
        </div>
        <div className={styles.legendaItem}>
          <div className={`${styles.legendaCor} ${styles.saida}`}></div>
          <span>Saídas</span>
        </div>
      </div>
    </div>
  );
}

export default PorCategoria;