import './Apresentacao.css'

function Apresentacao(props) {
        const name = props.nome.toUpperCase();
        const curso = props.curso;
        const estado = props.estado;
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Curso: {curso}</p>
            <p>Estado: {estado}</p>
        </div>
    )
}

export default Apresentacao