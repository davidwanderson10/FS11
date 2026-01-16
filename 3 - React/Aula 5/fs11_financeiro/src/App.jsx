import { useState, useEffect } from "react";
import Header from './components/Header/Header.jsx';
import ResumoCards from './components/ResumoCards/ResumoCards.jsx';
import style from './App.module.css';
import FormMovimentacao from "./components/FormMovimentacao/FormMovimentacao.jsx";

function App() {

  const [movimentacoes, setMovimentacoes] = useState(() => {
    const salvas = localStorage.getItem('movimentacoes');
    if (salvas) {
      return JSON.parse(salvas);
    }

    return [];
  });

  // Salvar no localStorage sempre que movimentacoes mudar
  useEffect(() => {
    localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));
  }, [movimentacoes]);

  const handleAdicionarMovimentacao = (novaMovimentacao) => {
    setMovimentacoes(prev => [novaMovimentacao, ...prev]);
  };


  const entradas = movimentacoes
    .filter((mov) => mov.categoria === 'Receita') // filtra apenas as receitas
    .reduce((acc, mov) => acc + mov.valor, 0); // soma os valores das receitas

  const saidas = movimentacoes
    .filter((mov) => mov.categoria === 'Despesa') // filtra apenas as despesas
    .reduce((acc, mov) => acc + mov.valor, 0); // soma os valores das despesas

  const saldoTotal = entradas - saidas;

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as movimentações?')) {
      setMovimentacoes([]);
    }
  }
  
  return (
    <div className={style.container}>
      <Header />

      <div className={style.controls}>
        <button className={style.clearButton} onClick={handleClearAll}>Limpar tudo</button>
        <span className={style.counter}>Total de movimentações: {movimentacoes.length}</span>
      </div>

      <div className={style.gridContainer}>
        {/* Coluna da esquerda */}
        <div className={style.leftColumn}>
          <ResumoCards 
            entradas={entradas} 
            saidas={saidas} 
            saldoTotal={saldoTotal}
          />

         
        </div>
        {/* Coluna da direita */}
        <div className={style.rightColumn}>
          <FormMovimentacao onAdicionarMovimentacao={handleAdicionarMovimentacao}/>
          
        </div>


      </div>

      
    </div>
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

// componente: FormMovimentacao