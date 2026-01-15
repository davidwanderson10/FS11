import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>MyWallet</h1>
        <span className={styles.subtitle}>Controle Financeiro Pessoal</span>
      </div>
      <div className={styles.userInfo}>
        <span className={styles.userName}>Olá, Usuário</span>
        <div className={styles.avatar}>U</div>
      </div>
    </header>
  );
}

export default Header;