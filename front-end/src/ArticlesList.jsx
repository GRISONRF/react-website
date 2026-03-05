import { Link } from "react-router-dom"
import '/GitHub/react-website/front-end/style.css'

export default function ArticlesList({ articles }) {
  return (
    <div className="articles-list">
      {articles.map(a => (
        <Link
          key={a.name}
          to={'/articles/' + a.name}
          className="article-card"
        >
          <h3>{a.title}</h3>
          <p>{a.description}</p>
        </Link>
      ))}
    </div>
  );
}