import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getData, postData } from "../services/fetch";

function AggAnModal({ abrirModal, cerrarModal }) {
  const [comunidades, setComunidades] = useState([]);
  const [comunidad, setComunidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState("normal");
  const [imagen, setImagen] = useState("");

  const imagenCloudinary = async (foto) => {
    const formData = new FormData();
    formData.append("file", foto);
    formData.append("upload_preset", "imagen_pag");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dzaysmn8f/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
    console.log("URL de la imagen:", data.secure_url);

    return data.secure_url;
  };

  useEffect(() => {
    async function cargarComunidades() {
      const datos = (await getData("comunidades/comunidades_create/")) || [];
      setComunidades(datos);
    }
    cargarComunidades();
  }, []);

  const enviarAnuncio = async () => {
    let urlImagen = "";
    if (imagen) {
      urlImagen = await imagenCloudinary(imagen);
    }
    const nuevaAnuncio = {
      comunidad,
      nombre_anuncio: nombre,
      descripcion_anuncio: descripcion,
      fecha_anuncio: fecha,
      tipo_anuncio: tipo,
      usuario: localStorage.getItem("id_usuario"),
      imagen_anuncio: urlImagen,
    };
    console.log(nuevaAnuncio);

    const peticion = await postData("intAnuncio/anuncio_create/", nuevaAnuncio);
    console.log(peticion);
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
            <Form.Select
              value={comunidad}
              onChange={(e) => setComunidad(e.target.value)}
            >
              <option value="">Selecciona comunidad</option>
              {comunidades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre_comunidad}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="nombreInput">
            <Form.Label>Nombre del Anuncio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Anuncio"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="descripcionInput">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fechaInput">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tipoSelect">
            <Form.Label>Tipo de anuncio</Form.Label>
            <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="grave">Grave</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="imgInput">
              <Form.Label>Imagen del Reporte</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </Form.Group>
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
            await enviarAnuncio();
            if (cerrarModal) cerrarModal();
          }}
        >
          Guardar Anuncio
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggAnModal;
