import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getData, postData } from '../services/fetch';


function AggAnModal({ abrirModal, cerrarModal }) {
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

  const enviarAnuncio = async () => {
    const nuevaAnuncio = {
      comunidad,
      nombre_anuncio: nombre,
      descripcion_anuncio: descripcion,
      fecha_anuncio: fecha,
      usuario: 1,
    };
    await postData('intAnuncio/anuncio_create/', nuevaAnuncio);
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Anuncio</Modal.Title>
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
            <Form.Label>Nombre del Anuncio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Anuncio"
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
        <Button variant="primary" onClick={async () => { await enviarAnuncio(); if (cerrarModal) cerrarModal(); }}>
          Guardar Anuncio
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggAnModal;