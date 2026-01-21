import style from './Product.module.css';

const Product = () => {
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.CardImg}>
                    <img src="https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/312060/03/sv01/fnd/BRA/fmt/png" alt="Tênis" />
                </div>

                <div className={style.CardImg}>
                    <img src="https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/312060/03/bv/fnd/BRA/fmt/png" alt="Tênis" />
                </div>

                <div className={style.CardImg}>
                    <img src="https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/312060/03/sv04/fnd/BRA/fmt/png" alt="Tênis" />
                </div>

            </div>

            <div className={style.description}>
                <h3>SOBRE O PRODUTO</h3><br/>
                O Fast-R3 é o tênis de corrida mais rápido que já criamos – baseado em dados, testado em laboratório e construído para inovações. Após testá-lo em corredores de elite e atletas reais, projetamos e otimizamos digitalmente o produto com base em dados. O Fast-R3 foi projetado para reduzir minutos do seu tempo de corrida. Com sua economia de corrida 3,15% melhorada*, isso se traduz em uma economia de tempo de maratona sem precedentes, de mais de 4 minutos e 30 segundos, para um corredor de 3 horas. Reduzimos 95 g em relação ao seu antecessor, adicionamos um reforço maior com o novo e aprimorado NITROFOAM™ ELITE e estendemos a camada de carbono PWRPLATE para máxima propulsão.
                <br/><br/>
                <h3>CARACTERÍSTICAS E BENEFÍCIOS</h3><br/>

                <ul>
                    <li>ULTRAWEAVE: Material leve e premium desenvolvido para respirabilidade</li>
                    <li>NITROFOAM™ ELITE: Tecnologia inovadora de espuma com nitrogênio que oferece retorno de energia excepcional, velocidade imbatível e maior conforto em longas distâncias para o dia da corrida</li>
                    <li>PWRPLATE: Placa de fibra de carbono estendida para propulsão potente e eficiência de elite</li>
                </ul>
                <br/>

                <h3>DETALHES</h3><br/>

                <ul>
                    <li>Ajuste regular</li>
                    <li>Ajuste regular</li>
                    <li>Ajuste regular</li>
                    <li>Ajuste regular</li>
                    <li>Ajuste regular</li>
                </ul>
            </div>
        </div>
    )
};

export default Product;