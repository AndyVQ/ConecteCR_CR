import "../styles/CardAnuncio.css";

const CardAnuncio = ({ titulo, descripcion, comunidad, fecha, tipo, Img }) => {
  return (
    <div className="card-anuncio">
      <div className={`burbuja ${tipo === "grave" ? "grave" : "normal"}`}>
        {tipo === "grave" ? "!" : "\u2713"}
      </div>
      <h3 className="titulo-anuncio">{titulo}</h3>
      <p className="descripcion-anuncio">{descripcion}</p>
      <p className="comunidad-anuncio">Comunidad: {comunidad}</p>
      <p className="fecha-anuncio">Fecha: {fecha}</p>
      {Img && (
        <img src={Img} alt="Imagen del anuncio" className="imagen-anuncio" />
      )}
    </div>
  );
};

export default CardAnuncio;
