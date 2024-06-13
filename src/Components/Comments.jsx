import React, { useState } from 'react';

const Comments = () => {
  const [comment, setComment] = useState('');

  const handleCommentSave = () => {
    setComment('')
  };

  return (
    <form className="form-table">
    <h2>Комментарии</h2>
    <div>
    <textarea
        name="comments"
        cols="50"
        rows="5"
        maxLength="500"
        placeholder="Для комментариев"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
      <button type="button" className="btn btn-danger wash__btn" onClick={handleCommentSave}>
        Сохранить комментарий
      </button>
      <p>{comment}</p>
    </form>
  );
};

export default Comments;
