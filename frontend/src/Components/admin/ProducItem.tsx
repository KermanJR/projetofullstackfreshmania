import {useContext, useState} from "react";
import "./productitem.css";
import { ProductsContext } from "./context_product/Context_Product";


const ProductItem = ({item})=> {

  const {products, removeProducts} = useContext(ProductsContext)
  
  //FUNÇÃO SMOOTH PARA RETORNAR AO FORM DE INSERÇÃO DE PRODUTOS
    var link = document.querySelector('.btn_smooth');
    link?.addEventListener('click', ()=>{
      window.scrollTo(
        {
          top: -500,
          left: 0,
          behavior: "smooth",
        }
      )
    })

 

  //RETORNA LOJA VAZIA CASO NÃO HAJA PRODUTOS ADICIONADOS
  if (products.length === 0){
    return (
      <div className="no__Products__card">
        <div>
          <h3>Não há produtos na loja... <br/>Favor, adicionar</h3>
        </div>
        <div className="btn_smooth" style={{cursor: 'pointer', marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
          <a style={{backgroundColor: '#004040', color: 'white', width: '35px', height: '35px', borderRadius: '100%'}}>
            <i className="fas fa-plus" style={{marginTop: '10px'}}></i>
          </a>
        </div>
      </div>      
    );
  }

  //RETORNA OS PRODUTOS JÁ ADICIONADOS
  else{
    return(
      <div className="card__Product__Container">
      {products.map((item) => (
        <div className="card__Product__Item">
           <button className="remove__product"  onClick={(e) => removeProducts(item._id)} >X</button>
          <div><img src={item.image}></img></div>
          <div><h4>{item.name}</h4></div>
          <div><h5>{item.mark}</h5></div>
          <div><h6>R$ {item.price}</h6></div>
          <div><h6>ID do produto: {item._id}</h6></div>
         
        </div>
        )
      )}
     
  </div>
    )
  }
  }

export default ProductItem;
