import Navbar from "../components/NavBar";
import FooterHighFashion from "../components/Footer";
import AggForoModal from "../components/AggForoModal";
import CardForo from "../components/CardForo"; 
import { useState } from "react";



const PagForo = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const abrirModalAgg = () => setAbrirModal(true);
  const cerrarModalAgg = () => setAbrirModal(false);

  return (
    <>
      <header>
        <Navbar />
        <button onClick={abrirModalAgg} className="btn-agg-camps">
          Agregar Foro
        </button>
      </header>
      <div className="pagForo">
        <CardForo />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggForoModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />
    </>
  );
};

export default PagForo;
