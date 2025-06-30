import "../styles/cardNotQ.css";


function CardNoticiaQ({ title, description, imageUrl, link }) {
  return (
    <div className="containerQ">
    <div className="card-noticiaQ">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="imagen-card-noticia" />
      )}
      <div className="contenido-card-noticiaQ">
        <h3 className="titulo-card-noticiaQ">{title}</h3>
        <p className="descripcion-card-noticiaQ">{description}</p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-card-noticiaQ"
          >
            Leer más
          </a>
        )}
      </div>
    </div>
    </div>
    
  );
}

export default CardNoticiaQ;
