import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import './App.css';

const App = () => {
    const [isSideMenuVisible, setIsSideMenuVisible] = useState(true);
    const [language, setLanguage] = useState('pt');

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    const toggleSideMenu = () => {
        setIsSideMenuVisible(!isSideMenuVisible);
    };

    return (
        <div className="app">
            <Navbar onLanguageChange={handleLanguageChange} toggleSideMenu={toggleSideMenu} />
            <div className="main-content">
                {isSideMenuVisible && <SideMenu />}
                <div className="content">
                    {/* Conteúdo principal aqui */}
                </div>
            </div>
        </div>
    );
};

export default App;
