import React, { useEffect, useState } from 'react';
import './Rdv.css';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    db,
    createRdv
} from "../../firebase";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import { Button, Card, Row, Col, Modal, Form } from 'react-bootstrap/';
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Rdv() {

    const navigate = useNavigate();
    const [user, loadingUser] = useAuthState(auth);

    /** 
     * Check if user is connected
     */
    useEffect(() => {
        if (!loadingUser && !user) {
            navigate('/signin');
        }
    }, [user, loadingUser, navigate]);

    const [value, loading, error] = useCollectionData(collection(db, 'prestataires'));
    const [tag, setTag] = useState(<p>En cours de chargement</p>);
    const [lieu] = useState("");
    const [date, setDate] = useState("");
    const [currentPrestataireNom, setCurrentPrestataireNom] = useState("");
    const [currentPrestataireId, setCurrentPrestataireId] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        createRdv(date, currentPrestataireId, lieu);
    };

    useEffect(() => {
        if (!loading && value) {
            let arrayPrestaParagraphe = [];
            value.forEach((presta, index) => {
                arrayPrestaParagraphe.push(setPrestaCard(presta, index));
            })

            setTag(arrayPrestaParagraphe);
        }
    }, [value, loading, error]);

    function setPrestaCard(presta, index) {
        return (
            <Col className='d-flex justify-content-center' key={index}>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title className='d-flex align-items-center'><BsFileEarmarkPersonFill className='me-1' />{presta.nom}</Card.Title>
                        <Card.Text className='d-flex align-items-center'>
                            <GiPositionMarker /> {presta.adresse}
                        </Card.Text>
                        <Button variant="primary" onClick={(event) => { handleShow(event); setCurrentPrestataireNom(presta.nom); setCurrentPrestataireId(presta.uid) }} >Prendre RDV</Button>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    return (
        <div className="Rdv container mt-5">
            <Row>
                {tag}
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rendez-vous {currentPrestataireNom}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Date RDV</Form.Label>
                            <Form.Control type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={(event) => { handleClose(event); handleClick() }}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default Rdv;
