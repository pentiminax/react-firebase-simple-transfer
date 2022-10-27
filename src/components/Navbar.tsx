import { useContext } from "react";
import { Button, Container, Nav, Navbar as ReactNavbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import firebaseService from "../services/firebase"

export default function Navbar() {
    const { currentUser, isLoaded } = useContext(AuthContext);

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
                        {currentUser && <Link to="/sent" className="nav-link">Fichiers envoyés</Link>}
                    </Nav>
                </ReactNavbar.Collapse>
                <div className={isLoaded ? '' : 'd-none'}>
                    {currentUser
                        ?
                        <Button variant="outline-danger" onClick={handleLogout}>Se déconnecter</Button>
                        :
                        <Button variant="primary" onClick={handleLogin}>Se connecter</Button>
                    }
                </div>
            </Container>
        </ReactNavbar >
    )
}