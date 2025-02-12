import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../components/UserList";
import { RootState } from "./store";
import axios from "axios";

interface InitialState {
  users: IUser[];
  status: "loading" | "success" | "error";
}

const initialState: InitialState = {
  users: [],
  status: "loading",
};

export const fetchUsers = createAsyncThunk<IUser[], void, { state: RootState }>("users/fetchUsers", async () => {

    const data: IUser[] = (
      await axios.get("https://jsonplaceholder.typicode.com/users")
    ).data;
    // await axios.get<ITask[]>("https://jsonplaceholder.typicode.com/todos")
    return data
      .map((e) => ({
        name: e.name,
        phone: e.phone,
      }))
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<IUser>) {
            state.users.push(action.payload)
        },
        editUser(state, action: PayloadAction<{ index: number | undefined, user: IUser}>) {
            state.users[action.payload.index!] = action.payload.user;
        },
        deleteUser(state, action: PayloadAction<number | undefined>) {
            state.users.splice(action.payload!, 1);
            // state.users = state.users.filter((_, i) => i !== action.payload);
          }
    },
      extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
                state.users = action.payload;
                state.status = 'success'
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.status = 'error'
            })
      }
})

export const { addUser, deleteUser, editUser } = userSlice.actions;

export default userSlice.reducer;