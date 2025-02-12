import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice';
import userReducer from './userSlice';
import commentReducer from './commentSlice';

const store = configureStore({
    reducer: {
        todo: taskReducer,
        person: userReducer,
        messages: commentReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;