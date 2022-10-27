import Home from './pages/Home';
import File from './pages/File';
import Sent from './pages/Sent';
import RequestFile from './pages/RequestFile';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/Login/Index';
import './App.scss'
import Navbar from './components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Container className="my-5">
                    <Row>
                        <Col xl={{ span: 6, offset: 3 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/files/" element={<RequestFile />} />
                                <Route path="/files/:id" element={<File />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/sent" element={<Sent />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
