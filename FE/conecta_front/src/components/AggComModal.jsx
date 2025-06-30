import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getData, postData } from "../services/fetch";

function AggComModal({ abrirModal, cerrarModal, reload, setReload }) {
  const [comunidades, setComunidades] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    async function cargarComunidades() {
      const datos = (await getData("comunidades/comunidades_get/")) || [];
      setComunidades(datos);
    }
    cargarComunidades();
  }, []);

  const enviarComunidad = async () => {
    const nuevaComunidad = {
      nombre_comunidad: nombre,
      direccion_comunidad: direccion,
    };
    await postData("comunidades/comunidades_create/", nuevaComunidad);
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Comunidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreInput">
            <Form.Label>Nombre de la Comunidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la Comunidad"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="direccionInput">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
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
            await enviarComunidad();
            if (cerrarModal) cerrarModal();
          }}
        >
          Guardar Comunidad
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggComModal;
