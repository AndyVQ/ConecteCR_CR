import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from "react";
import { getData, updateData } from "../services/fetch";

function VotModal({ abrirModal, cerrarModal, votaciones }) {   

    const [votes, setVotes] = useState([]);
    const [comunidades, setComunidades] = useState([]);
    const [nombreVotacionEditar, setNombreVotacionEditar] = useState("");
    const [descripcionVotacionEditar, setDescripcionVotacionEditar] = useState("");
    const [imagenVotacionEditar, setImagenVotacionEditar] = useState("");
    const [comunidadVotacionEditar, setComunidadVotacionEditar] = useState("");

    useEffect(() => { 
      if(votaciones){
        setComunidadVotacionEditar(
          votaciones.comunidad ? Number(votaciones.comunidad) : ""
        );
        setNombreVotacionEditar(votaciones.nombre_Votacion);
        setDescripcionVotacionEditar(votaciones.descripcion_Votacion);
        setImagenVotacionEditar(votaciones.imagen_Votacion);
      } 

      async function fetchCampaigns() {
        const votesGet = await getData("intVotaciones/votaciones_get/") || [];
        setVotes(votesGet);
      }
      fetchCampaigns();
      async function fetchComunidades() {
        const comunidadesGet = await getData("comunidades/comunidades_get/") || [];
        setComunidades(comunidadesGet);
      }
      fetchComunidades(); 
    }, [votaciones]);

    async function editProd(id) {  
      let editInfo = { 
        "comunidad": comunidadVotacionEditar,
        "nombre_votacion": nombreVotacionEditar,
        "descripcion_votacion": descripcionVotacionEditar,
        "imagen_votacion": imagenVotacionEditar, 
      };
      await updateData(editInfo,"intVotaciones/votaciones_rud", id);
    }

    return (
      <>
        <Modal show={abrirModal} onHide={cerrarModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>    
              <Form.Group className="mb-3" controlId="comunidadSelect">
                <Form.Label>Comunidad</Form.Label>
                <select
                  name="Comunidad"
                  className="form-control"
                  value={comunidadVotacionEditar || ""}
                  onChange={e => setComunidadVotacionEditar(Number(e.target.value))}
                >
                  <option value="" disabled>Seleccione una comunidad</option>
                  {comunidades.map((comunidad, index) => (
                    <option key={index} value={comunidad.id}>
                      {comunidad.nombre_comunidad}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="votacionInput">
                <Form.Label>Votacion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de la Votacion"
                  onChange={(e) => setNombreVotacionEditar(e.target.value)}
                  autoFocus
                  value={nombreVotacionEditar || ""}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="descripcionInput">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  autoFocus
                  value={descripcionVotacionEditar || ""}
                  onChange={(e) => setDescripcionVotacionEditar(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="imagenInput">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Imagen"
                  autoFocus
                  value={imagenVotacionEditar || ""}
                  onChange={(e) => setImagenVotacionEditar(e.target.value)}
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
                await editProd(votaciones.id);
                cerrarModal();
              }}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default VotModal;


