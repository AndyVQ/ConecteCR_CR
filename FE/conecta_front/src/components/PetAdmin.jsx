import React from 'react'
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import PetModal from './PetModal';
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function PetAdmin() {
    const [petitions, setPetitions] = useState([]);
    const [search, setSearch] = useState("")
    const [reload, setReload] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);
    const [infoPeticion, setInfoPeticion] = useState(null)
  
    useEffect(() => {
      async function fetchPetitions() {
        const petitionsGet = await getData("intPeticiones/peticiones_get/") || [];
        setPetitions(petitionsGet);
      }
      fetchPetitions();
    }, [petitions]);

  const filtarPeticion = petitions.filter(petition =>
  String(petition.nombre_peticion || "").toLowerCase().includes(search.toLowerCase()) ||
  String(petition.usuario || "").toLowerCase().includes(search.toLowerCase()) ||
  String(petition.comunidad || "").toLowerCase().includes(search.toLowerCase()) ||
  String(petition.descripcion_peticion || "").toLowerCase().includes(search.toLowerCase()) ||
  String(petition.fecha_peticion || "").toLowerCase().includes(search.toLowerCase()) 
);

function abrirModalPeticion(peticion) {
  setInfoPeticion(peticion);
  setAbrirModal(true);
}

function cerrarModalPeticion() {
  setInfoPeticion(null);
  setAbrirModal(false);
}

async function deleteProd(id) { 
  await deleteData("intPeticiones/peticiones_rud", id);
  setReload(!reload);
  Swal.fire({
    title: "¡Éxito!",
    text: "Petición eliminada correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}
  
  return (
     <div className="dashboard-container">
      <div className="main-content">
        <h2>Peticiones</h2>
        <input type="text" placeholder="Buscar Peticiones" className="admin-search-1"
        value={search}
        onChange={e => setSearch(e.target.value)}/>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comunidad</th>
              <th>Peticion</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarPeticion.map((peticion, index) => (
              <tr key={index}>
                <td>{peticion.nombre_usuario}</td>
                <td>{peticion.nombre_comunidad}</td>
                <td>{peticion.nombre_peticion}</td>
                <td>{peticion.descripcion_peticion}</td>
                <td>{peticion.fecha_peticion}</td>
                <td>{peticion.estado_peticion}</td>
                <td>
                  <button onClick={() => abrirModalPeticion(peticion)}>✏️</button>
                  <button onClick={() => deleteProd(peticion.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && 
        <PetModal abrirModal={abrirModal} cerrarModal={cerrarModalPeticion} peticiones={infoPeticion}/>
        }
      </div>
    </div>
  );
};
export default PetAdmin