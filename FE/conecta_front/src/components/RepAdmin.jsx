import React from 'react'
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import RepModal from './RepModal';

function RepAdmin() {
    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("")
    const [reload, setReload] = useState(false);
    const [abrirModal, setAbrirModal] = useState(false);
    const [infoReporte, setInfoReporte] = useState(null)
  
    useEffect(() => {
      async function fetchReports() {
        const reportsGet = await getData("intReportes/reportes_get/") || [];
        setReports(reportsGet);
      }
      fetchReports();
    }, []);

  const filtarReporte = reports.filter(reports =>
  String(reports.nombre_reporte || "").toLowerCase().includes(search.toLowerCase()) ||
  String(reports.usuario || "").toLowerCase().includes(search.toLowerCase()) ||
  String(reports.comunidad || "").toLowerCase().includes(search.toLowerCase()) ||
  String(reports.descripcion_reporte || "").toLowerCase().includes(search.toLowerCase()) ||
  String(reports.fecha_reporte || "").toLowerCase().includes(search.toLowerCase())
);

function abrirModalReporte(reporte) {
  setInfoReporte(reporte);
  setAbrirModal(true);
}

function cerrarModalReporte() {
  setInfoReporte(null);
  setAbrirModal(false);
}

async function deleteProd(id) { 
  await deleteData("intReportes/reportes_rud", id);
  setReload(!reload);
}
  
  return (
     <div className="dashboard-container">
      <div className="main-content">
        <h2>Reportes</h2>
        <input type="text" placeholder="Buscar Reportes" className="admin-search-1"
        value={search}
        onChange={e => setSearch(e.target.value)}/>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Comunidad</th>
              <th>Reporte</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Imagen</th>
              <th>Gravedad</th>
              <th>estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarReporte.map((reporte, index) => (
              <tr key={index}>
                <td>{reporte.nombre_usuario}</td>
                <td>{reporte.nombre_comunidad}</td>
                <td>{reporte.nombre_reporte}</td>
                <td>{reporte.descripcion_reporte}</td>
                <td>{reporte.fecha_reporte}</td>
                <td>{reporte.imagen_reporte}</td>
                <td>{reporte.gravedad_reporte}</td>
                <td>{reporte.estado_reporte}</td>
                <td>
                  <button onClick={() => abrirModalReporte(reporte)}>✏️</button>
                  <button onClick={() => deleteProd(reporte.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && 
        <RepModal abrirModal={abrirModal} cerrarModal={cerrarModalReporte} reportes={infoReporte}/>
        }
      </div>
    </div>
  );
};
export default RepAdmin