import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getData, postData } from "../services/fetch";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function AggCampModal({ abrirModal, cerrarModal }) {
  const [comunidades, setComunidades] = useState([]);
  const [comunidad, setComunidad] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagen, setImagen] = useState(null);
  const [setReload, setSetReload] = useState(false);

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

  const enviarCampana = async () => {
    let urlImagen = "";
    if (imagen) {
      urlImagen = await imagenCloudinary(imagen);
    }
    const nuevaCampana = {
      comunidad,
      nombre_campana: nombre,
      descripcion_campana: descripcion,
      direccion_campana: direccion,
      fecha_campana: fecha,
      usuario: localStorage.getItem("id_usuario"),
      imagen_campana: urlImagen,
    };
    await postData("intCampanas/campanas/", nuevaCampana);
    setSetReload(true);
    Swal.fire({
      title: "Campaña creada",
      text: "La campaña se ha creado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
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
            <Form.Label>Nombre de Campaña</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de Campaña"
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
          <Form.Group className="mb-3" controlId="direccionInput">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
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
