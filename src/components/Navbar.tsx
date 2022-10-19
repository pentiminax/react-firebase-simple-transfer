import { Button, Container, Nav, Navbar as ReactNavbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import firebaseService from "../services/firebase"

export default function Navbar({ user }) {
    const handleLogin = async () => {
        await firebaseService.signInWithGoogle();
    }

    const handleLogout = async () => {
        await firebaseService.signOut();
    }

    return (
        <ReactNavbar variant="light" bg="light">
            <Container>
                <ReactNavbar.Brand href="#">Simple Transfer</ReactNavbar.Brand>
                <ReactNavbar.Toggle />
                <ReactNavbar.Collapse>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Accueil</Link>
                        <Link to="/files" className="nav-link">Fichiers</Link>
                    </Nav>
                </ReactNavbar.Collapse>
                {user
                    ?
                    <Button variant="outline-danger" onClick={handleLogout}>Se déconnecter</Button>
                    :
                    <Button variant="primary" onClick={handleLogin}>Se connecter</Button>
                }
            </Container>
        </ReactNavbar >
    )
}