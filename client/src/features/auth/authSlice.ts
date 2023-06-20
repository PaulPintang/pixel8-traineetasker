import { createSlice } from "@reduxjs/toolkit";
import { IAccount, ITrainee } from "../../interfaces/user.interface";

interface AuthState {
  user: IAccount | null;
}

const initialState: AuthState = {
  user: null,
  // user: localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user")!)
  //   : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      // localStorage.removeItem("user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
