import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CardAnuncio from "./CardAnuncio";

const CardsAnuncios = () => {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    async function cargarAnuncios() {
      const datos = (await getData("intAnuncio/anuncio_get/")) || [];
      setAnuncios(datos);
    }
    cargarAnuncios();
  }, []);

  return (
    <>
      {anuncios.map((anu) => (
        <CardAnuncio
          key={anu.id}
          titulo={anu.nombre_anuncio}
          descripcion={anu.descripcion_anuncio}
          fecha={anu.fecha_anuncio}
          comunidad={anu.nombre_comunidad}
          tipo={anu.tipo_anuncio}
          Img={anu.imagen_anuncio ? anu.imagen_anuncio : null}
        />
      ))}
    </>
  );
};

export default CardsAnuncios;
