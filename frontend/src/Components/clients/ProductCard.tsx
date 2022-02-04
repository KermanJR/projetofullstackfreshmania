
import { useContext } from "react";
import "./ProductCard.css";
import CartContext from "./context/CartContext";
import { Props } from "react-currency-format";


const ProductCard: React.FC<Props> = ({product}: any) => {

  //Usando a função addToCart do contextApi que criamos
  const { addToCart} = useContext(CartContext);

  let opts = { format: "%s%v", symbol: "R$ " };
  return (
    <div className='productCard__wrapper'>

      {/*Ícones de edição e remoção de produtos*/}
      <div className="ProductCard__action">
        <div><i className="far fa-times-circle"></i></div>
        <div><i className="fas fa-edit"></i></div>
      </div>
        
      <div>
        {/*Imagem do produto*/}
        <img className='productCard__img'  src={product.imagem} alt='' />
        
          {/*Nome do produto*/}
        <div className='ProductCard__nome'>
          <h4>{product.nome}</h4>
        </div>

          {/*Marca do produto*/}
        <div className='ProductCard__marca'>
          <h4>{product.marca}</h4>
        </div>

          {/*Preço do produto*/}
        <div className='ProductCard__price'>
          <h5>{product.preco}</h5>
        </div>

          {/*Botão para adicionarmos um novo produto ao carrinho*/}
        <button
          className='ProductCard__button'
          onClick={()=>addToCart(product)}
        >
          Adicionar ao carrinho
        </button>
      
      </div>
    </div>
  );
};

export default ProductCard;
