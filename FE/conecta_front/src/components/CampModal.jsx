import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";

function CampModal({ abrirModal, cerrarModal, campanas }) {
  const [campaigns, setCampaigns] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [nombreCampanaEditar, setNombreCampanaEditar] = useState("");
  const [descripcionCampanaEditar, setDescripcionCampanaEditar] = useState("");
  const [direccionCampanaEditar, setDireccionCampanaEditar] = useState("");
  const [imagenCampanaEditar, setImagenCampanaEditar] = useState("");
  const [comunidadCampanaEditar, setComunidadCampanaEditar] = useState("");

  useEffect(() => {
    if (campanas) {
      setComunidadCampanaEditar(
        campanas.comunidad ? Number(campanas.comunidad) : ""
      );
      setNombreCampanaEditar(campanas.nombre_campana);
      setDescripcionCampanaEditar(campanas.descripcion_campana);
      setDireccionCampanaEditar(campanas.direccion_campana);
      setImagenCampanaEditar(campanas.imagen_campana);
    }

    async function fetchCampaigns() {
      const campaignsGet = (await getData("intCampanas/campanas_get/")) || [];
      setCampaigns(campaignsGet);
    }
    fetchCampaigns();
    async function fetchComunidades() {
      const comunidadesGet =
        (await getData("comunidades/comunidades_get/")) || [];
      setComunidades(comunidadesGet);
    }
    fetchComunidades();
  }, []);

  async function editProd(id) {
    let editInfo = {
      comunidad: comunidadCampanaEditar,
      nombre_campana: nombreCampanaEditar,
      descripcion_campana: descripcionCampanaEditar,
      direccion_campana: direccionCampanaEditar,
      imagen_campana: imagenCampanaEditar,
    };
    await updateData(editInfo, "intCampanas/campanas_rud", id + "/");
  }

  return (
    <>
      <Modal show={abrirModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="comunidadSelect">
              <Form.Label>Comunidad</Form.Label>
              <select
                name="Comunidad"
                className="form-control"
                value={comunidadCampanaEditar || ""}
                onChange={(e) =>
                  setComunidadCampanaEditar(Number(e.target.value))
                }
              >
                <option value="" disabled>
                  Seleccione una comunidad
                </option>
                {comunidades.map((comunidad, index) => (
                  <option key={index} value={comunidad.id}>
                    {comunidad.nombre_comunidad}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="campanaImput">
              <Form.Label>Campaña</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la campaña"
                onChange={(e) => setNombreCampanaEditar(e.target.value)}
                autoFocus
                value={nombreCampanaEditar}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcionImput">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                autoFocus
                value={descripcionCampanaEditar}
                onChange={(e) => setDescripcionCampanaEditar(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="direccionImput">
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion"
                autoFocus
                value={direccionCampanaEditar}
                onChange={(e) => setDireccionCampanaEditar(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imagenImput">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imagen"
                autoFocus
                value={imagenCampanaEditar}
                onChange={(e) => setImagenCampanaEditar(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await editProd(campanas.id);
              cerrarModal();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CampModal;
