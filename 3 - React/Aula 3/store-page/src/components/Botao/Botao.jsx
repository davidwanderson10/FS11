import './Botao.css'

function Botao ({texto, onClick, cor}) {
        const corFundo = cor || 'black';
    return (
        <button className="botao-componente" style={{backgroundColor: corFundo}} onClick={onClick}>
            {texto}
        </button>
    )
}

export default Botao