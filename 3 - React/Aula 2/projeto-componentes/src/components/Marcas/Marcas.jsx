import './Marcas.css'

function Marcas() {
    return (
      <>  
        <h1 >Conheça nossas marcas</h1>
        <div className='container-marcas'>
            <div className='marcas'><img src="https://www.coca-cola.com/content/dam/onexp/br/pt/offerings/fanta-ccxp/fanta_logo.png/width1960.png" alt="" /></div>
            <div className='marcas'><img src="https://www.coca-cola.com/content/dam/onexp/br/pt/offerings/christmas/Coca-Cola-original-logo-co.svg" alt="" /></div>
            <div className='marcas'><img src="https://www.coca-cola.com/content/dam/onexp/br/pt/brands/sprite/br_sprite_logo.png/width1960.png" alt="" /></div>
        
         </div>

         <button className='botao'>Veja mais</button>
      </>
  
  
    )
}
  
  export default Marcas