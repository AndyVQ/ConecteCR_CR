import CardCampanaP from "./CardCampanaP";
import { getData, postData } from "../services/fetch";
import { useState, useEffect } from "react";

const ListaCardCampanaP = () => {
  const [campanas, setCampanas] = useState([]);
  const [apoyos, setApoyos] = useState({});
  const [yaVote, setYaVote] = useState({});

  const apoyosCampana = async (id) => {
    const datos = (await getData("intCampanas/apoyos_campana/", id + "/")) || [];
    const filtradoApoyos = datos.filter((campana_apoyo) => campana_apoyo.campana === id);
    setApoyos((prev) => ({
      ...prev,
      [id]: filtradoApoyos.length,
    }));
    const userId = localStorage.getItem("id_usuario");
    const ya = datos.some((a) => String(a.usuario) === String(userId));
    setYaVote((prev) => ({
      ...prev,
      [id]: ya,
    }));
  };

  useEffect(() => {
    async function cargarCampanas() {
      const datos = (await getData("intCampanas/campanas/")) || [];
      setCampanas(datos);
      datos.forEach((campana) => {
        apoyosCampana(campana.id);
      });
    }

    cargarCampanas();
  }, []);

   async function apoyarCampana(id) {
    const datos = {
      usuario: localStorage.getItem("id_usuario"),
      campana: id,
      cantidad_apoyo: 1,
    };
    const resp = await postData("intCampanas/apoyos/", datos);
    if (!resp.detail) {
      apoyosCampana(id);
      setYaVote((prev) => ({ ...prev, [id]: true }));
    }
  }

  return (
    <>
      {campanas.map((Camp) => {
        return (
          <CardCampanaP
            key={Camp.id}
            titulo={Camp.nombre_campana}
            descripcion={Camp.descripcion_campana}
            direccion={Camp.direccion_campana}
            fecha={Camp.fecha_campana}
            comunidad={Camp.nombre_comunidad}
            cantApoyos={apoyos[Camp.id] || 0}
            onApoyar={() => apoyarCampana(Camp.id)}
            disabled={yaVote[Camp.id]}
            imagenUrl={Camp.imagen_campana}
          />
        );
      })}
    </>
  );
};

export default ListaCardCampanaP;
