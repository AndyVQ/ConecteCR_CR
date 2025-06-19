import React from 'react'
import "../styles/AdminHome.css"
import { postData, getData } from "../services/fetch";
import { useState, useEffect } from "react";


function Admin() {

const [campaigns, setCampaigns] = useState(0);
const [petitions, setPetitions] = useState(0);
const [votes, setVotes] = useState(0);
const [reports, setReports] = useState([]);
const [search, setSearch] = useState("")


  useEffect(() => { 

    async function fetchCampaings() {
      const campaingsGet = await getData("intCampanas/campanas_get/") || [];
      setCampaigns(campaingsGet.length); 
    }
    fetchCampaings();
    async function fetchPetitions() {
      const petitionsGet = await getData("intPeticiones/peticiones_get/") || [];
      setPetitions(petitionsGet.length); 
    }
    fetchPetitions();
    async function fetchVotes() {
      const votesGet = await getData("intVotaciones/votaciones_get/") || [];
      setVotes(votesGet.length); 
    }
    fetchVotes(); 

    async function fetchReports() {
      const reportsGet = await getData("intReportes/reportes_get/") || [];
      setReports(reportsGet); 
    }
    fetchReports(); 
    
  }, []);  

    const filtarReports = reports.filter(report =>
    report.nombre_reporte.toLowerCase().includes(search.toLowerCase())
  );

  return (
 <div className="admin-home">
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Panel de control</h3>
          <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR"/>
        </div>
        <div className="admin-card-body">
          <p>Campañas Activas <span className="admin-value">{campaigns}</span></p>
          <p>Peticiones Realizadas <span className="admin-value">{petitions}</span></p>
          <p>Votaciones Activas <span className="admin-value">{votes}</span></p>
          <hr />
          <h4>Campañas</h4>
          <div className="admin-campaign-status">
            <p>Iluminación</p>
            <div className="admin-bar admin-finalized"><span>Finalizada</span></div>
          </div>
          <div className="admin-campaign-status">
            <p>Mejoras al parque</p>
            <div className="admin-bar admin-active"><span>Activa</span></div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Reportes vecinales</h3>
          <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR"/>
        </div>
        <div className="admin-card-body">
          <input type="text" placeholder="Buscar reportes" className="admin-search" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          />
          {filtarReports.map((report, index) => (
            <div key={index} className="admin-report">
              <p>{report.nombre_reporte}</p>
              <span>{new Date(report.fecha_reporte).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Fotos Compartidas</h3>
          <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR"/>
        </div>
        <div className="admin-card-body">
          <div className="admin-photo-carousel">
            <button>{'<'}</button>
          <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR"/>
            <button>{'>'}</button>
          </div>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>Estadísticas</h3>
          <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR"/>
        </div>
        <div className="admin-card-body">
          <div className="admin-chart-placeholder">[Gráfico aquí]</div>
        </div>
      </div>
    </div>
  );  
};
export default Admin