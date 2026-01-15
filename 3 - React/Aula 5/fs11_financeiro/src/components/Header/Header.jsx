import style from './Header.module.css';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <h1 className={style.logo}>Financeiro</h1>
        <span className={style.subtitle}>Controle Financeiro Pessoal</span>
      </div>
      <div className={style.userInfo}>
        <span className={style.userName}>Olá, David!</span>
        <div className={style.avatar}>U</div>
      </div>
    </header>
  );
}

export default Header;