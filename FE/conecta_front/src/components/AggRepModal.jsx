import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getData, postData } from '../services/fetch';

function AggRepModal({ abrirModal, cerrarModal }) {
  const [comunidades, setComunidades] = useState([]);
  const [comunidad, setComunidad] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState('');
  const [gravedad, setGravedad] = useState('LEVE');

  useEffect(() => {
    async function cargarComunidades() {
      const datos = (await getData('comunidades/comunidades_create/')) || [];
      setComunidades(datos);
    }
    cargarComunidades();
  }, []);

  const enviarReporte = async () => {
    const nuevoReporte = {
      comunidad,
      nombre_reporte: nombre,
      descripcion_reporte: descripcion,
      fecha_reporte: fecha,
      direccion_reportes: direccion,
      imagen_reporte: imagen,
      gravedad_reporte: gravedad,
      usuario: 1,
    };
    await postData('intReportes/reportes_create/', nuevoReporte);
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Reporte</Modal.Title>
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
            <Form.Label>Nombre del Reporte</Form.Label>
            <Form.Control type="text" placeholder="Nombre del Reporte" value={nombre} onChange={e => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionInput">
          </Form.Group>
          <Form.Group className="mb-3" controlId="direccionInput">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
          </Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
          <Form.Group className="mb-3" controlId="fechaInput">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="gravedadSelect">
            <Form.Label>Gravedad</Form.Label>
            <Form.Select value={gravedad} onChange={e => setGravedad(e.target.value)}>
              <option value="LEVE">Leve</option>
              <option value="MEDIA">Media</option>
              <option value="ALTA">Alta</option>
            </Form.Select>
          <Form.Group className="mb-3" controlId="imagenInput">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="text" placeholder="URL o base64" value={imagen} onChange={e => setImagen(e.target.value)} />
          </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Close
        </Button>
        <Button variant="primary" onClick={async () => { await enviarReporte(); if (cerrarModal) cerrarModal(); }}>
          Guardar Reporte
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggRepModal;