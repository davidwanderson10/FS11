import './App.css'
import Apresentacao from './components/Apresentacao/Apresentacao'
import Botao from './components/Botao/Botao'
import Valor from './components/Valor/Valor'

function App() {

  return (
    <>
      {/* <Apresentacao nome="David" curso="React" estado="SP"/>
      <Apresentacao nome="Maria" curso="JavaScript" estado="RJ"/>
      <Apresentacao nome="Pedro" curso="SQL" estado="MG"/>
      <Apresentacao nome="Ana" curso="Python" estado="BA"/> */}
      {/* <Botao texto="Cadastrar" onClick={() => alert('Usuário cadastrado!')} cor='#4CAF50' classNameBtn='btn-green' />
      <Botao texto="Alterar" onClick={() => alert('Usuário alterado!')} />
      <Botao texto="Excluir" onClick={() => alert('Usuário excluído!')} cor='#f44336' classNameBtn='btn-red'/> */}

      <Valor numero={105} />
      <Valor numero={80} />
      <Valor numero={150} />
      <Valor numero={60} />
    </>
  )
}

export default App
// Crie um componente que receba valores via props para renderizar um texto. 
// Esse componente deve ser reutilizado 4 vezes no App.jsx, cada vez com valores diferentes.
// Caso o valor seja maior que 100 deve ser exibido "105 - Valor alto"
// Caso o valor seja menor ou igual a 100 deve ser exibido "80 - Valor baixo"
// A cor deve ser diferente para cada caso (vermelho para valor alto e verde para valor baixo).