// rafce - react arrow function component export

import axios from "axios";
import { FC, useEffect, useRef, useState } from "react"
import User from "./User";

export interface IUser {
    name: string,
    phone: string
}

export type UserAction = 'add' | 'edit' | 'delete';

const UserList: FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    const newUserNameRef = useRef<HTMLInputElement>(null);
    const newUserPhoneRef = useRef<HTMLInputElement>(null);

    const handleUserAction = (action: UserAction, index: number | null = null, value: IUser | null = null) => {
      const usersCopy = [...users];
    
      switch (action) {
        case "add":
          usersCopy.push({
            name: newUserNameRef.current!.value,
            phone: newUserPhoneRef.current!.value
          });
          newUserNameRef.current!.value = newUserPhoneRef.current!.value = "";
          break;
        case "edit":
          usersCopy[index!].name = value!.name;
          usersCopy[index!].phone = value!.phone;
          break;
        case "delete":
          usersCopy.splice(index!, 1);
          break;
      }
    
      setUsers(usersCopy);
    };

      useEffect(() => {

        const fetchUsers = async () => {
          try {
            const data: IUser[] = (
              // await axios.get<ITask[]>("https://jsonplaceholder.typicode.com/todos")
              await axios.get("https://jsonplaceholder.typicode.com/users")
            ).data;
            setUsers(
              data.map(e => ({
                name: e.name,
                phone: e.phone
              }))
            );
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUsers();
      }, []);

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
  )
}

export default UserList