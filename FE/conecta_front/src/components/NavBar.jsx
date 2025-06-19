import { Link } from "react-router-dom";
import "../styles/nav.css";
import logo from "../img/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <section>
        <Link to="/home">
          <img src={logo} alt="Logo ConecteCR" className="logotipo" />
        </Link>
      </section>
      <ul className="nav-links">
        <li>
          <Link to="/Campañas">Campañas</Link>
        </li>
        <li>
          <Link to="/PagPeti">Peticiones</Link>
        </li>
        <li>
          <Link to="/PagVota">Votaciones</Link>
        </li>
        <li>
          <Link to="/PagReport">Reportes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
