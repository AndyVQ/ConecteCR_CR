import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/fetch";
import "../styles/CardForo.css";

const CardForo = () => {
  const [foros, setForos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function traerForos() {
      const peticion = await getData("intForo/foro_create/");
      setForos(peticion);
      console.log(peticion);
    }
    traerForos();
  }, []);

  function enviarForoDetalle(id) {
    localStorage.setItem("foroId",id)
    navigate(`/ForoDetalle/${id}`);
  }

  return (
    <div className="foro-container">
      {foros.map((foro) => (
        <div className="foro-card" key={foro.id}>
          <h2>{foro.nombre_foro}</h2>
          <p>{foro.descripcion_foro}</p>
          <p>Fecha: {new Date(foro.fecha_foro).toLocaleDateString()}</p>
          {foro.imagen_foro && (
            <img
              src={foro.imagen_foro}
              alt={foro.nombre_foro}
              width={200}
              height={200}
            />
          )}
          <p>Likes: {foro.likes_foro}</p>

          <button onClick={() => enviarForoDetalle(foro.id)}>Ver más</button>
        </div>
      ))}
    </div>
  );
};

export default CardForo;
