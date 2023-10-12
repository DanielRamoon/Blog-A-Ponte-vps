import React, { useState } from "react";
import axios from "axios";

export default function NewsForm({ onPublish }) {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", title);
      formData.append("description", description);

      // Fazer uma requisição POST para enviar os dados da nova notícia para a API
      const response = await axios.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Chamar a função onPublish para atualizar o estado publishedNews com a nova notícia
      onPublish(response.data);

      // Limpar os campos do formulário
      setImageFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Criar Notícia</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="imageFile">Imagem:</label>
          <input
            type="file"
            id="imageFile"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}
