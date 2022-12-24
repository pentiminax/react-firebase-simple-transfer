import { useContext } from "react";
import { Button, Container, Nav, Navbar as ReactNavbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import firebaseService from "../services/firebase"

export default function Navbar() {
    const { currentUser, isLoaded } = useContext(AuthContext);

    return (
        <ReactNavbar variant="light" bg="light" expand="lg">
            <Container>
                <ReactNavbar.Brand href="#">Simple Transfer</ReactNavbar.Brand>
                <ReactNavbar.Toggle aria-controls="navbar-nav" />
                <ReactNavbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Accueil</Link>
                        <Link to="/files" className="nav-link">Fichiers</Link>
                        {currentUser && <Link to="/sent" className="nav-link">Fichiers envoyés</Link>}
                    </Nav>
                    <div className={isLoaded ? '' : 'd-none'}>
                        {currentUser
                            ?
                            <Button variant="outline-danger" onClick={async () => await firebaseService.signOut()}>Se déconnecter</Button>
                            :
                            <Button variant="primary" onClick={async () => await firebaseService.signInWithGoogle()}>Se connecter</Button>
                        }
                    </div>
                </ReactNavbar.Collapse>
            </Container>
        </ReactNavbar >
    )
}