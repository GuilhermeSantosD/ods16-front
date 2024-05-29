import React from 'react';
import NewsComponent from '../components/newsComponent';

const Home = ({ selectedLanguage }) => {
    return (
        <div className="container">
            <h1>Bem-vindo à Plataforma ODS 16</h1>
            <p>Aqui você pode enviar denúncias, acompanhar processos judiciais, solicitar ajuda em emergências e muito mais.</p>
            <NewsComponent selectedLanguage={selectedLanguage} />
        </div>
    );
};

export default Home;
