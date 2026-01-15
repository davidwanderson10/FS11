import './Botao.css'

function Botao ({texto, onClick, cor, classNameBtn}) {
        // const corFundo = cor || 'black';
    return (
        <button className={`btn ${classNameBtn}`} onClick={onClick}>
            {texto}
        </button>
    )
}


export default Botao