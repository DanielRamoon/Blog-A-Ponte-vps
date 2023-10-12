import React, { useState, useEffect } from "react";
import "./header.css";
import Publish from "../publishCenter/centerPubli";

export default function Header({ posts }) {
  const latestPosts = posts.slice(-6);
  const PF = "http://localhost:5000/images/";

  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [selectedSideImageIndex, setSelectedSideImageIndex] = useState(null);
  const [newsTitles, setNewsTitles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        prevIndex === latestPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [latestPosts]);

  return (
    <>
      <Publish />
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm"></span>
        </div>
        <div className="imageGrid">
          <div className="sideImages">
            {latestPosts.slice(0, 3).map((post, index) => (
              <div
                className={`sideImage ${
                  index === currentPostIndex ? "active" : ""
                } ${selectedSideImageIndex === index ? "selected" : ""}`}
                key={index}
                onClick={() => setSelectedSideImageIndex(index)}
              >
                <img
                  className={`sideImg ${
                    index === currentPostIndex ? "active" : ""
                  }`}
                  src={PF + post.photo}
                  alt="img"
                />
                <h2 className="imageTitleInside">{post.title}</h2>
              </div>
            ))}
          </div>
          <div className="centerImage">
            <div className="centerImgWrapper">
              <img
                className="centerImg"
                src={
                  selectedSideImageIndex !== null
                    ? PF + latestPosts[selectedSideImageIndex]?.photo
                    : PF + latestPosts[currentPostIndex]?.photo
                }
                alt=""
              />
            </div>
            <div className="imageInfo">
              <h3 className="imageTitle">
                {
                  latestPosts[
                    selectedSideImageIndex !== null
                      ? selectedSideImageIndex
                      : currentPostIndex
                  ]?.title
                }
              </h3>
              <p className="imageDescription">
                {
                  latestPosts[
                    selectedSideImageIndex !== null
                      ? selectedSideImageIndex
                      : currentPostIndex
                  ]?.description
                }
              </p>
            </div>
          </div>
          <div className="sideImages">
            {latestPosts.slice(-3).map((post, index) => (
              <div
                className={`sideImage ${
                  index === currentPostIndex ? "active" : ""
                } ${
                  selectedSideImageIndex === index + latestPosts.length - 3
                    ? "selected"
                    : ""
                }`}
                key={index}
                onClick={() =>
                  setSelectedSideImageIndex(index + latestPosts.length - 3)
                }
              >
                <div>
                  {" "}
                  <img
                    className={`sideImg ${
                      index === currentPostIndex ? "active" : ""
                    }`}
                    src={PF + post.photo}
                    alt=""
                  />
                  <h2 className="imageTitleInside2">{post.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
