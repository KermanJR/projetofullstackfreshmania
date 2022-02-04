
import './navbar.css'
const NavBar = () =>{
    return(
        <div className="container__nav__bar">
            <nav className='nav__bar'>
                <ul>
                    <li><a>Lojas</a></li>
                    <li><a>Filtros</a></li>
                    <li><a>Leites e Derivados</a></li>
                    <li><a>Queijos</a></li>
                    <li><a>Hortfruti</a></li>
                    <li><a>Bebidas</a></li>
                    <li><a>Doces e Geleias</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;