import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function ComModal({ abrirModal, cerrarModal, comunidades }) {
  const [comunidades2, setComunidades] = useState([]);
  const [nombreComunidadEditar, setNombreComunidadEditar] = useState("");
  const [direccionComunidadEditar, setDireccionComunidadEditar] = useState("");

  useEffect(() => {
    async function fetchComunidades() {
      const comunidadesGet =
        (await getData("comunidades/comunidades_get/")) || [];
      setComunidades(comunidadesGet);
    }
    fetchComunidades();
  }, [comunidades2]);

  async function editProd(id) { 
    let editInfo = {
      nombre_comunidad: nombreComunidadEditar,
      direccion_comunidad: direccionComunidadEditar,
    };
    await updateData(editInfo, "comunidades/comunidades_rud", id);
    Swal.fire({
      title: "Comunidad Editada",
      text: "La comunidad ha sido editada exitosamente.",
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
            <Form.Group className="mb-3" controlId="comunidadInput">
              <Form.Label>Comunidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la comunidad"
                onChange={(e) => setNombreComunidadEditar(e.target.value)}
                autoFocus
                value={nombreComunidadEditar}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcionInput">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Direccion"
                autoFocus
                value={direccionComunidadEditar}
                onChange={(e) => setDireccionComunidadEditar(e.target.value)}
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
              await editProd(comunidades.id);
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

export default ComModal;
