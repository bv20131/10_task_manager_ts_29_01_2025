import { FC, useRef, useState } from "react"
import { CommentAction, IComment } from "./CommentList"

interface IProps {
  name: string,
  email: string,
  body: string,
  index: number,
   handleCommentAction: (action: CommentAction, index?: number , value?: IComment | null ) => void
}

const Comment: FC<IProps> = ({ name, email, body, index, handleCommentAction}) => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
    // const [updatedTask, setUpdatedTask] = useState(name);
    const nameRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()
    const emailRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()
    const bodyRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()
  

  return (
    <div
      className={`card mb-3 bg-light`}
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="card-body">
        {isEdit ? (
          <>
            <textarea
              className="form-control mb-2"
              ref={nameRef}
              defaultValue={name}
            ></textarea>
            <textarea
              className="form-control mb-2"
              ref={emailRef}
              defaultValue={email}
            ></textarea>
            <textarea
              className="form-control mb-2"
              ref={bodyRef}
              defaultValue={body}
            ></textarea>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() =>
                handleCommentAction("edit", index, {
                  name: nameRef.current!.value,
                  email: emailRef.current!.value,
                  body: bodyRef.current!.value,
                })
              }
            >
              Save
            </button>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <p className="mb-0">Name: {name}</p>
            <p className="mb-0">Email: {email}</p>
            <p className="mb-0">Comment: {body}</p>
            <div className="d-flex">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleCommentAction("delete", index)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment