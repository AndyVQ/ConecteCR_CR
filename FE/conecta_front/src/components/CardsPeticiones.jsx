import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CardPeticion from "./CardPeticion";

const CardsPeticiones = () => {
  const [peticiones, setPeticiones] = useState([]);

  useEffect(() => {
    async function cargarPeticiones() {
      const datos = (await getData("intPeticiones/peticiones_get/")) || [];
      const aprobadas = datos.filter(p => p.estado_peticion === "aprobada");
      setPeticiones(aprobadas);
    }
    cargarPeticiones();
  }, []);

  return (
    <>
      {peticiones.map((pet) => (
        <CardPeticion
          key={pet.id}
          titulo={pet.nombre_peticion}
          descripcion={pet.descripcion_peticion}
          fecha={pet.fecha_peticion}
          comunidad={pet.nombre_comunidad}
        />
      ))}
    </>
  );
};

export default CardsPeticiones;