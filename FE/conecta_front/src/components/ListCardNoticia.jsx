import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CardNoticia from "./CardNoticia";

const ListCardNoticia = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const traerNoticias = async () => {
      const peticion = await getData("intNoticias/noticia_create/");
      setNoticias(peticion);
    };
    traerNoticias();
  }, []);

  return (
    <>
      {noticias.map((noticia) => {
        return (
          <CardNoticia
            key={noticia.id}
            title={noticia.titular_notica}
            description={noticia.descripcion_noticia}
            imageUrl={noticia.imagen_noticia}
          />
        );
      })}
    </>
  );
};
export default ListCardNoticia;
