import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent = ({ selectedLanguage }) => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`https://newsapi.org/v2/everything?q=peace+justice&apiKey=262a480886c64c4b97b27686d9945894`);
                console.log('API Response:', response.data);
                const articlesWithImages = response.data.articles.filter(article => article.urlToImage);
                setNews(articlesWithImages);
            } catch (error) {
                console.error('Erro ao buscar notícias', error);
                setError('Erro ao buscar notícias');
            }
        };

        fetchNews();
    }, []);

    const translateArticle = async (text) => {
        try {
            const response = await axios.post(`/translate/language/translate/v2`, {}, {
                params: {
                    q: text,
                    target: selectedLanguage,
                    key: 'YOUR_GOOGLE_TRANSLATE_API_KEY'
                }
            });
            return response.data.data.translations[0].translatedText;
        } catch (error) {
            console.error('Erro ao traduzir notícia', error);
            return 'Erro ao traduzir notícia';
        }
    };

    const handleTranslateClick = async (description, index) => {
        const translatedText = await translateArticle(description);
        const updatedNews = news.map((article, i) => i === index ? { ...article, translatedDescription: translatedText } : article);
        setNews(updatedNews);
    };

    return (
        <div className="container">
            <h2>Notícias do Brasil</h2>
            {error && <p>{error}</p>}
            <ul className="list-group">
                {news.map((article, index) => (
                    <li key={index} className="list-group-item">
                        {article.urlToImage && <img src={article.urlToImage} alt={article.title} style={{ width: '100%' }} />}
                        <h5>{article.title}</h5>
                        <p>{article.translatedDescription || article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Leia mais</a>
                        <button onClick={() => handleTranslateClick(article.description, index)}>Traduzir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsComponent;
