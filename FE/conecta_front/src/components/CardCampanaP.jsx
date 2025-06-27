  import "../styles/CardCampanaP.css";
  import { useState } from "react";

  const CardCampanaP = ({
    titulo,
    descripcion,
    comunidad,
    fecha,
    direccion,
    cantApoyos,
    onApoyar,
    disabled,
    imagenUrl,
  }) => {
    const [clicked, setClicked] = useState(false);
    return (
      <div className="card-campana">
        <span className="cont-apoyos">{cantApoyos}</span>
        <h3 className="titulo-campana">{titulo}</h3>
        <p className="descripcion-campana">{descripcion}</p>
        <p className="direccion-campana">Dirección: {direccion} </p>
        <p className="fecha-campana">Fecha: {fecha}</p>
        <p className="comunidad-campana">Comunidad: {comunidad}</p>
        {imagenUrl && (
          <img src={imagenUrl} alt={titulo} className="imagen-campana" width={150}  height={150}/>
        )}
        <button
          onClick={() => {
            setClicked(true);
            onApoyar();
          }}
          disabled={disabled}
          className={`mx-auto d-flex mt-3 btn btn-success apoyar-btn ${
            clicked ? "clicked" : ""
          }`}
        >
          {disabled ? "Gracias" : "Apoyar"}
        </button>
      </div>
    );
  };

  export default CardCampanaP;
