
import AnAdmin from "../components/AnAdmin";
import AdminNavBar from "../components/AdminNavBar";  
import FooterHighFashion from "../components/Footer";
import { useEffect, useState } from "react";
import "../styles/PagCampAdmin.css";
import AggAnModal from "../components/AggAnModal";

const PagAnAdmin = () => {  
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
        <AnAdmin />
    </div>
      <footer>
        <FooterHighFashion />
      </footer>
      <AggAnModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />

    </>
  );
};
export default PagAnAdmin;
