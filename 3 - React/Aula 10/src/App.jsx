import { Routes, Route, Link } from 'react-router-dom';
import styles from './App.module.css'
import puma from './assets/puma.png'
import Home from './pages/Home';
import Masculino from './pages/Masculino';
import Feminino from './pages/Feminino';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import { Button } from 'primereact/button';
import Footer from './components/Footer/Footer';


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

      <Footer />

    </>
    
  )
}

export default App

// 1. instalar prime react, prime icons e prime flex
// npm install primereact primeicons primeflex

// 2. importar os csss no main.jsx
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css'; 

// 3. importar o componente que deseja usar
// import { Button } from 'primereact/button';

// 4. usar o componente
// <Button label="Clique aqui" icon="pi pi-user" />