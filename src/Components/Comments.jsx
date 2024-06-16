import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Comments = forwardRef(( ref) => {
  const [comment, setComment] = useState('');

  useImperativeHandle(ref, () => ({
    getData() {
      return {
        comment
      };
    },
  }));

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
      <button type="button" className="btn btn-danger wash__btn">
        Сохранить комментарий
      </button>
      <p>{comment}</p>
    </form>
  );
});

export default Comments;
