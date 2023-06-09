import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  add: boolean;
  update: boolean;
  assign: boolean;
  view: boolean;
}

const initialState: ModalState = {
  add: false,
  update: false,
  assign: false,
  view: false,
};

export const modalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addModal: (state) => {
      state.add = !state.add;
    },
    updateModal: (state) => {
      state.update = !state.update;
    },
    assignModal: (state) => {
      state.assign = true;
    },
    viewModal: (state) => {
      state.view = true;
    },
  },
  extraReducers: {},
});

export const { addModal, updateModal, assignModal, viewModal } =
  modalSlice.actions;
export default modalSlice.reducer;
