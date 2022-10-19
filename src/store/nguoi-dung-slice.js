import { createSlice } from "@reduxjs/toolkit";

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState: { data: { ...JSON.parse(localStorage.getItem("nguoi-dung")) } },
  reducers: {
    capNhatNguoiDungRD(state, action) {
      state.data = action.payload;
    },
  },
});

export const selectNguoiDung = (state) => state.nguoiDung.data;
export const { capNhatNguoiDungRD } = nguoiDungSlice.actions;
export const nguoiDungReducer = nguoiDungSlice.reducer;
