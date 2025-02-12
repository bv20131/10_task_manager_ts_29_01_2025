import { useState, useRef, FC } from "react";
import { TaskAction } from "./TaskList";

interface IProps {
  name: string,
  completed: boolean,
  index: number,
  handleTaskAction: (action: TaskAction, index: number | null, value?: string | null ) => void
}

const Task: FC<IProps> = ({
  name,
  completed,
  index,
  handleTaskAction,
}) => {
  // Кортеж - Tuple
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // const [updatedTask, setUpdatedTask] = useState(name);
  const textRef = useRef<HTMLTextAreaElement>(null); // аналог document.getElementById()

  // const handleClickSave = () => {
  //     // setUpdatedTask(textRef.current.value);
  //     const tasksCopy = [...tasks];
  //     tasksCopy[index].title = textRef.current.value;
  //     setTasks(tasksCopy);
  //     setIsEdit(false);
  // };

  // const handleClickDelete = () => {
  //     // Копия списка задач
  //     const tasksCopy = [...tasks];
  //     // Удаляем задачу из копии
  //     tasksCopy.splice(index, 1);
  //     // Обновляем список задач, на основании обновлённой копии
  //     setTasks(tasksCopy);
  // };

  return (
    <div
      className={`card mb-3 ${completed ? "bg-light" : "bg-info"}`}
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="card-body">
        {isEdit ? (
          <>
            <textarea
              className="form-control mb-2"
              ref={textRef}
              defaultValue={name}
            ></textarea>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() =>
                handleTaskAction("edit", index, textRef.current!.value)
              }
            >
              Save
            </button>
          </>
        ) : (
          <div className="d-flex align-items-center">
            <p
              className={`mb-0 ${
                completed ? "text-decoration-line-through" : ""
              }`}
            >
              {name}
            </p>
            <input
              type="checkbox"
              checked={completed}
              className="form-check-input mx-2"
              onChange={() => handleTaskAction("toggle", index)}
            />
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleTaskAction("delete", index)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
