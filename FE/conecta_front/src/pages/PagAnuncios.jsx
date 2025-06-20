import Navbar from "../components/NavBar";
import FooterPage from "../components/Footer";
import CardsAnuncios from "../components/CardsAnuncios";
import "../styles/PagCampAdmin.css";

const PagAnuncios = () => (
  <>
    <header>
      <Navbar />
    </header>
    <div className="pagCampana">
      <CardsAnuncios />
    </div>
    <footer>
      <FooterPage />
    </footer>
  </>
);

export default PagAnuncios;