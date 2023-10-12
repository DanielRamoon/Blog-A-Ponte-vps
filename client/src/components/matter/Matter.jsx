import React from "react";
import logo from "../../assest/aPONTE.png";
import "./Matter.css";

const Matter = () => {
  return (
    <div className="matter-container">
      <div className="sidebarItem">
        <a href="https://www.instagram.com/ronnynhoqueirozjua/" target="_blank">
          <div class="story-circle">
            <img src={logo} alt="" />
          </div>
        </a>

        <p style={{ position: "relative", left: "20px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className="send-news">
        <div className="send-news-title">
          <h2>Envie sua notícia</h2>
          <p>Seja um colaborador do Blog do Blog a Ponte.</p>
          <p>
            Você pode nos enviar matérias, vídeos, fotos e sugestões de pauta.
          </p>
        </div>

        <div className="content-list">
          <p>- Dê um título para seu conteúdo:</p>
          <p>- Descreva seu conteúdo:</p>
          <p>- Aconteceu em:</p>
          <p>- Local:</p>
          <p style={{ fontWeight: "bold" }}>
            Envie tudo para contato@blogaponte.com.br
          </p>
        </div>

        <button className="whatsapp-button">
          <a
            href="https://wa.me/seu_numero_de_telefone"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            Chama no ZAP
          </a>
        </button>
      </div>
    </div>
  );
};

export default Matter;
