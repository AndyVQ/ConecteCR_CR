import "../styles/CardAnuncio.css";

const CardAnuncio = ({ titulo, descripcion, comunidad, fecha, tipo, Img }) => {
  return (
    <div className="card-anuncio-vertical">
      {Img && (
        <img src={Img} alt="Imagen del anuncio" className="imagen-anuncio-vertical" />
      )}
      <div className="contenido-card-vertical">
        <div className={`burbuja-vertical ${tipo === "grave" ? "grave" : "normal"}`}>
          {tipo === "grave" ? "!" : "i"}
        </div>
        <h3 className="titulo-anuncio-vertical">{titulo}</h3>
        <p className="descripcion-anuncio-vertical">{descripcion}</p>
        <p className="comunidad-anuncio-vertical">Comunidad: {comunidad}</p>
        <p className="fecha-anuncio-vertical">Fecha: {fecha}</p>
      </div>
    </div>
  );
};

export default CardAnuncio;

