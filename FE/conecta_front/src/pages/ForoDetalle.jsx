import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import FooterHighFashion from "../components/Footer";
import { getData } from "../services/fetch";

const ForoDetalle = () => {
  const { id } = useParams();
  const [foro, setForo] = useState(null);

  useEffect(() => {
    async function cargarForo() {
      const data = await getData("intForo/foro_rud/", id);
      setForo(data);
    }
    cargarForo();
  }, [id]);

  if (!foro) {
    return (
      <>
        <Navbar />
        
        <FooterHighFashion />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="foro-detalle">
        <h2>{foro.nombre_foro}</h2>
        <p>{foro.descripcion_foro}</p>
        <p>Fecha: {new Date(foro.fecha_foro).toLocaleDateString()}</p>
        {foro.imagen_foro && (
          <img src={foro.imagen_foro} alt={foro.nombre_foro} width={400} />
        )}
        <p>Likes: {foro.likes_foro}</p>
      </div>
      <FooterHighFashion />
    </>
  );
};

export default ForoDetalle;