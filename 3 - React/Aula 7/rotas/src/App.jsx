import './App.module.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Pagina1 from './pages/Pagina1';
import Pagina2 from './pages/Pagina2';

function App() {

  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h2>Menu</h2>

        {/* Botões de navegação */}
        <div style={{ marginBottom: "20px" }}>
          <Link to="/">
            <button>Home</button>
          </Link>

          <Link to="/pagina1">
            <button>Página 1</button>
          </Link>

          <Link to="/pagina2">
            <button>Produtos</button>
          </Link>
        </div>

        {/* Rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pagina1" element={<Pagina1 />} />
          <Route path="/pagina2" element={<Pagina2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
