import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getData, postData } from '../services/fetch';

function AggNotModal({ abrirModal, cerrarModal }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const enviarNoticia = async () => {
    const nuevaNoticia = {
      descripcion_noticia: descripcion,
      fecha_noticia: fecha,
      imagen_noticia: 'abc',
      titular_notica: nombre,
      usuario: 1,
    };
    await postData('intNoticias/noticia_create/', nuevaNoticia);
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Noticia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreInput">
            <Form.Label>Nombre de la Noticia</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la Noticia"
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
        <Button
          variant="primary"
          onClick={async () => {
            await enviarNoticia();
            if (cerrarModal) cerrarModal();
          }}
        >
          Guardar Noticia
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggNotModal;
