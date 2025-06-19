import Navbar from "../components/NavBar";
import FooterHighFashion from "../components/Footer";
import CardsPeticiones from "../components/CardsPeticiones";
import AggPetModal from "../components/AggPetModal";
import { useState } from "react";
import "../styles/PagCampAdmin.css";


const PagPeticiones = () => {
  const [abrirModal, setAbrirModal] = useState(false);

  const abrirModalAgg = () => setAbrirModal(true);
  const cerrarModalAgg = () => setAbrirModal(false);

  return (
    <>
      <header>
        <Navbar />
        <button onClick={abrirModalAgg} className="btn-agg-camps">
          Agregar peticion
        </button>
      </header>
      <div className="pagCampana">
        <CardsPeticiones />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggPetModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />
    </>
  );
};

export default PagPeticiones;