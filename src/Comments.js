import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import SingleComment from "./SingleComment";
import { commentCreate, commentsLoad } from "./redux/actions";
const Comments = (props) => {
  const [textComent, setTextComent] = useState("");
  const comments = useSelector((state) => {
    const { commentsReducer } = state;
    return commentsReducer.comments;
  });

  const dispatch = useDispatch();

  const handleInput = (e) => {
    console.log("onChange", e.target.value);
    setTextComent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("click submit>", textComent);
    const id = uniqid();
    dispatch(commentCreate(textComent, id));
  };

  // useEffect(() => {
  //   dispatch(commentsLoad());
  // }, []);

  return (
    <div className="card-comments">
      <form
        className="comments-item-create"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={textComent}
          onChange={handleInput}
        />
        <input
          type="submit"
          hidden
        />
      </form>
      {!!comments.length &&
        comments.map((res) => {
          return (
            <SingleComment
              key={res.id}
              data={res}
            />
          );
        })}
    </div>
  );
};

export default Comments;
