import "../styles/footer.css";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className="pie-de-pagina">
      <div className="contenedor-pie">
        <div className="enlaces-pie">
          <ul>
            <li>
               <Link to="/">Inicio</Link>
            </li>
            <li>
             <Link to="/Acerca">Acerca de</Link>
            </li>
            <li>
             <Link to="/Contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="pie-inferior">
        <p>&copy; 2025 ConecteCR. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
export default FooterPage;
