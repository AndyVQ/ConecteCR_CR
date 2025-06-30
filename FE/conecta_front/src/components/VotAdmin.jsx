import React from "react";
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import VotModal from "./VotModal";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function VotAdmin() {
  const [votes, setVotes] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [infoVotacion, setInfoVotacion] = useState(null);

  const filtarVotacion = votes.filter(
    (vote) =>
      String(vote.nombre_votacion || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(vote.usuario || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(vote.comunidad || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(vote.descripcion_votacion || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(vote.fecha_votacion || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  useEffect(() => {
    async function fetchPetitions() {
      const votesGet = (await getData("intVotaciones/votaciones_get/")) || [];
      setVotes(votesGet);
    }
    fetchPetitions();
  }, [filtarVotacion]);

  function abrirModalVotacion(votacion) {
    setInfoVotacion(votacion);
    setAbrirModal(true);
  }

  function cerrarModalVotacion() {
    setInfoVotacion(null);
    setAbrirModal(false);
  }

  async function deleteProd(id) {
    await deleteData("intVotaciones/votaciones_rud", id);
    setReload(!reload);
    Swal.fire({
      title: "¡Éxito!",
      text: "Votación eliminada correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2>Votaciones</h2>
        <input
          type="text"
          placeholder="Buscar Votaciones"
          className="admin-search-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comunidad</th>
              <th>Votacion</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarVotacion.map((votacion, index) => (
              <tr key={index}>
                <td>{votacion.nombre_usuario}</td>
                <td>{votacion.nombre_comunidad}</td>
                <td>{votacion.nombre_votacion}</td>
                <td>{votacion.descripcion_votacion}</td>
                <td>{votacion.fecha_votacion}</td>
                <td>
                  <button onClick={() => abrirModalVotacion(votacion)}>
                    ✏️
                  </button>
                  <button onClick={() => deleteProd(votacion.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && (
          <VotModal
            abrirModal={abrirModal}
            cerrarModal={cerrarModalVotacion}
            votaciones={infoVotacion}
          />
        )}
      </div>
    </div>
  );
}
export default VotAdmin;
