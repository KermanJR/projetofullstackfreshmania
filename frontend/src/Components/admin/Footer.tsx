
import './footer.css'
export const Footer = () =>{
    return(
        <>
        <footer className="footer">
            <div className='footer_item'>
                <h4>Redes Sociais</h4>

                <div className='footer_icons_inst'>
                    <nav>
                        <ul>
                            <li><a href="#">Sobre Nós</a></li>
                            <li><a href="#">Fale Conosco</a></li>
                            <li><a href="#">Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </div>


            <div className='footer_item'>
                <h4>FreshMania</h4>
               <div className='footer_fresh'>
                    <nav>
                        <ul>
                            <li><a href="#">Lojas</a></li>
                            <li><a href="#">Filtros</a></li>
                            <li><a href="#">Leites e Derivados</a></li>
                            <li><a href="#">Queijos</a></li>
                            <li><a href="#">Hortifruti</a></li>
                            <li><a href="#">Doces e geleias</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className='footer_item'>
                <h4>Atendimento</h4>
                <div className='footer_atend'>
                    <nav>
                        <ul>
                            <li><a href="#">Login</a></li>
                            <li><a href="#">Cadastre-se</a></li>
                            <li><a href="#">Contato</a></li>
                            <li><a href="#">Dúvidas frequentes</a></li>
                            <li><a href="#">Política de Privacidade</a></li>
                            <li><a href="#"></a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className='footer_item'>
            <h4>Aceitamos</h4>
            </div>
            
        </footer>
        <div style={{height: '70px', width: '100%', background: '#006e6d', textAlign: 'center'}}>
                <p style={{color: 'white', padding: '20px 0'}}>Freshmania</p>
        </div>
        </>
    )
}