import { FC, useRef, useState } from "react";
import { IUser, UserAction } from "./UserList";

interface IProps {
  name: string;
  phone: string;
  index: number;
  handleUserAction: (
    action: UserAction,
    index: number | null,
    value?: IUser | null
  ) => void;
}

const User: FC<IProps> = ({ name, phone, index, handleUserAction }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [updatedTask, setUpdatedTask] = useState(name);
  const nameRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()
  const phoneRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()

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
              ref={phoneRef}
              defaultValue={phone}
            ></textarea>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() =>
                handleUserAction("edit", index, {
                  name: nameRef.current!.value,
                  phone: phoneRef.current!.value,
                })
              }
            >
              Save
            </button>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <p className="mb-0">Name: {name}</p>
            <p className="mb-0">Phone: {phone}</p>
            <div className="d-flex">
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleUserAction("delete", index)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
