import { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CommentsList from '../CommentsList';
import AddCommentForm from '../addCommentForm';
import articles from '../article-content';
import useUser from '../useUser';

export default function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();

  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments || []);
  const [article, setArticle] = useState(null);

  const { isLoading, user } = useUser();

  useEffect(() => {
    async function loadArticle() {
      try {
        const response = await axios.get("/api/medium-articles/" + name);
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
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/medium-articles/' + name + '/upvote', null, { headers });
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function onAddComment({ nameText, commentText }) {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post('/api/medium-articles/' + name + '/comments', {
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
      {article && (
        <div className="article-body"
      dangerouslySetInnerHTML={{ __html: article.content }} />
      )}
      {user 
      ? <AddCommentForm onAddComment={onAddComment} />
      : <p>Log in to add a comment</p>}
      <CommentsList comments={comments} />
    </>
  );
}

export async function loader({ params }) {
  const response = await axios.get('/api/medium-articles/' + params.name);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}