import Home from './pages/Home';
import File from './pages/File';
import RequestFile from './pages/RequestFile';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login/Index';
import './App.scss'
import { useEffect, useState } from 'react';
import firebaseService from './services/firebase';
import Navbar from './components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import { User } from 'firebase/auth';

function App() {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        firebaseService.auth.onAuthStateChanged(user => {
            setUser(user);
        })
    }, []);

    return (
        <BrowserRouter>
            <Navbar user={user} />
            <Container className="my-5">
                <Row>
                    <Col xl={{ span: 6, offset: 3 }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/files/" element={<RequestFile />} />
                            <Route path="/files/:id" element={<File />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>

    )
}

export default App
