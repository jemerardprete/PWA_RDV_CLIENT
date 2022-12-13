import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
} from "../../firebase";
import './SignUp.css';
import { Button, Form } from 'react-bootstrap/';

function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading, navigate]);

    return (
        <div className="SignUp">
            <Form className="w-50 mx-auto mt-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Adresse Mail</Form.Label>
                    <Form.Control type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <Form.Control type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={register}>
                    S'inscrire
                </Button>
            </Form>
        </div>
    );
}

export default SignUp;
