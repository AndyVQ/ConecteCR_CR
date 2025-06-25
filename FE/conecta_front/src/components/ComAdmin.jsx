import React from "react";
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import ComModal from "./ComModal";

function ComAdmin() {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [infoComunidad, setInfoComunidad] = useState(null);
  
  const filtrarComunidad = communities.filter(
    (community) =>
      String(community.comunidad || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(community.direccion_comunidad || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );
useEffect(() => {
  async function fetchCommunities() {
    const communitiesGet = (await getData("comunidades/comunidades_get/")) || [];
    setCommunities(communitiesGet);
  }
  fetchCommunities();
}, [filtrarComunidad]);


  function abrirModalComunidad(comunidad) {
    setInfoComunidad(comunidad);
    setAbrirModal(true);
  }

  function cerrarModalComunidad() {
    setInfoComunidad(null);
    setAbrirModal(false);
  }

  async function deleteProd(id) {
    await deleteData("comunidades/comunidades_rud", id);
    setReload(!reload);
  }
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2>Comunidades</h2>
        <input
          type="text"
          placeholder="Buscar Comunidades"
          className="admin-search-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Comunidad</th>
              <th>Dirección</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtrarComunidad.map((community, index) => (
              <tr key={index}>
                <td>{community.nombre_comunidad}</td>
                <td>{community.direccion_comunidad}</td>
                <td>
                  <button onClick={() => abrirModalComunidad(community)}>
                    ✏️
                  </button>
                  <button onClick={() => deleteProd(community.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && (
          <ComModal
            abrirModal={abrirModal}
            cerrarModal={cerrarModalComunidad}
            comunidades={infoComunidad}
          />
        )}
      </div>
    </div>
  );
}
export default ComAdmin;
