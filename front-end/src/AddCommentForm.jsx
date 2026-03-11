import { useState } from 'react';

export default function AddCommentForm({ onAddComment }) {
  const [nameText, setNameText] = useState('');
  const [commentText, setCommentText] = useState('');

  return (
    <div className="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        <span>Name</span>
        <input 
          type="text" 
          placeholder="Your name..."
          value={nameText} 
          onChange={e => setNameText(e.target.value)}
        />
      </label>
      <label>
        <span>Comment</span>
        <textarea 
          rows="4"
          placeholder="Write your thoughts..."
          value={commentText} 
          onChange={e => setCommentText(e.target.value)} 
        />
      </label>
      <button onClick={() => {
        onAddComment({ nameText, commentText });
        setNameText('');
        setCommentText('');
      }}>Post Comment</button>
    </div>
  );
}