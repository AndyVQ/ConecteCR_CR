import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getData, postData } from '../services/fetch';
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";


function AggPetModal({ abrirModal, cerrarModal }) {
  const [comunidades, setComunidades] = useState([]);
  const [comunidad, setComunidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    async function cargarComunidades() {
      const datos = (await getData('comunidades/comunidades_create/')) || [];
      setComunidades(datos);
    }
    cargarComunidades();
  }, []);

  const enviarPeticion = async () => {
    const nuevaPeticion = {
      comunidad,
      nombre_peticion: nombre,
      descripcion_peticion: descripcion,
      fecha_peticion: fecha,
      usuario: localStorage.getItem("id_usuario"),
    };
    await postData('intPeticiones/peticiones_create/', nuevaPeticion);
    Swal.fire({
          title: "Petición Enviada",
          text: "Su petición está siendo revisada por un administrador.",
          icon: "success",
          confirmButtonText: "Listo",
        });
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Petición</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="comunidadSelect">
            <Form.Label>Comunidad</Form.Label>
            <Form.Select value={comunidad} onChange={e => setComunidad(e.target.value)}>
              <option value="">Selecciona comunidad</option>
              {comunidades.map(c => (
                <option key={c.id} value={c.id}>{c.nombre_comunidad}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombreInput">
            <Form.Label>Nombre de Petición</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de Petición"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionInput">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fechaInput">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Close
        </Button>
        <Button variant="primary" onClick={async () => { await enviarPeticion(); if (cerrarModal) cerrarModal(); }}>
          Guardar Petición
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggPetModal;