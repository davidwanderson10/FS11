import './App.css'
import Apresentacao from './components/Apresentacao/Apresentacao'
import Botao from './components/Botao/Botao'

function App() {

  return (
    <>
      {/* <Apresentacao nome="David" curso="React" estado="SP"/>
      <Apresentacao nome="Maria" curso="JavaScript" estado="RJ"/>
      <Apresentacao nome="Pedro" curso="SQL" estado="MG"/>
      <Apresentacao nome="Ana" curso="Python" estado="BA"/> */}
      <Botao texto="Cadastrar" onClick={() => alert('Usuário cadastrado!')} cor='#4CAF50' />
      <Botao texto="Alterar" onClick={() => alert('Usuário alterado!')} />
      <Botao texto="Excluir" onClick={() => alert('Usuário excluído!')} cor='#f44336' />

    </>
  )
}

export default App
