import React from 'react'
import "../styles/campAdmin.css";
import { useState, useEffect } from "react";
import { getData, deleteData } from "../services/fetch";
import NotModal from './NotModal';


function NotAdmin() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
  const [infoNoticia, setInfoNoticia] = useState(null)

  useEffect(() => {
    async function fetchNews() {
      const newsGet = await getData("intNoticias/noticia_get/") || [];
      setNews(newsGet);
    }
    fetchNews();
  }, [news]);

const filtarNews = news.filter(news =>
  String(news.titular_notica || "").toLowerCase().includes(search.toLowerCase()) ||
  String(news.usuario || "").toLowerCase().includes(search.toLowerCase()) ||
  String(news.descripcion_noticia || "").toLowerCase().includes(search.toLowerCase()) ||
  String(news.fecha_noticia || "").toLowerCase().includes(search.toLowerCase()) 
);

function abrirModalNoticia(noticia) {
  setInfoNoticia(noticia);
  setAbrirModal(true);
}

function cerrarModalNoticia() {
  setInfoNoticia(null);
  setAbrirModal(false);
  setReload(!reload)
}

async function deleteProd(id) { 
  await deleteData("intNoticias/noticia_rud", id);
  setReload(!reload);
}

  return (
     <div className="dashboard-container">
      <div className="main-content">
        <h2>Noticias</h2>
        <input type="text" placeholder="Buscar Noticias" className="admin-search-1"
        value={search}
        onChange={e => setSearch(e.target.value)}/>
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Noticia</th>
              <th>Descripción</th>
              <th>Fecha de creación</th>
              <th>Imagen</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filtarNews.map((news, index) => (
              <tr key={index}>
                <td>{news.nombre_usuario}</td>
                <td>{news.titular_notica}</td>
                <td>{news.descripcion_noticia}</td>
                <td>{news.fecha_noticia}</td>
                <td>{news.imagen_noticia}</td>
                <td>
                  <button>👁️</button>
                  <button onClick={() => abrirModalNoticia(news)}>✏️</button>
                  <button onClick={() => deleteProd(news.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {abrirModal && 
        <NotModal abrirModal={abrirModal} cerrarModal={cerrarModalNoticia} noticias={infoNoticia}/>
        }
        </div>
    </div>
  );
};
export default NotAdmin
