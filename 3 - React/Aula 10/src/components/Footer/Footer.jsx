import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footerCustom}>
            <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                    <a href="#">Termos e Condições de Uso</a>
                    <a href="#">Política de Privacidade</a>
                    <a href="#">Configurador de cookies</a>
                </div>

                <div className={styles.footerIcons}>
                    <a href="#" aria-label="Facebook"><i className="pi pi-facebook"></i></a>
                    <a href="#" aria-label="Twitter"><i className="pi pi-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i className="pi pi-instagram"></i></a>
                    <a href="#" aria-label="YouTube"><i className="pi pi-youtube"></i></a>
                </div>
            </div>
            <h3 className={styles.footerCopy}>©FS11 Sports, 2026. Todos os direitos reservados</h3>
        </footer>
    );
}

export default Footer;