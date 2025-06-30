import Navbar from "../components/NavBar";
import FooterPage from "../components/Footer";
import "../styles/contact.css";

const PagContacto = () => (
  <>
    <Navbar />
    <div className="contact-container">
      <h2>Contacto</h2>
      <p>Puedes encontrarnos en la Avenida Central, San Jose.</p>
      <p>Teléfono: (506) 7034-5678</p>
      <p>Correo: info@conectecr.com</p>
    </div>
    <FooterPage />
  </>
);

export default PagContacto;