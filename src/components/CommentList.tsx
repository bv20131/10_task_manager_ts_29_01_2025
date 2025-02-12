import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { v4 as createId } from 'uuid';

export interface IComment {
  name: string;
  email: string;
  body: string;
}

export type CommentAction = 'add' | 'edit' | 'delete';

const CommentList: FC = () => {
  const [comments, setComments] = useState<IComment[]>([]);

  const newCommentNameRef = useRef<HTMLInputElement>(null);
  const newCommentEmailRef = useRef<HTMLInputElement>(null);
  const newCommentBodyRef = useRef<HTMLInputElement>(null);

  const handleCommentAction = (
    action: CommentAction,
    index: number | null = null,
    value: IComment | null = null
  ) => {
    const commentsCopy = [...comments];

    switch (action) {
      case "add":
        commentsCopy.push({
          name: newCommentNameRef.current!.value,
          email: newCommentEmailRef.current!.value,
          body: newCommentBodyRef.current!.value
        });
        newCommentNameRef.current!.value = newCommentEmailRef.current!.value = newCommentBodyRef.current!.value = "";
        break;
      case "edit":
        commentsCopy[index!].name = value!.name;
        commentsCopy[index!].email = value!.email;
        commentsCopy[index!].body = value!.body;
        break;
      case "delete":
        commentsCopy.splice(index!, 1);
        break;
    }

    setComments(commentsCopy);
  };

  useEffect(() => {

    const fetchComments = async () => {
      try {
        const data: IComment[] = (
          // await axios.get<ITask[]>("https://jsonplaceholder.typicode.com/todos")
          await axios.get("https://jsonplaceholder.typicode.com/comments")
        ).data;
        setComments(
          data.map(e => ({
            name: e.name,
            email: e.email,
            body: e.body
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, []);

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
          Add User
        </button>
      </div>
      <div>
        {comments.map(({ name, email, body }, i) => (
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