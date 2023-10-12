import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import "./sectionTop.css";
import Logo from "../../../src/assest/aPONTE.png";

const sectionTop = memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="section-top">
        <div className="section-title">BEM VINDO A</div>
        <div className="section-date">
          <i className="fa fa-calendar-check-o section-icon"></i>
          {currentDate.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
        </div>
      </div>
      <div className="social-icons">
        <i className="fa fa-facebook"></i>
        <a href="https://www.instagram.com/blogaponteoficial/" target="_blank">
          <i className="fa fa-instagram"></i>
        </a>
        <i className="fa fa-youtube"></i>
        <i className="fa fa-twitter"></i>
      </div>

      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logomarca" className="logo-img" />
        </Link>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Pesquisa"
          className="search-input"
          style={{ color: "red" }}
        />
        <i className="fa fa-search search-icon"></i>
      </div>
    </>
  );
});

export default sectionTop;
