import "./Nav.css";
import { useContext } from "react";
import CartContext from "../clients/context/CartContext";
import logoFreshMania from './images/freshmania (1).svg'


const Nav = () => {
  const { cartItems, showHideCart, showCart } = useContext(CartContext);

  return (
    <nav className="nav__bar__main">
      <div className='nav__left'><a href="http://localhost:3000" style={{cursor: 'pointer'}}><img className="logoFreshMania" src={logoFreshMania}/></a></div>
      <div className='nav__middle'>
        {/*Input para a pesquisa de produtos*/}
        <div className='input__wrapper'>
          <input type='text' value="Pesquise por produtos, marcas e lojas"/>
        <i className='fas fa-search' />
        </div>
      </div>
      <div className='nav__right'>
     
        <div className='cart__icon'>
          <i
            className='fa fa-shopping-cart'
            aria-hidden='true'
            onClick={showHideCart}
          
          />
          
            <div className='item__count'>
              <span>{cartItems}</span>
            </div>
          )
        </div>
      </div>
    </nav>
  );
};

export default Nav;
