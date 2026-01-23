import { Routes, Route, Link } from 'react-router-dom';
import styles from './App.module.css'
import puma from './assets/puma.png'
import Home from './pages/Home';
import Masculino from './pages/Masculino';
import Feminino from './pages/Feminino';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';

function App() {

  return (
    <>
      <div className={styles.header}>
          <img src={puma} alt='logo' className={styles.logo}/>
          <nav className={styles.navbar}>
              <ul className={styles.navlist}>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/masculino">Masculino</Link></li>
                  <li><Link to="/feminino">Feminino</Link></li>
                  <li><Link to="/contato">Contato</Link></li>
                  <li><Link to="/sobre">Sobre</Link></li>
              </ul>
          </nav>
      </div>

      <div className={styles.content}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/masculino" element={<Masculino />} />
            <Route path="/feminino" element={<Feminino />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </div>
    </>
    

  )
}

export default App
