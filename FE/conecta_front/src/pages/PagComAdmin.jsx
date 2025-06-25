import ComAdmin from "../components/ComAdmin";
import AdminNavBar from "../components/AdminNavBar";
import FooterHighFashion from "../components/Footer";
import { useEffect, useState } from "react";
import "../styles/PagCampAdmin.css";
import AggComModal from "../components/AggComModal";

function PagComAdmin() {
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
        <ComAdmin />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggComModal 
        abrirModal={abrirModal} 
        cerrarModal={cerrarModalAgg} />
    </>
  )
}

export default PagComAdmin