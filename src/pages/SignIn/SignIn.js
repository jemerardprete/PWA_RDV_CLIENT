import React, { useState } from 'react';
import './SignIn.css';
import { Button, Form } from 'react-bootstrap/';
import { logInWithEmailAndPassword } from '../../firebase';
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleClick(email, password) {
        try {
            await logInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="SignIn">
            <Form className="w-50 mx-auto mt-5">
                <Form.Group className="mb-3">
                    <Form.Label>Adresse Mail</Form.Label>
                    <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={() => handleClick(email, password)}>
                    Se connecter
                </Button>
            </Form>
        </div >
    );
}

export default SignIn;
