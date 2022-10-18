import Home from './pages/Home';
import File from './pages/File';
import RequestFile from './pages/RequestFile';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Index';
import './App.scss'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/files/" element={<RequestFile/>} />
            <Route path="/files/:id" element={<File/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
    )
}

export default App
