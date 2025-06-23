import Navbar from "../components/NavBar";
import FooterHighFashion from "../components/Footer";
import ListaCardVotacion from "../components/ListaCardVotacion";
import "../styles/pagCampana.css";

const PagVotaciones = () => (
  <>
    <header>
      <Navbar />
    </header>
    <div className="pagCampana">
      <ListaCardVotacion />
    </div>
    <footer>
      <FooterHighFashion />
    </footer>
  </>
);

export default PagVotaciones;