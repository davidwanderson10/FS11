import style from './Cards.module.css';

const Cards = () => {
    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.CardImg}>
                    <img src="https://static.netshoes.com.br/produtos/tenis-couro-new-balance-nb-574-legacy/10/39V-0775-010/39V-0775-010_detalhe1.jpg?ts=1768881297?ims=240x240" alt="Tênis" />
                    <p>-14% OFF</p>
                    <span>Tênis New Balance</span>
                </div>

                <div className={style.CardInfo}>
                    <span><del>R$799,99</del></span>
                    <p className={style.price}>R$ 509,99</p>
                    <p>ou 7x R$ 72,85</p>
                </div>
            </div>

            <div className={style.card}>
                <div className={style.CardImg}>
                    <img src="https://static.netshoes.com.br/produtos/tenis-couro-new-balance-nb-574-legacy/10/39V-0775-010/39V-0775-010_detalhe1.jpg?ts=1768881297?ims=240x240" alt="Tênis" />
                    <p>-14% OFF</p>
                    <span>Tênis New Balance</span>
                </div>

                <div className={style.CardInfo}>
                    <span><del>R$799,99</del></span>
                    <p className={style.price}>R$ 509,99</p>
                    <p>ou 7x R$ 72,85</p>
                </div>
            </div>

            <div className={style.card}>
                <div className={style.CardImg}>
                    <img src="https://static.netshoes.com.br/produtos/tenis-couro-new-balance-nb-574-legacy/10/39V-0775-010/39V-0775-010_detalhe1.jpg?ts=1768881297?ims=240x240" alt="Tênis" />
                    <p>-14% OFF</p>
                    <span>Tênis New Balance</span>
                </div>

                <div className={style.CardInfo}>
                    <span><del>R$799,99</del></span>
                    <p className={style.price}>R$ 509,99</p>
                    <p>ou 7x R$ 72,85</p>
                </div>
            </div>

            <div className={style.card}>
                <div className={style.CardImg}>
                    <img src="https://static.netshoes.com.br/produtos/tenis-couro-new-balance-nb-574-legacy/10/39V-0775-010/39V-0775-010_detalhe1.jpg?ts=1768881297?ims=240x240" alt="Tênis" />
                    <p>-14% OFF</p>
                    <span>Tênis New Balance</span>
                </div>

                <div className={style.CardInfo}>
                    <span><del>R$799,99</del></span>
                    <p className={style.price}>R$ 509,99</p>
                    <p>ou 7x R$ 72,85</p>
                </div>
            </div>
        </div>
    )
};

export default Cards;