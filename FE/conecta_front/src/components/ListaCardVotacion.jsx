import CardVotacion from "./CardVotacion";
import { getData, postData } from "../services/fetch";
import { useState, useEffect } from "react";

const ListaCardVotacion = () => {
  const [votaciones, setVotaciones] = useState([]);
  const [votos, setVotos] = useState({});
  const [yaVote, setYaVote] = useState({});

  const votosVotacion = async (id) => {
    const datos =
      (await getData("intVotaciones/votos_votacion/", id + "/")) || [];
    const filtrado = datos.filter((v) => v.votacion === id);
    setVotos((prev) => ({
      ...prev,
      [id]: filtrado.length,
    }));
    const userId = localStorage.getItem("id_usuario");
    const ya = datos.some((a) => String(a.usuario) === String(userId));
    setYaVote((prev) => ({
      ...prev,
      [id]: ya,
    }));
  };

  useEffect(() => {
    async function cargarVotaciones() {
      const datos = (await getData("intVotaciones/votaciones_get/")) || [];
      setVotaciones(datos);
      datos.forEach((vot) => {
        votosVotacion(vot.id);
      });
    }
    cargarVotaciones();
  }, []);

  async function votar(id) {
    const datos = {
      usuario: localStorage.getItem("id_usuario"),
      votacion: id,
      cantidad_voto: 1,
    };
    const resp = await postData("intVotaciones/votos/", datos);
    if (!resp.detail) {
      votosVotacion(id);
      setYaVote((prev) => ({ ...prev, [id]: true }));
    }
  }

  return (
    <>
      {votaciones.map((v) => (
        <CardVotacion
          key={v.id}
          titulo={v.nombre_votacion}
          descripcion={v.descripcion_votacion}
          fecha={v.fecha_votacion}
          comunidad={v.nombre_comunidad}
          cantVotos={votos[v.id] || 0}
          onVotar={() => votar(v.id)}
          disabled={yaVote[v.id]}
        />
      ))}
    </>
  );
};

export default ListaCardVotacion;
