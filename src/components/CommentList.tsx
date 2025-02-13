import { FC, useRef } from "react";
import Comment from "./Comment";
import { v4 as createId } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  addComment,
  deleteComment,
  editComment,
} from "../redux/commentSlice";

export interface IComment {
  name: string;
  email: string;
  body: string;
}

export type CommentAction = "add" | "edit" | "delete";

const CommentList: FC = () => {
  // const [comments, setComments] = useState<IComment[]>([]);
  const { comments, status } = useSelector(
    (state: RootState) => state.messages
  );
  const dispatch: AppDispatch = useDispatch();

  const newCommentNameRef = useRef<HTMLInputElement>(null);
  const newCommentEmailRef = useRef<HTMLInputElement>(null);
  const newCommentBodyRef = useRef<HTMLInputElement>(null);

  const handleCommentAction = (
    action: CommentAction,
    index?: number,
    value: IComment | null = null
  ) => {
    switch (action) {
      case "add":
        dispatch(
          addComment({
            name: newCommentNameRef.current!.value,
            email: newCommentEmailRef.current!.value,
            body: newCommentBodyRef.current!.value,
          })
        );
        newCommentNameRef.current!.value =
          newCommentEmailRef.current!.value =
          newCommentBodyRef.current!.value =
            "";
        break;
      case "edit":
        dispatch(
          editComment({
            index,
            comment: {
              name: value!.name,
              email: value!.email,
              body: value!.body,
            },
          })
        );
        break;
      case "delete":
        dispatch(deleteComment(index!));
        break;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Comment List</h1>
      <div className="input-group mb-3">
        <input
          ref={newCommentNameRef}
          type="text"
          className="form-control"
          onChange={() => console.log(newCommentNameRef.current!.value)}
        />
        <input
          ref={newCommentEmailRef}
          type="email"
          className="form-control"
          onChange={() => console.log(newCommentEmailRef.current!.value)}
        />
        <input
          ref={newCommentBodyRef}
          type="text"
          className="form-control"
          onChange={() => console.log(newCommentBodyRef.current!.value)}
        />
        {/* handleClickAdd     handleTaskAction('add')    () => handleTaskAction('add')*/}
        <button
          className="btn btn-primary"
          onClick={() => handleCommentAction("add")}
        >
          Add Comment
        </button>
      </div>
      <div>
        {status === "loading" && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {status === "success" && comments.map(({ name, email, body }, i) => (
          <Comment
            key={createId()}
            name={name}
            email={email}
            body={body}
            index={i}
            handleCommentAction={handleCommentAction}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;