import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import AdBanner from "../AdBanner/AdBanner";
import Pagination from "../Pagination/Pagination";
import Banner from "../../assest/estado.png";
import "./posts.css";

export default function Posts({ posts, categoryId }) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(30);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInputAndButton, setShowInputAndButton] = useState(false);

  // const adBanners = [
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm-fA_2tumcMZoofxgwJS4fI2qKBOWGuPZVA&usqp=CAU",
  //   "https://www.redegn.com.br/ckfinder/userfiles/images/f91c91d5-5b85-403d-a794-57c4d6b4b0aa.jpg",
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwtHVH5uOtUvr_em4hDA-kAraD_ycrjWI3A&usqp=CAU",
  //   // Adicione mais URLs de imagens conforme necessário
  // ];

  const filterPostsByTitle = (posts, term) => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearch = () => {
    const filtered = filterPostsByTitle(posts, searchTerm);
    setFilteredPosts(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Índice da última postagem da página atual
  const indexOfLastPost = currentPage * postsPerPage;
  // Índice da primeira postagem da página atual
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // Postagens da página atual
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Altera a página atual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    // Filtra as postagens com base na categoria selecionada
    const filtered = posts
      .filter((post) => post.category === categoryId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredPosts(filtered);

    // Atrasa a exibição do input e do botão em 3 segundos
    setTimeout(() => {
      setShowInputAndButton(true);
    }, 3000); // 3000 milissegundos = 3 segundos
  }, [posts, categoryId]);

  return (
    <div className="posts">
      <div className="search-bar">
        {showInputAndButton && (
          <>
            <input
              type="text"
              placeholder="Pesquise..."
              className="search2-input"
              style={{ color: "red" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="search-button"
              onClick={handleSearch}
              style={{ opacity: 1 }}
            >
              Pesquisar
            </button>
          </>
        )}
      </div>
      {currentPosts.map((post, index) => (
        <React.Fragment key={post._id}>
          <Post post={post} />
          {(index + 1) % 3 === 0 && <AdBanner imageUrl={Banner} />}
        </React.Fragment>
      ))}
      <div className="pagination">
        {filteredPosts.length > postsPerPage && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredPosts.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
}
