import { useNavigate } from 'react-router-dom'; 
import "../styles/Card.css";

const cardsData = [
  {
    title: 'Noticias Locales',
    description: 'Mantente informado sobre los eventos y noticias más relevantes de tu comunidad.',
    buttonText: 'Leer Más',
    redirectTo: '/pagnoticias' 
  },
  {
    title: 'Anuncios Comunitarios',
    description: 'Publica y descubre anuncios importantes de tu vecindario.',
    buttonText: 'Leer Anuncios',
    redirectTo: '/PagAnunc'
  },
  {
    title: 'Foros de Discusión',
    description: 'Participa en debates y comparte tus opiniones sobre temas locales.',
    buttonText: 'Unirse al Foro',
    redirectTo: '/PagForo' 
  }
];

const CardItem = ({ title, description, buttonText, redirectTo }) => {
  const navigate = useNavigate();  

  
  const handleClick = () => {
    if (redirectTo) {
      navigate(redirectTo); 
    } else {
      alert(`No hay redirección definida para ${title}`);
    }
  };

  return (
    <div className="card">
      <h3 className="card-header">{title}</h3>
      <p className="card-body">{description}</p>
      <button className="card-button" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
};

const Cards = () => (
  <div className="cards-container">
    {cardsData.map((card, idx) => (
      <CardItem
        key={idx}
        title={card.title}
        description={card.description}
        buttonText={card.buttonText}
        redirectTo={card.redirectTo} 
      />
    ))}
  </div>
);

export default Cards;
