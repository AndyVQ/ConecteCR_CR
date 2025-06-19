import Navbar from "../components/NavBar";
import FooterHighFashion from "../components/Footer";
import ListaCardCampanaP from "../components/ListaCardCampanaP";
import "../styles/pagCampana.css";
const PagCampa = () => (
  <>
    <header>
      <Navbar />
    </header>
    <div className="pagCampana">
      <ListaCardCampanaP />
    </div>
    <footer>
      <FooterHighFashion />
    </footer>
  </>
);

export default PagCampa;
