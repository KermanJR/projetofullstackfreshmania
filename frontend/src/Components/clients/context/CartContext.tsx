import { createContext } from "react";


const CartContext = createContext({
  showCart: true,
  cartItems: Array[0],
  shopItems: Array[0],
  bdItems: Array[0],
  addToCart: (product) => {},
  showHideCart: (showCart) => {},
  removeItem: (item) => {},
  deleteUser: (user) =>{},
  handleSubmit: ()=>{},
  getUsers: ()=>{},
  editUser: ()=>{}
});

export default CartContext;

