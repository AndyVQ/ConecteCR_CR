import React from 'react'
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import AnModal from './AnModal';

function AnAdmin() {
    const [announce, setAnnounce] = useState([]);
    const [search, setSearch] = useState("")
    const [reload, setReload] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);
    const [infoAnuncio, setInfoAnuncio] = useState(null)
  
    useEffect(() => {
      async function fetchAnnounce() {
        const announceGet = await getData("intAnuncio/anuncio_get/") || [];
        setAnnounce(announceGet);
      }
      fetchAnnounce();
    }, [announce]);

  const filtarAnuncio = announce.filter(Anuncio =>
  String(Anuncio.nombre_anuncio || "").toLowerCase().includes(search.toLowerCase()) ||
  String(Anuncio.usuario || "").toLowerCase().includes(search.toLowerCase()) ||
  String(Anuncio.comunidad || "").toLowerCase().includes(search.toLowerCase()) ||
  String(Anuncio.descripcion_anuncio || "").toLowerCase().includes(search.toLowerCase()) ||
  String(Anuncio.fecha_anuncio || "").toLowerCase().includes(search.toLowerCase()) 
);

function abrirModalAnuncio(anuncio) {
  setInfoAnuncio(anuncio);
  setAbrirModal(true);
}

function cerrarModalAnuncio() {
  setInfoAnuncio(null);
  setAbrirModal(false);
}

async function deleteProd(id) { 
  await deleteData("intAnuncio/anuncio_rud", id);
  setReload(!reload);
}
  
  return (
     <div className="dashboard-container">
      <div className="main-content">
        <h2>Anuncios</h2>
        <input type="text" placeholder="Buscar Anuncios" className="admin-search-1"
        value={search}
        onChange={e => setSearch(e.target.value)}/>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comunidad</th>
              <th>Anuncio</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarAnuncio.map((anuncio, index) => (
              <tr key={index}>
                <td>{anuncio.nombre_usuario}</td>
                <td>{anuncio.nombre_comunidad}</td>
                <td>{anuncio.nombre_anuncio}</td>
                <td>{anuncio.descripcion_anuncio}</td>
                <td>{anuncio.fecha_anuncio}</td>
                <td>
                  <button onClick={() => abrirModalAnuncio(anuncio)}>✏️</button>
                  <button onClick={() => deleteProd(anuncio.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && 
        <AnModal abrirModal={abrirModal} cerrarModal={cerrarModalAnuncio} anuncios={infoAnuncio}/>
        }
      </div>
    </div>
  );
};
export default AnAdmin