import './Valor.css'

function Valor({ numero }) {
    if (numero > 100) {
    return <h1 className='valor-alto'>{numero} - Valor alto</h1>
    } else {
    return <h1 className='valor-baixo'>{numero} - Valor baixo</h1>
    }
}

export default Valor