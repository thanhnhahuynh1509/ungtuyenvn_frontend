import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { nguoiDungReducer } from "./nguoi-dung-slice";

export const store = configureStore({
  reducer: { modal: modalReducer, nguoiDung: nguoiDungReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
