import VotAdmin from "../components/VotAdmin";
import AdminNavBar from "../components/AdminNavBar";  
import FooterHighFashion from "../components/Footer";
import { useEffect, useState } from "react";
import AggVotModal from "../components/AggVotModal";

const PagVotAdmin = () => {
    const [abrirModal, setAbrirModal] = useState(false);
  
    function abrirModalAgg() {
      setAbrirModal(true);
    }
  
    function cerrarModalAgg() {
      setAbrirModal(false);
    }
  return (
    <>
      <header>
        <AdminNavBar />
        <button onClick={() => {abrirModalAgg()}} className="btn-agg-camps">
          +
        </button>
      </header>
      <div className="pag-Admin">
        <VotAdmin />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggVotModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />
      
    </>
  );
};
export default PagVotAdmin;
