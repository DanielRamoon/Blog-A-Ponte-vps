import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import CenterPubli from "../../components/centerPubli/centerPubli";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews ";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      const arrowUp = document.querySelector(".arrow-up");
      if (arrowUp) {
        if (window.pageYOffset > 300) {
          arrowUp.classList.add("show");
        } else {
          arrowUp.classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="whatsapp-icon">
        <a
          href="//wa.me/message/KNCLJWF5XCSDL1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-png-image_6315990.png"
            alt="WhatsApp"
          />
        </a>
      </div>
      <Header posts={posts} />
      <CenterPubli />
      <FeaturedNews posts={posts} />

      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <div className="arrow-up" onClick={scrollToTop}>
        <span>&#8593;</span>
      </div>
    </>
  );
}
