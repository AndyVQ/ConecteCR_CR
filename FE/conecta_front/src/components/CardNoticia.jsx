import "../styles/cardNot.css";


function CardNoticia({ title, description, imageUrl, link }) {
  return (
    <div className="container">
    <div className="card-noticia">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="imagen-card-noticia" />
      )}
      <div className="contenido-card-noticia">
        <h3 className="titulo-card-noticia">{title}</h3>
        <p className="descripcion-card-noticia">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-card-noticia"
          >
            Leer más
          </a>
        )}
      </div>
    </div>
    </div>
    
  );
}

export default CardNoticia;
