import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, postData, updateData } from "../services/fetch";
import "../styles/ForoDetalle.css";

const ForoDetalle = () => {
  const { id } = useParams();
  const [foro, setForo] = useState(null);
  const [comentariosForo, setComentariosForo] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

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

  const handleEnviarComentario = async () => {
    if (nuevoComentario.trim() === "") return;
    const comentarioData = {
      usuario: localStorage.getItem("id_usuario"),
      foro: id,
      comentario: nuevoComentario,
      fecha_comentario: new Date().toISOString().slice(0, 10),
    };
    await postData("intForo/comentario_foro/", comentarioData);
    const peticion = await getData("intForo/comentario_foro/");
    setComentariosForo(peticion.filter((c) => c.foro == id));
    setNuevoComentario("");
  };

  const handleLike = async () => {
    const likes = foro.likes_foro + 1;
    await updateData({ likes_foro: likes }, "intForo/foro_rud", id + "/");
    setForo({ ...foro, likes_foro: likes });
  };

  if (!foro) return;

  return (
    <div className="foro-detalle">
      <h2>{foro.nombre_foro}</h2>
      <p>{foro.descripcion_foro}</p>
      <p>Fecha: {new Date(foro.fecha_foro).toLocaleDateString()}</p>
      {foro.imagen_foro && (
        <img src={foro.imagen_foro} alt={foro.nombre_foro} />
      )}
      <button className="like-btn" onClick={handleLike}>
        like {foro.likes_foro}
      </button>

      <div className="comentarios">
        <h3>Comentarios</h3>
        {comentariosForo.length === 0 ? (
          <p className="sin-comentarios">No comentarios</p>
        ) : (
          comentariosForo.map((comentario) => (
            <div key={comentario.id} className="comentario-item">
              <p className="comentario-autor">{comentario.nombre_usuario}</p>
              <p>{comentario.comentario}</p>

              <p className="comentario-fecha">
                {new Date(comentario.fecha_comentario).toLocaleDateString()}
              </p>
            </div>
          ))
        )}

        <div className="comment-form">
          <input
            type="text"
            placeholder="Escribe tu comentario"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
          <button onClick={handleEnviarComentario}>Añadir comentario</button>
        </div>
      </div>
    </div>
  );
};

export default ForoDetalle;
