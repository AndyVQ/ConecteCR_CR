import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";

function ForoModal({ abrirModal, cerrarModal, foros }) {   

    const [forum, setForum] = useState([]);
    const [nombreForoEditar, setNombreForoEditar] = useState("");
    const [descripcionForoEditar, setDescripcionForoEditar] = useState("");
    const [imagenForoEditar, setImagenForoEditar] = useState("");
    useEffect(() => { 
        if(foros){
        setNombreForoEditar(foros.nombre_foro);
        setDescripcionForoEditar(foros.descripcion_foro);
        setImagenForoEditar(foros.imagen_foro);
      } 

      async function fetchForum() {
        const forumGet = await getData("intForo/foro_get/") || [];
        setForum(forumGet);
      }
      fetchForum();
    }, [foros]);

    async function editProd(id) {  
      let editInfo = { 
        "nombre_foro": nombreForoEditar,
        "descripcion_foro": descripcionForoEditar,
        "imagen_foro": imagenForoEditar,
      };
      await updateData(editInfo,"intForo/foro_rud", id + "/");
    }

    return (
      <>
        <Modal show={abrirModal} onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>   
              <Form.Group className="mb-3" controlId="noticiaInput">
                <Form.Label>Foro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titulo del foro"
                  onChange={(e) => setNombreForoEditar(e.target.value)}
                  autoFocus
                  value={nombreForoEditar || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="descripcionInput">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  autoFocus
                  value={descripcionForoEditar || ""}
                  onChange={(e) => setDescripcionForoEditar(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="imagenInput">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imagen"
                  autoFocus
                  value={imagenForoEditar || ""}
                  onChange={(e) => setImagenForoEditar(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Close
            </Button>
            <Button variant="primary" 
              onClick={async () => {
                await editProd(foros.id);
                cerrarModal();
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ForoModal;

