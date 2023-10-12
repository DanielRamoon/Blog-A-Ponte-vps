import React, { useState } from "react";
import "./NewsRandom.css";

function NewsRandom() {
  const newsData = [
    {
      id: 1,
      title: "Título da Notícia 1",
      image: "caminho_da_imagem_noticia_1.jpg",
      content: "Conteúdo da Notícia 1...",
    },
    {
      id: 2,
      title: "Título da Notícia 2",
      image: "caminho_da_imagem_noticia_2.jpg",
      content: "Conteúdo da Notícia 2...",
    },
    {
      id: 3,
      title: "Título da Notícia 3",
      image: "caminho_da_imagem_noticia_3.jpg",
      content: "Conteúdo da Notícia 3...",
    },
  ];

  const [selectedNews, setSelectedNews] = useState(null);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
  };

  return (
    <div className="news-container">
      {newsData.map((news) => (
        <div
          className="news-card"
          key={news.id}
          onClick={() => handleNewsClick(news)}
        >
          <div
            className="news-square"
            style={{ backgroundImage: `url(${news.image})` }}
          ></div>
          <p>{news.title}</p>
        </div>
      ))}
      {selectedNews && (
        <div className="news-modal">
          <h2>{selectedNews.title}</h2>
          <img src={selectedNews.image} alt={selectedNews.title} />
          <p>{selectedNews.content}</p>
          <button onClick={() => setSelectedNews(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default NewsRandom;
