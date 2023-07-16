import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "@/models";

export const taskSlice = createSlice({
  name: "task",
  initialState: [] as ITask[],
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const index = state.findIndex((task) => task._id === updatedTask._id);
      if (index !== -1) {
        state[index] = updatedTask;
      }
    },
  },
});

export const { setTasks, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
