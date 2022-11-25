import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { nguoiDungReducer } from "./nguoi-dung-slice";
import { notificationReducer } from "./notification-slice";
import { stompReducer } from "./stomp-slice";
import { chatUIReducer } from "./chat-ui-slice";
import { chatUserReducer } from "./chat-user-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    nguoiDung: nguoiDungReducer,
    stomp: stompReducer,
    notification: notificationReducer,
    chatUI: chatUIReducer,
    chatUser: chatUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
