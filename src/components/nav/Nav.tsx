import {Link, useLocation} from "react-router-dom";
import "./Nav.css"

const Nav = () => {
    
    const location = useLocation();
    
    return <nav>
        <Link to="/" className={location.pathname === "/" ? "activo" : ""}>Biblioteca</Link>
        <Link to="/categorias" className={`submenu ${location.pathname.includes("categorias") ? "activo" : ""}`}>Categorías</Link>
        <Link to="/resultados" className={`submenu ${location.pathname.includes("resultados") ? "activo" : ""}`}>Añadir</Link>
        <Link to="#" className="disabled">Recomendaciones</Link>
        <Link to="/amigos" className={`submenu ${location.pathname.includes("amigos") ? "activo" : ""}`}>Amigos</Link>
        <Link to="#" className="disabled">Configuración</Link>
    </nav>
}

export default Nav;