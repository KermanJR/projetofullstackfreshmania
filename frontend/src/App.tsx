

import {AddProducts}  from "./Components/admin/AddProduct";
import Nav from "./Components/admin/Nav";
import NavBar from "./Components/admin/NavBar";
import {Context_Product} from "./Components/admin/context_product/Context_Product";
import {Footer} from "./Components/admin/Footer";
import ShopProduct from "./Components/admin/screens/ShopProduct";


function App() {
  return (
    <Context_Product>
      <Nav/>
      <NavBar/>
      <AddProducts/>
      <ShopProduct/>
      <Footer/>
    </Context_Product>
  );
}

export default App;
