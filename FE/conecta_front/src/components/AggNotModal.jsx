import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getData, postData } from "../services/fetch";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function AggNotModal({ abrirModal, cerrarModal }) {
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
    console.log(data);
    console.log("URL de la imagen:", data.secure_url);

    return data.secure_url;
  };

  const enviarNoticia = async () => {
    let urlImagen = "";
    if (imagen) {
      urlImagen = await imagenCloudinary(imagen);
    }
    const nuevaNoticia = {
      descripcion_noticia: descripcion,
      fecha_noticia: fecha,
      titular_notica: nombre,
      usuario: localStorage.getItem("id_usuario"),
      imagen_noticia: urlImagen,
    };
    await postData("intNoticias/noticia_create/", nuevaNoticia);
    Swal.fire({
      title: "Noticia Agregada",
      text: "La noticia ha sido agregada exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
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
            <Form.Label>Imagen campaña</Form.Label>
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
