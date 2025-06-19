import "../styles/CardPeticion.css";

const CardPeticion = ({ titulo, descripcion, comunidad, fecha }) => {
  return (
    <div className="card-peticion">
      <h3 className="titulo-peticion">{titulo}</h3>
      <p className="descripcion-peticion">{descripcion}</p>
      <p className="comunidad-peticion">Comunidad: {comunidad}</p>
      <p className="fecha-peticion">Fecha: {fecha}</p>
    </div>
  );
};

export default CardPeticion;