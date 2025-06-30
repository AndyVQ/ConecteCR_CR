import AdminNavBar from "../components/AdminNavBar";  
import FooterHighFashion from "../components/Footer";
import NotAdmin from "../components/NotAdmin";
import { useEffect, useState } from "react";
import "../styles/PagCampAdmin.css";
import AggNotModal from "../components/AggNotModal";

const PagNotAdmin = () => {
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
        <NotAdmin />
    </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggNotModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />

    </>
  );
};
export default PagNotAdmin;
