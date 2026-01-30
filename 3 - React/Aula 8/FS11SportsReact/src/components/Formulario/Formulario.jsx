import styles from './Formulario.module.css';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

function Formulario() {
    return (
        <>
            <div className={styles.formularioContainer}>
                <h2>Contato</h2>
                <form className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="nome">Nome:</label>
                        <InputText id="nome" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">Email:</label>
                        <InputText id="email" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="mensagem">Mensagem:</label>
                        <InputTextarea id="mensagem" rows={5} cols={40} className={styles.input} />
                    </div>
                    <Button label="Enviar" icon="pi pi-send"  />
                </form>
            </div>
        </>
    )
}

export default Formulario;