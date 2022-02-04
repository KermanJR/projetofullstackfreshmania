import { useState, useEffect, useRef, useContext} from "react";
import { ProductsContext } from "./context_product/Context_Product";
import './addproduct.css'

export const AddProducts = () => {
  
  //ESTADO INICIAL DOS VALORES DOS PRODUTOS
  const [name, setName] = useState("");
  const [mark, setMark] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");



  //IMPORTAÇÃO DOS VALORES DO CONTEXTAPI
  const {products, getProducts, removeProducts} = useContext(ProductsContext)

  /*FUNÇÃO PARA EDIÇÃO DOS PRODUTOS. POIS, POR PADRÃO, OS FORMS HTML NÃO OFERECEM SUPORTE
  AO METHOD PUT, DIFERENTEMENTE DO METHOD GET E POST*/
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editing) {
      console.log('teste')
    } else {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mark,
          price,
          image
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    getProducts();

    setName("");
    setMark("");
    setPrice("");
    setImage("")
  };

 
  //FUNÇÃO SEPARADA PARA EDITAR OS PRODUTOS
  const editProducts = async (id: string) => {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    const data = await res.json();
    setEditing(true);
    setId(id);
    setName(data.name);
    setMark(data.mark);
    setPrice(data.price);
    setImage(data.image)

  };



  /*  A VARIÁVEL 'editing' CONTROLA OS FORMULÁRIOS DE INSERÇÃO E ATUALIZAÇÃO DE VALORES
  */
  if(editing){
    return (
      <div className="row">
        <div className="col-md-5">
          <h3 style={{color: '#004040'}}><i className="fi fi-rr-arrow-circle-right" style={{color: '#004040'}}></i> Atualizar produto</h3>
          <form  onSubmit={handleSubmit} className="card form_add card-body">

            <div className="form-group">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
                placeholder="Nome do produto"
                required
              />
            </div>

            <div className="form-group mt-sm-3">
              <input
                type="text"
                onChange={(e) => setMark(e.target.value)}
                value={mark}
                className="form-control"
                placeholder="Marca do produto"
                required
              />
            </div>

            <div className="form-group mt-sm-3">
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-control"
                placeholder="preço do produto"
                required
              />
            </div>

            <button className="btn btn-success btn-block" >
              Atualizar
            </button>
     
          </form>
            

          <a href="http://localhost:3000" style={{textDecoration: 'none'}} >
            <i className="fa fa-arrow-left" aria-hidden="true" style={{marginTop: '25px', marginRight: '10px'}}></i>
             Adicionar produto
          </a>
        </div>


        {/* div filha add_product */}
        <div className="col-md-7 card_products">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Marca</th>
                <th>Valor</th>
                <th>Imagem</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
           
              {products.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.mark}</td>
                  <td>R${item.price}</td>
                  <td><img src={item.image} alt="" className="image_products" /></td>
                  <td>
                    <button
                      className="btn btn-success btn-sm btn-block"
                      onClick={(e) => editProducts(item._id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={(e) => removeProducts(item._id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

////////////////////////////////////////////////////////////////////////////////////////////////////

// FORMULÁRIO PARA INSERÇÃO DE PRODUTOS
  else{
    return (
      <div className="row">
        <div className="col-md-5">
        <h3  style={{color: '#004040'}}><i className="fi fi-rr-add"  style={{color: '#004040'}}> </i> Adicionar produto:</h3>
          <form action="http://localhost:5000/products"  method="POST"  encType="multipart/form-data" className="card form__add card-body">
            <div className="form-group ">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                className="form-control"
                placeholder="Nome do produto"
                required
              />
            </div>
            <div className="form-group mt-sm-3" >
              <input
                type="text"
                name="mark"
                onChange={(e) => setMark(e.target.value)}
                value={mark}
                className="form-control"
                placeholder="Marca do produto"
                required
              />
            </div>
            <div className="form-group mt-sm-3">
              <input
                type="text"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-control"
                placeholder="Preço do produto"
                required
              />
            </div>

            <div className="form-group mt-sm-3">
              <input
                type="file"
                name="profile_image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                className="form-control"
                required
                placeholder="Upload de imagem"
              />
            </div>

            <button className="btn btn-success btn-block">
              Adicionar
            </button>
    
          </form>
        </div>


        <div className="col-md-7 card_products">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Marca</th>
                <th>Valor</th>
                <th>Imagem</th>
                <th>Ação</th>
              </tr>
            </thead>

            {products.length != 0? 
            <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.mark}</td>
                <td>R$ {item.price}</td>
                <td><img src={item.image} alt="" className="image_products" /></td>
                <td>

                  <button
                    className="btn btn-success btn-sm btn-block"
                    onClick={(e) => editProducts(item._id)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => removeProducts(item._id)}
                  >
                    Remover
                  </button>

                </td>
              </tr>
            ))}
          </tbody>: 
          
          <h5 style={{height: '40px', border: '0px', marginTop: '15px'
            ,marginLeft: '10px'}}> <i className="fi fi-rr-add" style={{color: '#004040'}}></i>  Não há produtos na loja... Favor, adicionar</h5> }
          </table>
        </div>
      </div>
    );
  }
}