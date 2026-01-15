import { useState } from 'react';
import Header from './components/Header/Header';
import ResumoCards from './components/ResumoCards/ResumoCards';
import GastosDiarios from './components/GastosDiarios/GastosDiarios';
import PorCategoria from './components/PorCategoria/PorCategoria';
import FormMovimentacao from './components/FormMovimentacao/FormMovimentacao';
import Historico from './components/Historico/Historico';
import MesResumo from './components/MesResumo/MesResumo';
import styles from './App.module.css';

function App() {
  const [movimentacoes, setMovimentacoes] = useState([
    {
      id: 1,
      descricao: 'salario',
      valor: 2500,
      data: '13/01/2026',
      categoria: 'Receita',
      tipo: 'Salário'
    },
    {
      id: 2,
      descricao: 'aluguel',
      valor: 1850,
      data: '06/01/2026',
      categoria: 'Casa',
      tipo: 'Aluguel'
    }
  ]);

  const handleAdicionarMovimentacao = (novaMovimentacao) => {
    setMovimentacoes(prev => [novaMovimentacao, ...prev]);
  };

  const entradas = movimentacoes
    .filter(m => m.categoria === 'Receita')
    .reduce((acc, m) => acc + m.valor, 0);

  const saidas = movimentacoes
    .filter(m => m.categoria !== 'Receita')
    .reduce((acc, m) => acc + m.valor, 0);

  const saldoTotal = entradas - saidas;

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.gridContainer}>
        {/* Coluna Esquerda */}
        <div className={styles.leftColumn}>
          <ResumoCards 
            entradas={entradas}
            saidas={saidas}
            saldoTotal={saldoTotal}
          />
          
          <GastosDiarios movimentacoes={movimentacoes} />
          
          <PorCategoria entradas={entradas} saidas={saidas} />
        </div>

        {/* Coluna Direita */}
        <div className={styles.rightColumn}>
          <FormMovimentacao onAdicionarMovimentacao={handleAdicionarMovimentacao} />
          
          <Historico movimentacoes={movimentacoes} />
          
          <MesResumo movimentacoes={movimentacoes} />
        </div>
      </div>
    </div>
  );
}

export default App;