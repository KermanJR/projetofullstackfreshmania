
import "./shopproduct.css";
import ProductItem from "../ProducItem";



//COMPONENTE SHOPPRODUCT RECEBE TODOS OS PRODUTOS ADICIONADOS À LOJA
const shopProduct = (item: any) => {

  return (
    <div className='products__wrapper'>
      <ProductItem item={item} key={item}/>
    </div>
    
  );
};

export default shopProduct;
