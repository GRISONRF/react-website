import { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../CommentsList';
import AddCommentForm from '../addCommentForm';
import articles from '../article-content';
import useUser from '../useUser';

export default function ArticlePage() {
  const { name } = useParams();
  console.log("Article Slug from URL:", name);
  const { upvotes: initialUpvotes, comments: initialComments, upvoteIds: initialUpvoteIds } = useLoaderData();

  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [upvoteIds, setUpvoteIds] = useState(initialUpvoteIds || []);
  const [comments, setComments] = useState(initialComments || []);
  const [article, setArticle] = useState(null);

  const { isLoading, user } = useUser();

  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await axios.get("/api/articles/" + name);
        setArticle(response.data);
      } catch (err) {
        console.error("Failed to load article:", err);
      }
    }
    loadArticle();
  }, [name]);

  if (!article) {
    return <p>Loading article...</p>; // <-- wait until fetch completes
  }

  async function onUpvoteClicked() {
    try {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(`/api/articles/${name}/upvote`, null, { headers });
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
    setArticle(prev => ({ ...prev, upvotes: updatedArticleData.upvotes }));
    } catch (err) {
      console.error("Upvote failed:", err);
      alert("Could not upvote. You might have already upvoted this article!");
  }}

  async function onAddComment({ nameText, commentText }) {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/articles/' + name + '/comments', {
      postedBy: nameText,
      text: commentText,
    }, { headers });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }

  return (
    <>
    <h1>{article.title}</h1>
    {user && <button onClick={onUpvoteClicked}>Upvote</button>}
    <p>This article has {upvotes} upvotes</p>

    <div className="article-body">
      {/* Check if the article was manually imported */}
      {article.content && article.content.includes("manually imported") ? (
        <p>
          This article was manually imported. 
          <a 
            href={`https://medium.com/@grisonrf/${name}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#61dafb', marginLeft: '5px', textDecoration: 'underline' }}
          >
            Visit my Medium to read the full text.
          </a>
        </p>
      ) : (
        /* Otherwise, render the full Medium content */
        <div dangerouslySetInnerHTML={{ __html: article.content || "Full content for this article is coming soon!" }} />
      )}
    </div>
    <div className="medium-disclaimer">
      <hr />
      <p>
        Unfortunately, the Medium API only allows me to import the 10 most recent articles, 
        but I've written many more! Click 
        <a 
          href="https://medium.com/@grisonrf" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          here
        </a> 
        to read what I wrote about <strong>Data Structures and Algorithms</strong>, 
        <strong>OOP principles</strong>, <strong>Operating Systems</strong>, and more.
      </p>
    </div>

    {user ? <AddCommentForm onAddComment={onAddComment} /> : <p>Log in to add a comment</p>}
    <CommentsList comments={comments} />
  </>
  );
}

export async function loader({ params }) {
  const response = await axios.get('/api/articles/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}