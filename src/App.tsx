import Navbar from './components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import './App.scss'
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./components/Home'));
const File = lazy(() => import('./components/File'));
const RequestFile = lazy(() => import('./components/RequestFile'));
const FileSent = lazy(() => import('./components/FileSent'));

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Container className="my-5">
                    <Row>
                        <Col xl={{ span: 6, offset: 3 }}>
                            <Routes>
                                <Route path="/" element={<Suspense><Home /></Suspense>} />
                                <Route path="/files" element={<Suspense><RequestFile /></Suspense>} />
                                <Route path="/files/:id" element={<Suspense><File /></Suspense>} />
                                <Route path="/sent" element={<Suspense><FileSent /></Suspense>} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
