import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";

function AnModal({ abrirModal, cerrarModal, anuncios }) {   

    const [announce, setAnnounce] = useState([]);
    const [nombreAnuncioEditar, setNombreAnuncioEditar] = useState("");
  const [descripcionAnuncioEditar, setDescripcionAnuncioEditar] = useState("");
  const [tipoAnuncioEditar, setTipoAnuncioEditar] = useState("normal");

    useEffect(() => { 
        if(anuncios){
        setNombreAnuncioEditar(anuncios.nombre_anuncio);
        setDescripcionAnuncioEditar(anuncios.descripcion_anuncio);
        setTipoAnuncioEditar(anuncios.tipo_anuncio);
      }

      async function fetchAnnounce() {
        const announceGet = await getData("intAnuncio/anuncio_get/") || [];
        setAnnounce(announceGet);
      }
      fetchAnnounce();
    }, [anuncios]);

    async function editProd(id) {  
      let editInfo = {
        "nombre_anuncio": nombreAnuncioEditar,
        "descripcion_anuncio": descripcionAnuncioEditar,
        "tipo_anuncio": tipoAnuncioEditar,
      };
      await updateData(editInfo,"intAnuncio/anuncio_rud", id);
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
                <Form.Label>Anuncio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titulo del Anuncio"
                  onChange={(e) => setNombreAnuncioEditar(e.target.value)}
                  autoFocus
                  value={nombreAnuncioEditar || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="descripcionInput">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  autoFocus
                  value={descripcionAnuncioEditar || ""}
                  onChange={(e) => setDescripcionAnuncioEditar(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tipoEditar">
                <Form.Label>Tipo de anuncio</Form.Label>
                <Form.Select
                  value={tipoAnuncioEditar}
                  onChange={(e) => setTipoAnuncioEditar(e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="grave">Grave</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModal}>
              Close
            </Button>
            <Button variant="primary" 
              onClick={async () => {
                await editProd(anuncios.id);
                cerrarModal();
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default AnModal;

