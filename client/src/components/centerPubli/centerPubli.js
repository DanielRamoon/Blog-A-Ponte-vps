import React, { useState, useEffect } from "react";
import "./centerPubli.css";
import Banner from "../../assest/estado.png";

function CenterPubli() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   // Função para alternar as imagens a cada 3 segundos (3000 milissegundos)
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) =>
  //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 7000);

  //   // Limpa o intervalo quando o componente é desmontado
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="container-publi">
      <div className="container-img">
        <img src={Banner} alt="Publicidade" />
      </div>
    </div>
  );
}

export default CenterPubli;
