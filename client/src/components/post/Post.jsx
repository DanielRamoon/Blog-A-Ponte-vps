import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://82.180.136.103:5000/images/";

  // Função para formatar a data em português
  const formatarData = (data) => {
    const opcoesFormato = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(data).toLocaleDateString("pt-BR", opcoesFormato);
  };

  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      </Link>
      <div className="postInfo">
        {/* <div className="postCats">
          <span className="postCat">Educação</span>
        </div> */}
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{formatarData(post.createdAt)}</span>
        <hr />
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
