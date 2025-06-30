import React from "react";
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import CampModal from "./CampModal";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function CampAdmin() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [infoCampana, setInfoCampana] = useState(null);

  useEffect(() => {
    async function fetchCampaigns() {
      const campaignsGet = (await getData("intCampanas/campanas_get/")) || [];
      setCampaigns(campaignsGet);
    }
    fetchCampaigns();
  }, [campaigns]);

  const filtarCampana = campaigns.filter(
    (campaign) =>
      String(campaign.nombre_campana || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(campaign.usuario || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(campaign.comunidad || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(campaign.descripcion_campana || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(campaign.fecha_campana || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(campaign.direccion_campana || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  function abrirModalCampana(campana) {
    setInfoCampana(campana);
    setAbrirModal(true);
  }

  function cerrarModalCampana() {
    setInfoCampana(null);
    setAbrirModal(false);
    setReload(!reload);
  }

  async function deleteProd(id) {
    await deleteData("intCampanas/campanas_rud", id + "/");
    setReload(!reload);
    Swal.fire({
      title: "¡Éxito!",
      text: "Campaña eliminada correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2>Campañas</h2>
        <input
          type="text"
          placeholder="Buscar Campañas"
          className="admin-search-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comunidad</th>
              <th>Campaña</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Dirección</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarCampana.map((campaign, index) => (
              <tr key={index}>
                <td>{campaign.nombre_usuario}</td>
                <td>{campaign.nombre_comunidad}</td>
                <td>{campaign.nombre_campana}</td>
                <td>{campaign.descripcion_campana}</td>
                <td>{campaign.fecha_campana}</td>
                <td>{campaign.direccion_campana}</td>
                <td>
                  <button onClick={() => abrirModalCampana(campaign)}>
                    ✏️
                  </button>
                  <button onClick={() => deleteProd(campaign.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && (
          <CampModal
            abrirModal={abrirModal}
            cerrarModal={cerrarModalCampana}
            campanas={infoCampana}
          />
        )}
      </div>
    </div>
  );
}
export default CampAdmin;
