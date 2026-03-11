import { Link } from "react-router-dom"
import '/GitHub/react-website/front-end/style.css'

export default function ArticlesList({ articles }) {
  if (!articles || articles.length === 0) {
    return <p style={{ color: 'white' }}>No articles found.</p>;
  }
  return (
    <ul className="articles-bullet-list">
      {articles.map((a) => (
        <li key={a.name}>
          <Link to={'/articles/' + a.name} className="article-link">
            {a.title}
          </Link>
          <span className="article-meta">
             👍 {a.upvotes || 0} | 💬 {a.comments?.length || 0}
          </span>
        </li>
      ))}
    </ul>
  );
}