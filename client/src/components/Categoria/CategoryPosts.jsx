import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CategoryPosts.css";

function CategoryPosts() {
  const { categoryId } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryNotFound, setCategoryNotFound] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Primeiro, busque o título da categoria usando a rota correta no servidor
        const categoryResponse = await axios.get(`/categories/${categoryId}`);
        setCategoryTitle(categoryResponse.data.name); // Define o título da categoria

        // Em seguida, busque os posts da categoria com base no categoryId
        const postsResponse = await axios.get(`/posts?category=${categoryId}`);
        setCategoryPosts(postsResponse.data);

        if (postsResponse.data.length === 0) {
          // Se não houver posts para a categoria, marca como categoria não encontrada
          setCategoryNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setCategoryNotFound(true);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  return (
    <div className="category-posts">
      {categoryNotFound ? (
        <p className="category-not-found">Categoria não encontrada...</p>
      ) : (
        <>
          <h2>{categoryTitle}</h2>
          {categoryPosts.length === 0 ? (
            <p className="category-not-found">Nenhum post nesta categoria.</p>
          ) : (
            <>
              <ul>
                {categoryPosts.map((post) => (
                  <li key={post._id}>{post.title}</li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryPosts;
