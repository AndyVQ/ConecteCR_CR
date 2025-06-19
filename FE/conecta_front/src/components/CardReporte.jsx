import "../styles/CardReporte.css";

const CardReporte = ({ titulo, descripcion, direccion, comunidad, fecha, imagen, gravedad }) => {
  return (
    <div className="card-reporte">
      <h3 className="titulo-reporte">{titulo}</h3>
      <p className="descripcion-reporte">{descripcion}</p>
      <p className="direccion-reporte">Dirección: {direccion}</p>
      <p className="fecha-reporte">Fecha: {fecha}</p>
      <p className="comunidad-reporte">Comunidad: {comunidad}</p>
      <p className="gravedad-reporte">Gravedad: {gravedad}</p>
      {imagen && <img className="imagen-reporte" src={imagen} alt={titulo} />}
    </div>
  );
};

export default CardReporte;