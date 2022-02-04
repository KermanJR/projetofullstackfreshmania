import { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { SHOW_HIDE_CART, ADD_TO_CART, GET_USERS, REMOVE_ITEM } from "../Types"
import { useContext } from "react";

//Estado inicial do carrinho de produtos
const CartState: React.FC = ({ children }) => {

const appContext = useContext(CartContext)


 const initialValue = {
      showCart: false,
      cartItems: [],
      shopItems: [],
      bdItems: []
};
 
  const [state, dispatch] = useReducer(CartReducer, initialValue);

  const addToCart = (item: {}) => {
    dispatch({ type: ADD_TO_CART, payload: item});
  };

  const showHideCart = () => {
    dispatch({ type: SHOW_HIDE_CART, payload:  null });
  };

  const removeItem = (id: {}) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  const getUsers = () =>{
    dispatch({type: GET_USERS, payload: {}})
  }

  return (
    //provider serve para distribuir info do 'value' globalmente
    <CartContext.Provider
      value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        shopItems: state.shopItems,
        bdItems: state.bdItems,
        addToCart,
        showHideCart,
        removeItem: (item) => {},
        deleteUser: (user) =>{},
        handleSubmit: ()=>{},
        getUsers: ()=>{},
        editUser: ()=>{}
            
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
