import { createSlice } from "@reduxjs/toolkit";
import { IAccount, ITrainee } from "../../interfaces/user.interface";

interface TaskNotifView {
  taskOnNotif: null;
}

const initialState: TaskNotifView = {
  taskOnNotif: null,
};

const notificationSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.taskOnNotif = action.payload;
    },
    reset: (state) => {
      state.taskOnNotif = null;
    },
  },
});

export const { setView, reset } = notificationSlice.actions;

export default notificationSlice.reducer;
