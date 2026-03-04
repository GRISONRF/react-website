export default function CommentsList({ comments }) {
  return (
    <>
    <h3>Comments:</h3>
    {comments && comments.length > 0 ? (
      comments.map((comment, i) => (
        <div key={i}>
          <h4>{comment.postedBy}</h4>
          <p>{comment.text}</p>
        </div>
      ))
    ) : (
      <p>No comments yet.</p>
    )}
    </>
  );
}