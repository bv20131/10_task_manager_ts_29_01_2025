import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface ITask {
  title: string;
  completed: boolean;
}

interface InitialState {
  tasks: ITask[];
  status: 'loading' | 'success' | 'error'
}

const initialState: InitialState = {
  tasks: [],
  status: 'loading'
};

export const fetchTodos = createAsyncThunk<ITask[], void, { state: RootState }>("todos/fetchTasks", async () => {

    const data: ITask[] = (
      await axios.get("https://jsonplaceholder.typicode.com/todos")
    ).data;
    // await axios.get<ITask[]>("https://jsonplaceholder.typicode.com/todos")
    return data
      .map((e) => ({
        title: e.title,
        completed: e.completed,
      }))
      .filter((_, i) => i < 10);
});

const taskSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      state.tasks.push({
        title: action.payload,
        completed: false,
      });
    },
    editTask(
      state,
      action: PayloadAction<{ index: number | null; title: string | null }>
    ) {
      if (action.payload.index !== null && action.payload.title !== null) {
        state.tasks[action.payload.index].title = action.payload.title;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((_, i) => i !== action.payload);
      // state.tasks.splice(action.payload, 1);
    },
    toggleTask(state, action: PayloadAction<number>) {
      state.tasks[action.payload].completed =
        !state.tasks[action.payload].completed;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchTodos.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
            state.status = 'success'
        })
        .addCase(fetchTodos.rejected, (state) => {
            state.status = 'error'
        })
  },
});

export const { addTask, deleteTask, editTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
