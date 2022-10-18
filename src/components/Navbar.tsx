import { Container, Nav, Navbar as ReactNavbar } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <ReactNavbar variant="light" bg="light">
            <Container>
                <ReactNavbar.Brand href="#">Simple Transfer</ReactNavbar.Brand>
                <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
                <ReactNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Accueil</Link>
                        <Link to="/files" className="nav-link">Fichiers</Link>
                    </Nav>
                </ReactNavbar.Collapse>
            </Container>
        </ReactNavbar>
    )
}