import "../styles/CardVotacion.css";
import { useState } from "react";

const CardVotacion = ({
  titulo,
  descripcion,
  comunidad,
  fecha,
  cantVotos,
  onVotar,
  disabled,
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="card-votacion">
      <input value={cantVotos} className="cont-votos" readOnly />
      <h3 className="titulo-votacion">{titulo}</h3>
      <p className="descripcion-votacion">{descripcion}</p>
      <p className="fecha-votacion">Fecha: {fecha}</p>
      <p className="comunidad-votacion">Comunidad: {comunidad}</p>
      <button
        onClick={() => {
          setClicked(true);
          onVotar();
        }}
        disabled={disabled}
        className={`mx-auto d-flex mt-3 btn btn-success votar-btn ${clicked ? "clicked" : ""}`}
      >
        {disabled ? "Gracias" : "Votar"}
      </button>
    </div>
  );
};

export default CardVotacion;