import './Tabela.css'

function Tabela() {
    return (
        <table className="tabela">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Cidade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Ana</td>
                    <td>25</td>
                    <td>São Paulo</td>
                </tr>
                <tr>
                    <td>Bruno</td>
                    <td>30</td>
                    <td>Rio de Janeiro</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Tabela