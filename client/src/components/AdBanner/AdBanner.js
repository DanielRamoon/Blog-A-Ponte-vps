import React from "react";
import "./adBanner.css";

const AdBanner = ({ imageUrl }) => {
  return (
    <div className="ad-banner">
      <img src={imageUrl} alt="Banner de Publicidade" />
    </div>
  );
};

export default AdBanner;
