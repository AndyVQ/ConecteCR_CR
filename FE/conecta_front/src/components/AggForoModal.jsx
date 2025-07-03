import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postData } from "../services/fetch";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function AggForoModal({ abrirModal, cerrarModal }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);

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
    return data.secure_url;
  };

  const enviarForo = async () => {
    let urlImagen = "";
    if (imagen) {
      urlImagen = await imagenCloudinary(imagen);
    }
    const nuevoForo = {
      nombre_foro: nombre,
      descripcion_foro: descripcion,
      fecha_foro: fecha,
      usuario: localStorage.getItem("id_usuario"),
      imagen_foro: urlImagen,
    };
    await postData("intForo/foro_create/", nuevoForo);
    Swal.fire({ title: "Agregada con éxito", icon: "success" }).then(() => {
      window.location.reload();
    });
  };

  return (
    <Modal show={abrirModal} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Foro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreInput">
            <Form.Label>Título del Foro</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del Foro"
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
          <Form.Group className="mb-3" controlId="imgInput">
            <Form.Label>Imagen del Foro</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImagen(e.target.files[0])}
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
            await enviarForo();
            if (cerrarModal) cerrarModal();
          }}
        >
          Guardar Foro
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AggForoModal;
