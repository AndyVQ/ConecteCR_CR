import Navbar from "../components/NavBar";
import FooterHighFashion from "../components/Footer";
import CardsReportes from "../components/CardsReportes";
import AggRepModal from "../components/AggRepModal";
import { useState } from "react";
import "../styles/PagCampAdmin.css";

const PagReportes = () => {
  const [abrirModal, setAbrirModal] = useState(false);

  const abrirModalAgg = () => setAbrirModal(true);
  const cerrarModalAgg = () => setAbrirModal(false);

  return (
    <>
      <header>
        <Navbar />
        <button onClick={abrirModalAgg} className="btn-agg-camps">
          Agregar reporte
        </button>
      </header>
      <div className="pagCampana">
        <CardsReportes />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggRepModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />
    </>
  );
};

export default PagReportes;
