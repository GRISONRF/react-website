export default function CommentsList({ comments }) {
  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments && comments.length > 0 ? (
        comments.map((comment, i) => (
          <div key={i} className="comment-item">
            <div className="comment-header">
              <span className="comment-author">{comment.postedBy}</span>
              <span className="comment-date">Just now</span> 
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))
      ) : (
        <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
}