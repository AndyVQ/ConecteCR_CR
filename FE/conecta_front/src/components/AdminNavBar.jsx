import "../styles/nav.css";
import { CgProfile } from "react-icons/cg";

const AdminNavBar = () => {
  return (
    <>
      <nav className="navbar">
        <section>
        <h5 className="h3-admin"><CgProfile /> Admin</h5>
        </section>
        <ul className="nav-links">
          <li>
            <a href="/Admin">Inicio</a>
          </li>
          <li>
            <a href="/ComAdmin">Comunidades</a>
          </li>
          <li> 
            <a href="/CampAdmin">Campañas</a>
          </li>
          <li>
            <a href="/PetAdmin">Peticiones</a>
          </li>
          <li>
            <a href="/VotAdmin">Votaciones</a>
          </li>
          <li>
            <a href="/RepAdmin">Reportes</a>
          </li>
          <li>
            <a href="/NotAdmin">Noticias</a>
          </li>
          <li>
            <a href="/ForoAdmin">Foro</a>
          </li>
          <li>
            <a href="/AnAdmin">Anuncios</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavBar;
