import { useCallback, useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import Sidebar from "../../components/sidebar/Sidebar";
import NewsForm from "../../components/PostCarrossel/NewsForm";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // Novo estado para a nova categoria
  const [filteredCategory, setFilteredCategory] = useState("");

  const { user } = useContext(Context);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data);
        // Defina a primeira categoria como padrão para exibir todas as notícias
        setFilteredCategory(res.data[0]?._id || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Etapa 1: Crie o novo post
      const newPost = {
        username: user.username,
        title,
        desc,
        category,
      };
      console.log("Dados do novo post:", newPost);

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

      const res = await axios.post("/posts", newPost);

      // Etapa 2: Associe o post à categoria selecionada
      await axios.post(
        `/posts/${res.data._id}/assign-category/${category}`,
        {}
      );
      console.log("Post associado à categoria com sucesso!");

      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    if (newCategory) {
      try {
        const res = await axios.post("/categories", { name: newCategory });
        const newCategoryId = res.data._id;

        // Atualiza a lista de categorias
        setCategories([
          ...categories,
          { _id: newCategoryId, name: newCategory },
        ]);

        // Limpa o campo de nova categoria após adicionar
        setNewCategory("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Título"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <select
            className="writeSelect"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              console.log("Categoria selecionada:", e.target.value);
            }}
          >
            <option value="">Selecione Categoria</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Nova Categoria"
            className="writeInput"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="writeCategory" onClick={handleNewCategorySubmit}>
            Add Categoria
          </button>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Escreva sua matéria..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publicar
        </button>
        {/* <NewsForm /> */}
      </form>
    </div>
  );
}
