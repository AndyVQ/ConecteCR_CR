import Navbar from "../components/NavBar";
import FooterPage from "../components/Footer";
import "../styles/about.css";

const PagAcerca = () => (
  <>
    <Navbar />
    <div className="about-container">
      <h2>Acerca de ConecteCR</h2>
      <p>ConecteCR es una plataforma ficticia dedicada a fortalecer la comunicación y la colaboración en las comunidades costarricenses.</p>
      <p>Nuestra misión es conectar a las personas con iniciativas locales y fomentar la participación ciudadana.</p>
    </div>
    <FooterPage />
  </>
);

export default PagAcerca;