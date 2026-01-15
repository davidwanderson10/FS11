import styles from './GastosDiarios.module.css';

function GastosDiarios({ movimentacoes }) {
  // Gerar dados fictícios para o gráfico
  const diasDoMes = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const gastosPorDia = diasDoMes.map(dia => {
    // Para exemplo, gerar valores aleatórios
    const base = Math.random() * 2000;
    return Math.floor(base);
  });

  const maxGasto = Math.max(...gastosPorDia);
  const escala = 2000 / maxGasto;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gastos Diários</h2>
      
      <div className={styles.graficoContainer}>
        <div className={styles.eixoY}>
          <span>R$2000</span>
          <span>R$1800</span>
          <span>R$1600</span>
          <span>R$1400</span>
          <span>R$1200</span>
          <span>R$1000</span>
          <span>R$800</span>
          <span>R$600</span>
          <span>R$400</span>
          <span>R$200</span>
          <span>R$0</span>
        </div>
        
        <div className={styles.barrasContainer}>
          {gastosPorDia.map((gasto, index) => (
            <div key={index} className={styles.barraWrapper}>
              <div 
                className={styles.barra}
                style={{ 
                  height: `${(gasto / 2000) * 100}%`,
                  backgroundColor: gasto > 1500 ? '#ef4444' : gasto > 1000 ? '#f59e0b' : '#10b981'
                }}
              >
                <span className={styles.barraValor}>R${gasto}</span>
              </div>
              <span className={styles.diaLabel}>{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.diasEixo}>
        {diasDoMes.map(dia => (
          <span key={dia} className={styles.dia}>{dia}</span>
        ))}
      </div>
    </div>
  );
}

export default GastosDiarios;