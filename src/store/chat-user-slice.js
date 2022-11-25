import { createSlice } from "@reduxjs/toolkit";

const chatUserSlice = createSlice({
  name: "chatUser",
  initialState: { data: [], hasNewChat: {} },
  reducers: {
    initChatUser(state, action) {
      state.data = [...action.payload];
    },
    addChatUser(state, action) {
      state.data = [...state.data, action.payload];
    },
    updateChatuser(state, action) {},
    deleteChatUser(state, action) {
      state.data = [...state.data.filter((m) => m.id !== action.payload)];
    },
    setHasNewChat(state, action) {
      state.hasNewChat = action.payload;
    },
  },
});

export const selectChatUser = (state) => state.chatUser.data;
export const selectHasNewChat = (state) => state.chatUser.hasNewChat;
export const {
  initChatUser,
  addChatUser,
  updateChatUser,
  deleteChatUser,
  setHasNewChat,
} = chatUserSlice.actions;
export const chatUserReducer = chatUserSlice.reducer;
