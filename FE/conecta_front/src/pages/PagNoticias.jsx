import FooterPage from "../components/Footer";
import ListCardNoticia from "../components/ListCardNoticia";
import Navbar from "../components/NavBar";
import "../styles/pagNoticias.css";
const PagNoticias = () => {
  return (
    <>
      <Navbar />
      <div className="container-noticias">
        <ListCardNoticia />
      </div>
      <FooterPage />
    </>
  );
};
export default PagNoticias;
