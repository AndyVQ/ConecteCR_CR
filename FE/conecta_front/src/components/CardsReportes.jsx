import { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import CardReporte from "./CardReporte";

const CardsReportes = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    async function cargarReportes() {
      const datos = (await getData("intReportes/reportes_get/")) || [];
      const aprobados = datos.filter(r => r.estado_reporte === "aprobada");
      setReportes(aprobados);
    }
    cargarReportes();
  }, []);

  return (
    <>
      {reportes.map(rep => (
        <CardReporte
          key={rep.id}
          titulo={rep.nombre_reporte}
          descripcion={rep.descripcion_reporte}
          direccion={rep.direccion_reportes}
          fecha={rep.fecha_reporte}
          comunidad={rep.nombre_comunidad}
          gravedad={rep.gravedad_reporte}
          imagen={rep.imagen_reporte}
        />
      ))}
    </>
  );
};

export default CardsReportes;