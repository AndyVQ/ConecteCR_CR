import "../styles/footer.css";

const FooterPage = () => {
  return (
    <footer className="pie-de-pagina">
      <div className="contenedor-pie">
        <div className="enlaces-pie">
          <ul>
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Acerca de</a>
            </li>
            <li>
              <a href="#">Contacto</a>
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
