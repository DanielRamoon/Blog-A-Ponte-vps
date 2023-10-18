import React from "react";
import CenterPubli from "../../components/centerPubli/centerPubli";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="publi-about">
          <CenterPubli />
        </div>
      </div>

      <h1>
        <i className="fas fa-chevron-right" style={{ color: "#da5d23" }}></i>{" "}
        <i className="fas fa-chevron-right" style={{ color: "#da5d23" }}></i>{" "}
        Nossa História
      </h1>
      <div className="about-text">
        <p>
         HISTÓRICO: "A Ponte" - Canal de notícias do Vale do São Francisco, região e de todo o Estado. Com foco no jornalismo independente, o blog "A Ponte" agrega notícias no viés político, social, econômico e opiniões da comunidade local.

Fundado em 2023, é um projeto que vem aguçar tudo o que o leitor/internauta busca para se manter bem informado.
        </p>
        <p>
          EXPERIÊNCIA: Com uma equipe perspicaz que atua no mercado da comunicação há mais de cinco anos, vasta atuação com redação jornalística, produção de conteúdo e formação na área de comunicação servem de pilares para uma excelência na credibilidade de conteúdo.
        </p>
        <p>
          MISSÃO: Nossa missão é manter forte o conhecimento da notícia de forma qualitativa para o leitor, trazendo assim as necessidades para quem busca o melhor conteúdo e superar suas expectativas.
        </p>
        <p>
          VISÃO: Consolidar "A Ponte" e disponibilizar a plataforma de forma clara e objetiva para os leitores.

VALORES: Inovação; Qualidade e Transparência
        </p>
              </div>
      {/* <div className="slidebar-about">
        <Sidebar />
      </div> */}
    </div>
  );
}

export default About;
