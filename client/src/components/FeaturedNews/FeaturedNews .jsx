import React, { useEffect, useState } from "react";
import "./FeaturedNews.css";

const FeaturedNews = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numberOfNewsToDisplay = 3;
  const PF = "http://localhost:5000/images/";

  const nextNews = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % (posts.length - numberOfNewsToDisplay + 1)
    );
  };

  useEffect(() => {
    const timer = setInterval(nextNews, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const displayedPosts = posts.slice(
    currentIndex,
    currentIndex + numberOfNewsToDisplay
  );

  return (
    <div className="featured-news">
      <div className="titleFeature">
        <span style={{ fontSize: "20px" }} className="featured-title">
          <i className="fas fa-chevron-right" style={{ color: "#da5d23" }}></i>{" "}
          <i className="fas fa-chevron-right" style={{ color: "#da5d23" }}></i>{" "}
          Destaques
        </span>
      </div>
      <div className="featured-card-container">
        {displayedPosts.map((post, index) => (
          <div
            className={`featured-card ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img
              src={PF + post.photo}
              alt={`Imagem ${index + 1}`}
              width={400}
              height={400}
            />
            <h2 className="featured-card-title">{post.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedNews;
