import styles from './Styles/Masculino.module.css'

const Masculino = () => {
    // Simulando dados de produtos, sua missão é criar 4 itens de cada categoria.
    const produto = [
        {
            titulo: "Tenis adidas",
            descricao: "Tenis para corrida",
            categoria: "Corrida",
            preco: 299.99,
            imagem: "https://static.netshoes.com.br/produtos/tenis-adidas-galaxy-5-masculino/10/CF6354-010/CF6354-010_detalhe1.jpg?ts=1683293113?ims=240x240"
        },
        {
            titulo: "Camisa Puma",
            descricao: "Camisa esportiva",
            categoria: "Camisas",
            preco: 149.99,
            imagem: "https://static.netshoes.com.br/produtos/camisa-puma-teamliga-ii-jersey-masculina/10/758923-01/758923-01_detalhe1.jpg?ts=1683293293?ims=240x240"        
        }
    ]
    return (
         <div className={styles.container}>
            <div className={styles.sidebar}>
                <button>Corrida</button>
                <button>Futebol</button>
                <button>Camisas</button>
                <button>Acessórios</button>
            </div>
         </div>
    )
}

export default Masculino

