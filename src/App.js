import './App.css';
import SideMenu from "./components/sidemenu";
import {Route, Routes} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import {isAuthenticated} from "./service/auth";
import Login from "./pages/Login";
import React, {useState} from "react";
import NovoDenuncia from "./pages/Denuncia/cadastro";
import ListaDenuncias from "./pages/Denuncia/listagem";
import EditarDenuncia from "./pages/Denuncia/editar";
import Register from "./pages/Register";


function App() {
    const [language, setLanguage] = useState('pt');

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <div className="wrapper">
            {!isAuthenticated() ? <Login/> : (
                <>
                    <Navbar onLanguageChange={handleLanguageChange} />
                    <SideMenu />
                    <div className="content-wrapper">
                        <Routes>
                            <Route path="/" element={<Home selectedLanguage={language} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                        <AuthProvider>
                            <Routes>
                                <Route path="/" element={<Home selectedLanguage={language} />} />
                                <Route path="/denuncia/novo" element={<NovoDenuncia />} />
                                <Route path="/denuncia/lista" element={<ListaDenuncias />} />
                                <Route path="/denuncias/editar/:id" element={<EditarDenuncia />} />
                            </Routes>
                        </AuthProvider>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
