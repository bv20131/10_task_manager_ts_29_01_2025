import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../components/CommentList";
import { RootState } from "./store";
import axios from "axios";

interface InitialState {
  comments: IComment[];
  status: "loading" | "success" | "error";
}

const initialState: InitialState = {
  comments: [],
  status: "loading",
};

export const fetchComments = createAsyncThunk<
  IComment[],
  void,
  { state: RootState }
>("messages/fetchMessages", async () => {
  const data: IComment[] = (
    await axios.get("https://jsonplaceholder.typicode.com/comments")
  ).data;
  // await axios.get<ITask[]>("https://jsonplaceholder.typicode.com/todos")
  return data.map((e) => ({
    name: e.name,
    body: e.body,
    email: e.email,
  })).filter((_, i) => i < 10);
});

const commentSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<IComment>) {
      state.comments.push(action.payload);
    },
    editComment(
      state,
      action: PayloadAction<{ index: number | undefined; comment: IComment }>
    ) {
      state.comments[action.payload.index!] = action.payload.comment;
    },
    deleteComment(state, action: PayloadAction<number | undefined>) {
      state.comments.splice(action.payload!, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<IComment[]>) => {
          state.comments = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchComments.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { addComment, editComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
