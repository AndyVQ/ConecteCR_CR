import React from 'react'
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import ForoModal from './ForoModal';
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function ForoAdmin() {
    const [forum, setForum] = useState([]);
    const [search, setSearch] = useState("")
    const [reload, setReload] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);
    const [infoForo, setInfoForo] = useState(null)
  
    useEffect(() => {
      async function fetchForum() {
        const forumGet = await getData("intForo/foro_get/") || [];
        setForum(forumGet);
      }
      fetchForum();
    }, [forum]);

  const filtarForo = forum.filter(forum =>
  String(forum.nombre_foro || "").toLowerCase().includes(search.toLowerCase()) ||
  String(forum.usuario || "").toLowerCase().includes(search.toLowerCase()) ||
  String(forum.comunidad || "").toLowerCase().includes(search.toLowerCase()) ||
  String(forum.descripcion_foro || "").toLowerCase().includes(search.toLowerCase()) ||
  String(forum.fecha_foro || "").toLowerCase().includes(search.toLowerCase()) 
);

function abrirModalForo(foro) {
  setInfoForo(foro);
  setAbrirModal(true);
}

function cerrarModalForo() {
  setInfoForo(null);
  setAbrirModal(false);
}

async function deleteProd(id) { 
  await deleteData("intForo/foro_rud", id +"/");
  setReload(!reload);
  Swal.fire({
    title: "Foro Eliminado",
    text: "El foro ha sido eliminado exitosamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}
  
  return (
     <div className="dashboard-container">
      <div className="main-content">
        <h2>Foros</h2>
        <input type="text" placeholder="Buscar Foros" className="admin-search-1"
        value={search}
        onChange={e => setSearch(e.target.value)}/>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comunidad</th>
              <th>Foro</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarForo.map((foro, index) => (
              <tr key={index}>
                <td>{foro.nombre_usuario}</td>
                <td>{foro.nombre_comunidad}</td>
                <td>{foro.nombre_foro}</td>
                <td>{foro.descripcion_foro}</td>
                <td>{foro.fecha_foro}</td>
                <td>
                  <button onClick={() => abrirModalForo(foro)}>✏️</button>
                  <button onClick={() => deleteProd(foro.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && 
        <ForoModal abrirModal={abrirModal} cerrarModal={cerrarModalForo} foros={infoForo}/>
        }
      </div>
    </div>
  );
};
export default ForoAdmin