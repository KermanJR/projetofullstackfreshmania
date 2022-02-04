import { createContext, useState, useContext, Children, useEffect, useRef} from "react"

  //INTERFACE PARA A DEFINIÇÃO DE VALORES DOS PRODUTOS
  interface Products{
    _id: string;
    name: string;
    mark: string;
    price: number;
    image: string;
  }

  //INTERFACE PARA A DEFINIÇÃO DE VALORES DO CONTEXTO DO PRODUTO
  export interface ProductsContextData{
    products: Products[];
    getProducts: ()=> void;
    removeProducts:(id: string)=>void;
  }


  //VALORES INICIAIS 
  export const productsContextDefaultValue: ProductsContextData = {
    products: [],
    removeProducts:(id:string)=>null,
    getProducts: ()=> [],
  }


  //CRIAÇÃO DO CONTEXTAPI ATRAVÉS DO PRODUCTSCONTEXTDATA
  export const ProductsContext = createContext<ProductsContextData>(productsContextDefaultValue)
  

  /**********************************************************************/
  
  //CONTEXT_PRODUCT RECEBE OS CHILDRENS PARA O USO DO CONTEXT
  export const Context_Product = ({children}) =>{
      const [products, setProducts] = useState<Products[]>([])
      


      ///////////////////////////// FUNÇÕES ADD, REMOVE, UPDATE (PRODUTOS DA LOJA) ///////////////////////

      //RETORNA TODOS OS PRODUTOS ADICIONADOS NA LOJA
      const getProducts = async () => {
        const res = await fetch(`http://localhost:5000/products`);
        const data = await res.json();
        setProducts(data);
      };
    
      //REMOVE UM PRODUTO ESPECÍFICO DA LOJA PELO SEU ID
      const removeProducts = async (id: string) => {
        const userResponse = window.confirm("Tem certeza que deseja remover o produto?");
        if (userResponse) {
          const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          await getProducts();
        }
      };
    


    //RETORNA UMA ÚNICA VEZ TODOS OS PRODUTOS DA LOJA
    useEffect(()=>{
      getProducts();
    },[])

      //CRIAÇÃO E PASSAGEM DOS VALUES PARA OS CHILDRENS DO CONTEXT
      return(
          <ProductsContext.Provider value={{
            products,
            getProducts,
            removeProducts,
          }}>
            {children}
          </ProductsContext.Provider>
          
      )
  }
  