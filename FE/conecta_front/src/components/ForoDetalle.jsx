import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../services/fetch";

const ForoDetalle = () => {
  const { id } = useParams();
  const [foro, setForo] = useState(null);
  const [comentariosForo, setComentariosForo] = useState([]);
  useEffect(() => {
    async function cargarForo() {
      const data = await getData(`intForo/foro_rud/${id}/`);
      setForo(data);
    }
    async function traerComentariosForo() {
      const peticion = await getData("intForo/comentario_foro/");
      const comentariosForoFiltrados = peticion.filter(
        (comentario) => comentario.foro == localStorage.getItem("foroId")
      );
      console.log(comentariosForoFiltrados);

      setComentariosForo(comentariosForoFiltrados);
    }
    cargarForo();
    traerComentariosForo();
  }, [id]);

  if (!foro) return;

  return (
    <>
      <div className="foro-detalle">
        <h2>{foro.nombre_foro}</h2>
        <p>{foro.descripcion_foro}</p>
        <p>Fecha: {new Date(foro.fecha_foro).toLocaleDateString()}</p>
        {foro.imagen_foro && (
          <img src={foro.imagen_foro} alt={foro.nombre_foro} />
        )}
        <p>Likes: {foro.likes_foro}</p>
      </div>
      <h2>COMENTARIOS</h2>

      {comentariosForo.length > 0 ? (
        comentariosForo.map((comentario) => {
          return (
            <>
              <p>{comentario.nombre_usuario}</p>
              <p>{comentario.comentario}</p>
              <p>{comentario.fecha_comentario}</p>
            </>
          );
        })
      ) : (
        <h1>SIN COMENTARIOS</h1>
      )}
    </>
  );
};

export default ForoDetalle;
