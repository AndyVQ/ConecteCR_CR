import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function PetModal({ abrirModal, cerrarModal, peticiones }) {
  const [comunidades, setComunidades] = useState([]);
  const [nombrePeticionEditar, setNombrePeticionEditar] = useState("");
  const [descripcionPeticionEditar, setDescripcionPeticionEditar] = useState("");
  const [comunidadPeticionEditar, setComunidadPeticionEditar] = useState("");
  const [estadoPeticionEditar, setEstadoPeticionEditar] = useState("pendiente");

  useEffect(() => {
    if (peticiones) {
      setComunidadPeticionEditar(
        peticiones.comunidad ? Number(peticiones.comunidad) :"");
      setNombrePeticionEditar(peticiones.nombre_peticion);
      setDescripcionPeticionEditar(peticiones.descripcion_peticion);
      setEstadoPeticionEditar(peticiones.estado_peticion || "pendiente");
    }
    async function fetchComunidades() {
      const comunidadesGet =
        (await getData("comunidades/comunidades_get/")) || [];
      setComunidades(comunidadesGet);
    }
    fetchComunidades();
  }, [peticiones]);

  async function editProd(id) {
    let editInfo = {
      comunidad: comunidadPeticionEditar,
      nombre_peticion: nombrePeticionEditar,
      descripcion_peticion: descripcionPeticionEditar,
      estado_peticion: estadoPeticionEditar,
    };
    await updateData(editInfo, "intPeticiones/peticiones_rud", id);
    Swal.fire({
      title: "Petición Editada",
      text: "La petición ha sido editada exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
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
                value={comunidadPeticionEditar || ""}
                onChange={(e) =>
                  setComunidadPeticionEditar(Number(e.target.value))
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
            <Form.Group className="mb-3" controlId="peticionInput">
              <Form.Label>Petición</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la petición"
                onChange={(e) => setNombrePeticionEditar(e.target.value)}
                autoFocus
                value={nombrePeticionEditar}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcionInput">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                autoFocus
                value={descripcionPeticionEditar}
                onChange={(e) => setDescripcionPeticionEditar(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="estadoSelect">
              <Form.Label>Estado</Form.Label>
              <select
                name="Estado"
                className="form-control"
                value={estadoPeticionEditar}
                onChange={(e) => setEstadoPeticionEditar(e.target.value)}
              >
                <option value="pendiente">pendiente</option>
                <option value="rechazada">rechazada</option>
                <option value="aprobada">aprobada</option>
              </select>
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
              await editProd(peticiones.id);
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

export default PetModal;
