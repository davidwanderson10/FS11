import { useState, useEffect } from "react";
import './App.css'
import Header from './components/Header/Header.jsx';
import ResumoCards from './components/ResumoCards/ResumoCards.jsx';

function App() {

  const [movimentacoes, setMovimentacoes] = useState(() => {
    const salvas = localStorage.getItem('movimentacoes');
    if (salvas) {
      return JSON.parse(salvas);
    }

    return [
      { id: 1, 
        descricao: 'Salário', 
        valor: 5000, 
        data: '13/01/2026', 
        categoria: 'Receita', 
        tipo: 'Salário' 
      },
      { id: 2, 
        descricao: 'Aluguel', 
        valor: 1500, 
        data: '15/01/2026', 
        categoria: 'Despesa', 
        tipo: 'Aluguel' 
      }
    ];
  });

  // Salvar no localStorage sempre que movimentacoes mudar
  useEffect(() => {
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
  }, [movimentacoes]);


  const entradas = movimentacoes
    .filter((mov) => mov.categoria === 'Receita')
    .reduce((acc, mov) => acc + mov.valor, 0);

  const saidas = movimentacoes
    .filter((mov) => mov.categoria === 'Despesa')
    .reduce((acc, mov) => acc + mov.valor, 0);

  const saldoTotal = entradas - saidas;
  
  return (
    <>
      <Header />
      <ResumoCards 
        entradas={entradas} 
        saidas={saidas} 
        saldoTotal={saldoTotal}
      />
    </>
  );
}

export default App


// CRIAR UM COMPONENTE:
// 1. CRIAR A PASTA COM O NOME DO COMPONENTE EM "src/components/Header"
// 2. CRIAR O ARQUIVO "Header.jsx" DENTRO DA PASTA
// 3. CRIAR O ARQUIVO "Header.module.css" DENTRO DA PASTA
// 4. IMPORTAR O CSS NO ARQUIVO "Header.jsx":
//    import styles from './Header.module.css';
// 5. CRIAR A FUNÇÃO DO COMPONENTE E EXPORTAR

// componente: ResumoCards