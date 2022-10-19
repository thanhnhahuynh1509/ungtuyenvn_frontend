import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: {
      title: "Đăng ký thành công",
      message:
        "Chúc mừng bạn đã đăng ký thành công. Bạn có muốn chuyển đến trang đăng nhập không?",
      icon: <i className="fa-regular fa-circle-check"></i>,
      hide: true,
      handleAccept: () => {},
      handleCancel: () => {},
    },
  },
  reducers: {
    updateModal(state, action) {
      state.data = action.payload;
    },
  },
});

export const selectModal = (state) => state.modal.data;
export const { updateModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
