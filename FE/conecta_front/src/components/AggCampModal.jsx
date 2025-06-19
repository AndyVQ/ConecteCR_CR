import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getData, postData } from '../services/fetch';

function AggCampModal({ abrirModal, cerrarModal }) {
  const [comunidades, setComunidades] = useState([]);
  const [comunidad, setComunidad] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    async function cargarComunidades() {
      const datos = (await getData('comunidades/comunidades_create/')) || [];
      setComunidades(datos);
    }
    cargarComunidades();
  }, []);
  
  const enviarCampana = async () => {
    const nuevaCampana = {
      comunidad,
      nombre_campana: nombre,
      descripcion_campana: descripcion,
      direccion_campana: direccion,
      fecha_campana: fecha,
      imagen_campana: 'abc',
      usuario: 1,
    };
    await postData('intCampanas/campanas/', nuevaCampana);
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar campaña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="comunidadSelect">
            <Form.Label>Comunidad</Form.Label>
            <Form.Select
              value={comunidad}
              onChange={e => setComunidad(e.target.value)}
            >
              <option value="">Selecciona comunidad</option>
              {comunidades.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nombre_comunidad}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombreInput">
            <Form.Label>Nombre de Campaña</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de Campaña"
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
          <Form.Group className="mb-3" controlId="direccionInput">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
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
            await enviarCampana();
            if (cerrarModal) cerrarModal();
          }}
        >
          Guardar campaña
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggCampModal;
