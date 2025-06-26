import { useEffect, useState } from "react";
import { getData } from "../services/fetch";

const CardForo = () => {
  const [foros, setForos] = useState([]);

 useEffect(() => {
    async function traerForos() {
      const peticion = await getData("intForo/foro_create/");
      setForos(peticion);
      console.log(peticion);
    }
    traerForos();
  }, []);

  return (
    <div className="foro-container">
      {foros.map((foro) => (
        <div className="foro" key={foro.id_foro}>
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
          <button>Ver más</button>
        </div>
      ))}
    </div>
  );
};

export default CardForo;
