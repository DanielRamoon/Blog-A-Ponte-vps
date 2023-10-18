import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import SectionTop from "../sectionTop/sectionTop";
import "./topbar.css";
import axios from "axios";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://82.180.136.103:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [showTopBar, setShowTopBar] = useState(true);
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowTopBar(false);
      } else {
        setShowTopBar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/categories");
        setCategories(res.data);
        setFilteredCategory(res.data[0]?._id || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      try {
        const res = await axios.get(`/posts?category=${filteredCategory}`);
        setFilteredPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFilteredPosts();
  }, [filteredCategory]);

  return (
    <>
      <section>
        <SectionTop />
      </section>
      <div className={`top ${showTopBar ? "" : "hidden"}`}>
        <div className="topCenter">
          <ul className={`topList ${showCategories ? "active" : ""}`}>
            <li className="topListItem">
              <Link className="link-top" to="/">
                ÍNICIO
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link-top" to="/about">
                HISTÓRIA
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link-top" to="/matter">
                MATÉRIA
              </Link>
            </li>

            <li className="topListItem" onClick={toggleCategories}>
              <span className={`link-top ${showCategories ? "active" : ""}`}>
                CATEGORIAS
                {showCategories ? " ▲" : " ▼"}
              </span>
              {showCategories && (
                <ul className="categoryList">
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className="categoryItem categoryCentered"
                    >
                      <Link
                        to={`/category/${category._id}`}
                        className="categoryLink"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="topListItem">
              <Link className="link-top" to="/contact">
                CONTATO
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link-top" to="/write">
                {user && "PUBLISH"}
              </Link>
            </li>
            <li className="topListItem" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <Link to="/settings">
              <img className="topImg" src={PF + user.profilePic} alt="" />
            </Link>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login"></Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register"></Link>
              </li>
            </ul>
          )}
        </div>
        {/* Botão de hambúrguer */}
        <button className="menuIcon" onClick={toggleCategories}>
          ☰
        </button>
      </div>
    </>
  );
}
