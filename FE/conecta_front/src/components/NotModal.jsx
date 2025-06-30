import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

function NotModal({ abrirModal, cerrarModal, noticias }) {   

    const [news, setNews] = useState([]);
    const [descripcionNoticiaEditar, setDescripcionNoticiaEditar] = useState("");
    const [imagenNoticiaEditar, setImagenNoticiaEditar] = useState("");
    const [titularNoticiaEditar, setTitularNoticiaEditar] = useState("");
    useEffect(() => { 
      if(noticias){
        setDescripcionNoticiaEditar(noticias.descripcion_noticia);
        setImagenNoticiaEditar(noticias.imagen_noticia);
        setTitularNoticiaEditar(noticias.titular_notica);
      } 

      async function fetchNews() {
        const newsGet = await getData("intNoticias/noticia_get/") || [];
        setNews(newsGet);
      }
      fetchNews();
    }, [noticias]);

    async function editProd(id) {  
      let editInfo = { 
        "descripcion_noticia": descripcionNoticiaEditar,
        "imagen_noticia": imagenNoticiaEditar,
        "titular_notica": titularNoticiaEditar,
      };
      await updateData(editInfo,"intNoticias/noticia_rud", id);
      Swal.fire({
        title: "Noticia Editada",
        text: "La noticia ha sido editada exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
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
                <Form.Label>Noticia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titulo de la noticia"
                  onChange={(e) => setTitularNoticiaEditar(e.target.value)}
                  autoFocus
                  value={titularNoticiaEditar || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="descripcionInput">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  autoFocus
                  value={descripcionNoticiaEditar || ""}
                  onChange={(e) => setDescripcionNoticiaEditar(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="imagenInput">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imagen"
                  autoFocus
                  value={imagenNoticiaEditar || ""}
                  onChange={(e) => setImagenNoticiaEditar(e.target.value)}
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
                await editProd(noticias.id);
                cerrarModal();
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default NotModal;

