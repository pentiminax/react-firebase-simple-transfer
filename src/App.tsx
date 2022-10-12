import Home from './pages/Home';
import File from './pages/File';
import { Routes, Route } from "react-router-dom";
import './App.scss'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/file/:id" element={<File/>} />
        </Routes>
    )
}

export default App
