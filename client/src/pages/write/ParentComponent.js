import React, { useEffect, useState } from "react";
import axios from "axios";

const Write = ({ onCategoryAdded }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    try {
      const response = await axios.post("/api/posts", {
        title,
        category,
        // Outros campos do post...
      });
      // Verificar se o post foi criado com sucesso
      if (response.status === 200) {
        // Limpar os campos do formulário após a publicação
        setTitle("");
        setCategory("");

        // Chamar a função onCategoryAdded para atualizar a lista de categorias
        if (onCategoryAdded) {
          onCategoryAdded(category);
        }

        // Redirecionar para a página do novo post (opcional)
        // window.location.href = `/post/${response.data.postId}`;
      }
    } catch (error) {
      console.log(error);
      // Lógica para lidar com erros de publicação do post
    }
  };

  useEffect(() => {
    // Lógica para obter a lista de categorias do servidor
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        // Lógica para lidar com erros ao obter categorias
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Campos do formulário */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
