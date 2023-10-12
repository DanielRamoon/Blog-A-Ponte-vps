import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilteredPosts from "../../components/FilteredPosts/FilteredPosts";

import "./sidebar.css";
import logo from "../../assest/aPONTE.png";

export default function Sidebar({ onCategoryAdded }) {
  const [cats, setCats] = useState([]);

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjqNHSxT6-d7DvLtqvW_QzJIFjfUTcst60gME0PDeQwd6gWsPGAIEzRACwrrdx3TaYCws&usqp=CAU",
    "https://www.acheconcursos.com.br/imagens/post/42302/prefeitura-de-casa-nova-bahia-concurso-publico-em-2020.png",
    "https://waldineypassos.com.br/wp-content/uploads/2023/06/Festa-do-Interior-2023.png",
  ];

  const images1 = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGg9LNH-CKdZdeNsI9kLdUQyUp_YwcvNGG4w&usqp=CAU",
    "https://portalfacilarquivos.blob.core.windows.net/uploads/CASANOVA/img/%7BEDBBAD5B-BCB5-4EB6-64E8-4ABA54EEE0B0%7D/%7BEDBBAD5B-BCB5-4EB6-64E8-4ABA54EEE0B0%7D_710X420.jpg",
    "https://waldineypassos.com.br/wp-content/uploads/2023/06/Festa-do-Interior-2023.png",
  ];

  const images2 = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFI_XjUoo4Qd0TIf3IEsNQHPCEp_3jI-QYDA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKlwiWrGOBv7vf_T_GmCQcN79eRDYU1Ik3A&usqp=CAU",
    "https://www.waldineypassos.com.br/wp-content/uploads/2023/01/325359476_1339082346908237_4598146594814257998_n.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Muda a imagem a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get("/categories");
        setCats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCats();
  }, []);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await axios.get("/categories");
  //       setCategories(res.data);
  //       setFilteredCategory(res.data[0]?._id || "");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   const fetchFilteredPosts = async () => {
  //     try {
  //       const res = await axios.get(`/posts?category=${filteredCategory}`);
  //       setFilteredPosts(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchFilteredPosts();
  // }, [filteredCategory]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">NOSSO INSTAGRAM</span>
        <a href="https://www.instagram.com/blogaponteoficial/" target="_blank">
          <div class="story-circle">
            <img src={logo} alt="" />
          </div>
        </a>

        <p>@BLOGAPONTE</p>
      </div>
      {/* <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIAS</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div> */}

      <FilteredPosts />

      {/* <div className="sidebarItem">
        <span className="sidebarTitle">SIGA-NOS</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div> */}

      <div className="container-box">
        <div class="parceiros">
          <span className="sidebarTitle">NOSSOS PARCEIROS</span>
        </div>
        <div class="box">
          <img
            src={images[currentImageIndex]}
            alt={`Imagem ${currentImageIndex}`}
          />
        </div>
        <div class="box">
          <img
            src={images1[currentImageIndex]}
            alt={`Imagem ${currentImageIndex}`}
          />
        </div>
        <div class="box">
          <img
            src={images2[currentImageIndex]}
            alt={`Imagem ${currentImageIndex}`}
          />
        </div>
      </div>
    </div>
  );
}
