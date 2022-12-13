import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Container, Navbar } from 'react-bootstrap/';
import {
    auth,
    logout
} from "../../firebase";

const AppHeader = () => {

    const [user] = useAuthState(auth);

    return (
        <nav>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/rdv">RDV APP</Navbar.Brand>
                    {user
                        ?
                        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                            <Button variant="outline-danger" onClick={logout}>Déconnexion</Button>
                        </Navbar.Collapse>
                        :
                        <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                            <Button className="me-2" variant="primary" href="/signin">Connexion</Button>
                            <Button variant="outline-primary" href="/signup">Inscription</Button>
                        </Navbar.Collapse>
                    }
                </Container>
            </Navbar>
        </nav>
    );
};

export default AppHeader;