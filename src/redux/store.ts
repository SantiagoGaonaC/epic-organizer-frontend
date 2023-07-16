import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./states/task";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default store;
