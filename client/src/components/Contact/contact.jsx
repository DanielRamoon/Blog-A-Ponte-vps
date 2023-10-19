import React, { useState } from "react";
import CenterPubli from "../centerPubli/centerPubli";
import "./contact.css";

function Contact() {
  const [inputs, setInputs] = useState({
    name: true,
    email: true,
    message: true,
  });

  const handleInputFocus = (inputName) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: false,
    }));
  };

  const handleInputBlur = (inputName, event) => {
    if (event.target.value === "") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [inputName]: true,
      }));
    }
  };

  return (
    <div className="container">
      <div className="contact-h2">
        <h2>Contato</h2>
      </div>
      <form className="form">
        <input
          type="text"
          placeholder={inputs.name ? "Nome" : ""}
          id="name"
          style={{ margin: "10px", height: "30px" }}
          onFocus={() => handleInputFocus("name")}
          onBlur={(event) => handleInputBlur("name", event)}
        />
        <input
          type="email"
          placeholder={inputs.email ? "Email" : ""}
          id="email"
          style={{ margin: "10px", height: "30px" }}
          onFocus={() => handleInputFocus("email")}
          onBlur={(event) => handleInputBlur("email", event)}
        />
        <textarea
          placeholder={inputs.message ? "Mensagem" : ""}
          id="message"
          rows="4"
          style={{ margin: "10px" }}
          onFocus={() => handleInputFocus("message")}
          onBlur={(event) => handleInputBlur("message", event)}
        ></textarea>
        <button className="button" type="submit">
          Enviar
        </button>
      </form>
      <div
        style={{ width: "100%" , marginLeft: "4%" }}
        className="publi-contact"
      >
        <CenterPubli />
      </div>
    </div>
  );
}

export default Contact;
