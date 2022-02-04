//useContext serve para acessar os valores dentro do context
import { useContext } from "react";

import "./Cart.css";

//Importar context para fazer o uso dele
import CartContext from "./context/CartContext";
import FC from "react";
import CartItem from "../admin/ProducItem";
import logoFreshMania from "../images/freshmania.svg"
import { Props } from "react-currency-format";
import { SlowBuffer } from "buffer";


const Cart: React.FC<Props> = ({item}: any) => {
  const { showCart, cartItems, showHideCart } = useContext(CartContext);
  //Conversão de moedas
  let opts = { format: "%s%v", symbol: "R$ " };

  return (
    <>
      {showCart && (
        <div className='cart__wrapper'>
     
          <div className="cart__cart__wrapper">
            <div>Carrinho</div>
            <button  onClick={showHideCart} className="cart__wrapper__button">Continuar Compra</button>
          </div>

          {/*Renderiza caso o carrinho esteja vazio.*/}
          <div className='cart__innerWrapper'>
            {cartItems.length === 0 ? (
              <h4>Carrinho vazio</h4>
            ) : (

              <ul>
                {/*Renderiza caso o carrinho não esteja vazio e distibrui o array de compras utilizando map*/}
                {cartItems.map((item) => (
                  <CartItem item={item} key={item}/>
                ))}
              </ul>
            )}
          </div>

          {/*Renderiza o total do carrinho de compras*/}
          <div className='Cart__cartTotal'>
            <div><span>{cartItems.length} itens</span></div>
            <div></div>
            <div style={{ marginLeft: 5 }}>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
