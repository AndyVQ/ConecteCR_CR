import React, { useState, useEffect } from 'react';
import "../styles/AdminHome.css";
import { getData } from "../services/fetch";
import { Carousel } from 'react-bootstrap';
import Chart from "react-apexcharts";

function Admin() {
  const [campaigns, setCampaigns] = useState(0);
  const [petitions, setPetitions] = useState(0);
  const [votes, setVotes] = useState(0);
  const [reports, setReports] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(0);
  const [comunidades, setComunidades] = useState(0);
  const [comunidadesNames, setComunidadesNames] = useState([]);
  const [reportsCount, setReportsCount] = useState(0);
  const [news, setNews] = useState(0);
  const [forum, setForum] = useState(0);
  const [announcements, setAnnouncements] = useState(0);
  const [forumLikes, setForumLikes] = useState(0);
  const [forumComment, setForumComment] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const usersGet = await getData("usuarios/usuarios_get/") || [];
      setUsers(usersGet.length);
    }
    async function fetchCampaings() {
      const campaingsGet = await getData("intCampanas/campanas_get/") || [];
      setCampaigns(campaingsGet.length);
    }
    async function fetchNews() {
      const newsGet = await getData("intNoticias/noticia_get/") || [];
      setNews(newsGet.length);
    }
    async function fetchForum() {
      const forumGet = await getData("intForo/foro_get/") || [];
      setForum(forumGet.length);
    }
    async function fetchAnnouncements() {
      const announcementsGet = await getData("intAnuncio/anuncio_get/") || [];
      setAnnouncements(announcementsGet.length);
    }
    async function fetchPetitions() {
      const petitionsGet = await getData("intPeticiones/peticiones_get/") || [];
      setPetitions(petitionsGet.length);
    }
    async function fetchVotes() {
      const votesGet = await getData("intVotaciones/votaciones_get/") || [];
      setVotes(votesGet.length);
    }
    async function fetchReportsCount() {
      const reportsCountGet = await getData("intReportes/reportes_get/") || [];
      setReportsCount(reportsCountGet.length);
    }
    async function fetchReports() {
      const reportsGet = await getData("intReportes/reportes_get/") || [];
      setReports(reportsGet);
    }
    async function fetchFotosCamp() {
      const photosGet = await getData("intCampanas/campanas_get/") || [];
      const urls = photosGet.map(p => p.imagen_campana);
      setPhotos(urls);
    }
      async function fetchComunidades() {
      const comunidadesGet = await getData("comunidades/comunidades_get/") || [];
      setComunidades(comunidadesGet);
    }
    async function fetchComunidadesName() {
      const NameGet = await getData("comunidades/comunidades_get/") || [];
      const names = NameGet.map(p => p.nombre_comunidad);
      setComunidadesNames(names);
    }
    async function fetchForumLikes() {
      const likesGet = await getData("intForo/foro_get/") || [];
      const likesTotales = likesGet.reduce((acumulador, foro) => acumulador + (foro.likes_foro || 0), 0);
      console.log(likesTotales);
      setForumLikes(likesTotales)
    }
    async function fetchForumComentario() {
      const commentGet = await getData("intForo/comentario_foro/") || [];
      const commentsTotales = commentGet.length
      console.log(commentsTotales);
      setForumComment(commentsTotales);
    }

    fetchCampaings();
    fetchPetitions();
    fetchVotes();
    fetchReports();
    fetchFotosCamp();
    fetchUsers();
    fetchComunidades();
    fetchComunidadesName();
    fetchReportsCount();
    fetchNews();
    fetchForum();
    fetchAnnouncements();
    fetchForumLikes(),
    fetchForumComentario()
  }, []);

  const filtrarReports = reports.filter(report =>
    report.nombre_reporte.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-home">
      <div className="admin-top-cards">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Panel de control</h3>
            <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR" />
          </div>
          <div className="admin-card-body">
            <p className="admin-users-info1">Campañas Activas <span className="admin-value">{campaigns}</span></p>
            <p className="admin-users-info1">Peticiones Realizadas <span className="admin-value">{petitions}</span></p>
            <p className="admin-users-info1">Votaciones Activas <span className="admin-value">{votes}</span></p>
            <p className="admin-users-info1">Reportes realizados <span className="admin-value">{reportsCount}</span></p>
            <p className="admin-users-info1">Noticias publicadas <span className="admin-value">{news}</span></p>
            <p className="admin-users-info1">Foros activos <span className="admin-value">{forum}</span></p>
            <p className="admin-users-info1">Anuncios publicados <span className="admin-value">{announcements}</span></p>
          </div>
        </div>

        {/* Reportes */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Reportes vecinales</h3>
            <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR" />
          </div>
          <div className="admin-card-body">
            {filtrarReports.map((report, index) => (
              <div key={index} className="admin-report">
                <p>{report.nombre_reporte}</p>
                <span>{new Date(report.fecha_reporte).toLocaleDateString()}</span>
              </div>
            ))}
            <input
              type="text"
              placeholder="Buscar reportes"
              className="admin-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Carousel de fotos */}
        <div className="admin-card admin-carousel-card">
          <div className="admin-card-header">
            <h3>Fotos Compartidas</h3>
            <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR" />
          </div>
          <div className="admin-card-body">
            <div className="admin-photo-carousel">
              <Carousel controls indicators={photos.length > 1} interval={null}>
                {photos.length > 0 ? (
                  photos.map((url, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        className="d-block"
                        src={url}
                        alt={`Foto ${idx + 1}`}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <div>
                      <p>Sin fotos disponibles</p>
                    </div>
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas: Dos gráficos */}
      <div className="admin-stats-wrapper">
        <div className="admin-card admin-stats-card">
          <div className="admin-card-header">
            <h3>Estadísticas</h3>
            <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR" />
          </div>
          <div className="admin-card-body">
            <p className="admin-users-info">
              Total de Usuarios Registrados: <span className="admin-value">{users}</span>
            </p>
            <p className="admin-users-info">
              Total de Comunidades Registradas: <span className="admin-value">{comunidades.length}</span>
            </p>
            <p className="admin-users-info">
              Comunidades Registradas: <span className="admin-value">{comunidadesNames.join(", ")}</span>
            </p>
          </div>
        </div>

        {/* Gráfico 2 */}
        <div className="admin-card admin-stats-card">
          <div className="admin-card-header">
            <h3>Estadísticas Comparativas</h3>
            <img src="\src\img\logo sin fondo.png" alt="Logo ConecteCR" />
          </div>
          <div className="admin-card-body">
            <Chart
              options={{
                chart: { type: "pie" },
                labels: ["Cantidad de Foros", "Cantidad de Likes", "Cantidad de Comentarios"]
              }}
              series={[forum, forumLikes, forumComment]}
              type="pie"
              width="100%"
              height="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
