// rafce - react arrow function component export

import { FC, useEffect, useRef } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addUser, deleteUser, editUser, fetchUsers } from "../redux/userSlice";

export interface IUser {
  name: string;
  phone: string;
}

export type UserAction = "add" | "edit" | "delete";

const UserList: FC = () => {
  // const [users, setUsers] = useState<IUser[]>([]);
  const users = useSelector((state: RootState) => state.person.users);
  const dispatch: AppDispatch = useDispatch();

  const newUserNameRef = useRef<HTMLInputElement>(null);
  const newUserPhoneRef = useRef<HTMLInputElement>(null);

  const handleUserAction = (
    action: UserAction,
    index?: number,
    value: IUser | null = null
  ) => {
    switch (action) {
      case "add":
        dispatch(addUser({
          name: newUserNameRef.current!.value,
          phone: newUserPhoneRef.current!.value,
        }));
        newUserNameRef.current!.value = newUserPhoneRef.current!.value = "";
        break;
      case "edit":
        dispatch(editUser({
          index,
          user: {
            name: value!.name,
            phone: value!.phone
          }
        }))
        break;
      case "delete":
        dispatch(deleteUser(index))
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">User List</h1>
      <div className="input-group mb-3">
        <input
          ref={newUserNameRef}
          type="text"
          className="form-control"
          onChange={() => console.log(newUserNameRef.current!.value)}
        />
        <input
          ref={newUserPhoneRef}
          type="tel"
          className="form-control"
          onChange={() => console.log(newUserPhoneRef.current!.value)}
        />
        {/* handleClickAdd     handleTaskAction('add')    () => handleTaskAction('add')*/}
        <button
          className="btn btn-primary"
          onClick={() => handleUserAction("add")}
        >
          Add User
        </button>
      </div>
      <div>
        {users.map(({ name, phone }, i) => (
          <User
            key={Math.random() + new Date().getTime()}
            name={name}
            phone={phone}
            index={i}
            handleUserAction={handleUserAction}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
