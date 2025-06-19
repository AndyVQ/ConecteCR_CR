import CampAdmin from "../components/CampAdmin";
import AdminNavBar from "../components/AdminNavBar";
import FooterHighFashion from "../components/Footer";
import { useEffect, useState } from "react";
import "../styles/PagCampAdmin.css";
import AggCampModal from "../components/AggCampModal";

const PagAdminCamp = () => {
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
        <CampAdmin />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>

      <AggCampModal abrirModal={abrirModal} cerrarModal={cerrarModalAgg} />
    </>
  );
};
export default PagAdminCamp;
