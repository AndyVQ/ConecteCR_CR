import Navbar from "../components/NavBar";
import CarouselComp from "../components/CarouselComp";
import Cards from "../components/Card";
import FooterHighFashion from "../components/Footer";
import CardNoticia from "../components/CardNoticia";
import "../styles/PagHome.css";
const PagHome = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <article>
        <CarouselComp />
      </article>
      <div className="card1">
        <CardNoticia
          title="ConecteCR es la pagina mas visitada en Cartago"
          description="ConecteCR esta renovando las comunidades de Costa Rica."
          imageUrl="https://www.journeygourmet.com/continentes/America_Norte/Costa_Rica/Cartago/Cartago/imagenBig.jpg"
          link="https://www.ejemplo.com/noticia3"
        />
      </div>
      <div className="card2">
        {" "}
        <CardNoticia
          title="Plataforma Digital que Impulsa la Comunicación y el Comercio Local"
          description="ConecteCR une comunidades, promueve el comercio local y facilita la participación."
          imageUrl="https://media.istockphoto.com/id/1608707365/es/foto/vista-a%C3%A9rea-de-cartago-costa-rica-durante-la-primavera.jpg?s=170667a&w=0&k=20&c=HCtGBhcMMimEIYWDuVxTWDDtXjuOFXop7lP9G4nBiYI="
          link="https://www.ejemplo.com/noticia3"
        />
      </div>

      <div className="pag-Home">
        <Cards />
      </div>

      <footer>
        <FooterHighFashion />
      </footer>
    </>
  );
};

export default PagHome;
