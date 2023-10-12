import React from "react";
import Phone from "../../assest/Phone.png";
import Email from "../../assest/Camada_1.png";
import Logo from "../../assest/aPONTE.png";

import "./styles.css";

function Footer() {
  return (
    <div className="container-footer">
      <div className="logo-footer">
        <img src={Logo} alt="Descrição da imagem" />
      </div>
      <div
        className="links-column"
        style={{ position: "relative", left: "-7%" }}
      >
        <a className="link" href="#">
          Notícias
        </a>
        <a className="link" href="#">
          Histótoria
        </a>
        <a className="link" href="#">
          Matéria
        </a>
      </div>
      <div className="links-column">
        <a className="link" href="#">
          Contato
        </a>
        <a className="link" href="#">
          WhatsApp
        </a>
        <a className="link" href="#">
          Agendamento
        </a>
      </div>
      <div className="links-column">
        <a className="link" href="#">
          perfil
        </a>
        <a className="link" href="#">
          Privacidade
        </a>
        <a className="link" href="#">
          Categorias
        </a>
      </div>
      <div style={{ display: "block" }}>
        {" "}
        <div class="card-contact">
          <div className="card-footer-infor">
            <img src={Phone} alt="imagem" />
          </div>
          <div className="card-info">
            <h3 style={{ position: "relative", top: "65px", left: "-20px" }}>
              Fale conosco
            </h3>
            <span style={{ position: "relative", top: "62px", left: "-10px" }}>
              {" "}
              (74) 999-999-777
            </span>
          </div>
        </div>
        <div class="card-contact">
          <div className="card-footer-infor">
            <img src={Email} alt="imagem" />
          </div>
          <div className="card-info">
            <h3 style={{ position: "relative", top: "65px", left: "12px" }}>
              Mande sua Matéria
            </h3>
            <span style={{ position: "relative", top: "62px", left: "30px" }}>
              {" "}
              contato@blogaponte.com.br
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
